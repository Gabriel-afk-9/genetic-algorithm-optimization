import { createIndividual, type DecisionVariables, type Individual, withFitness } from "../domain/Individual";
import { createOptimizationRunResult, type OptimizationRunResult } from "../domain/OptimizationResult";
import { type RandomSource } from "../domain/RandomSource";
import { type GAConfig } from "../domain/GAConfig";
import { type Problem } from "../domain/Problem";

const DEFAULT_OPTIMUM_TOLERANCE = 0.01;

export class GeneticAlgorithm {
    constructor(
        private readonly problem: Problem,
        private readonly config: GAConfig,
        private readonly randomSource: RandomSource,
        private readonly optimumTolerance: number = DEFAULT_OPTIMUM_TOLERANCE
    ) {}

    public execute(): OptimizationRunResult {
        let population = this.evaluatePopulation(this.initializePopulation());
        let nfe = this.config.populationSize;
        let generations = 0;
        let repeatedFitnessCount = 0;
        let previousBestFitness = Infinity;

        while (repeatedFitnessCount < this.config.maxRepetitions && generations < this.config.maxGenerations) {
            const bestIndividual = this.getBestIndividual(population);

            if (this.hasReachedTarget(bestIndividual.fitness)) {
                break;
            }

            population = this.evaluatePopulation(this.createNextGeneration(population, bestIndividual));
            nfe += this.config.populationSize;
            generations++;

            const currentBestFitness = this.getBestIndividual(population).fitness;

            if (currentBestFitness === previousBestFitness) {
                repeatedFitnessCount++;
            } else {
                repeatedFitnessCount = 0;
            }
            
            previousBestFitness = currentBestFitness;
        }

        const bestIndividual = this.getBestIndividual(population);

        return createOptimizationRunResult({
            nfe,
            success: this.hasReachedTarget(bestIndividual.fitness),
            bestFitness: bestIndividual.fitness
        });
    }

    private initializePopulation(): Individual[] {
        return Array.from(
            { length: this.config.populationSize },
            () => createIndividual(this.randomDecisionVariables())
        );
    }

    private evaluatePopulation(population: readonly Individual[]): Individual[] {
        return population.map((individual) =>
            withFitness(
                individual,
                this.problem.calculateFitness(individual.x1, individual.x2)
            )
        );
    }

    private createNextGeneration(
        population: readonly Individual[],
        bestIndividual: Individual
    ): Individual[] {
        const nextGeneration: Individual[] = [bestIndividual];

        while (nextGeneration.length < this.config.populationSize) {
            const parent1 = this.tournamentSelection(population);
            const parent2 = this.tournamentSelection(population);
            const [firstChild, secondChild] = this.crossover(parent1, parent2);

            nextGeneration.push(this.mutate(firstChild));

            if (nextGeneration.length < this.config.populationSize) {
                nextGeneration.push(this.mutate(secondChild));
            }
        }

        return nextGeneration;
    }

    private getBestIndividual(population: readonly Individual[]): Individual {
        return population.reduce((best, current) =>
            current.fitness < best.fitness ? current : best
        );
    }

    private tournamentSelection(population: readonly Individual[]): Individual {
        let best: Individual | null = null;

        for (let i = 0; i < this.config.tournamentSize; i++) {
            const candidate = population[this.randomSource.nextIndex(population.length)];

            if (!best || candidate.fitness < best.fitness) {
                best = candidate;
            }
        }

        return best!;
    }

    private crossover(parent1: Individual, parent2: Individual): [Individual, Individual] {
        if (this.randomSource.nextProbability() >= this.config.crossoverRate) {
            return [
                createIndividual(parent1, parent1.fitness),
                createIndividual(parent2, parent2.fitness)
            ];
        }

        const blendFactor = this.randomSource.nextProbability();

        return [
            createIndividual(this.blendDecisionVariables(parent1, parent2, blendFactor)),
            createIndividual(this.blendDecisionVariables(parent2, parent1, blendFactor))
        ];
    }

    private mutate(individual: Individual): Individual {
        const x1 = this.shouldMutate()
            ? this.randomSource.nextBetween(this.problem.minBound, this.problem.maxBound)
            : individual.x1;
        const x2 = this.shouldMutate()
            ? this.randomSource.nextBetween(this.problem.minBound, this.problem.maxBound)
            : individual.x2;

        return createIndividual({ x1, x2 });
    }

    private blendDecisionVariables(
        primaryParent: DecisionVariables,
        secondaryParent: DecisionVariables,
        blendFactor: number
    ): DecisionVariables {
        return {
            x1: (primaryParent.x1 * blendFactor) + (secondaryParent.x1 * (1 - blendFactor)),
            x2: (primaryParent.x2 * blendFactor) + (secondaryParent.x2 * (1 - blendFactor))
        };
    }

    private randomDecisionVariables(): DecisionVariables {
        return {
            x1: this.randomSource.nextBetween(this.problem.minBound, this.problem.maxBound),
            x2: this.randomSource.nextBetween(this.problem.minBound, this.problem.maxBound)
        };
    }

    private shouldMutate(): boolean {
        return this.randomSource.nextProbability() < this.config.mutationRate;
    }

    private hasReachedTarget(fitness: number): boolean {
        return Math.abs(fitness - this.problem.optimumTarget) <= this.optimumTolerance;
    }
}
