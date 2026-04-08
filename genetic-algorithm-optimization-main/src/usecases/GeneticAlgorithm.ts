import { Problem } from "../domain/Problem";
import { GAConfig } from "../domain/GAConfig";
import { Individual } from "../domain/Individual";
import { MathUtils } from "../infrastructure/utils/MathUtils";

export class GeneticAlgorithm {
    private population: Individual[] = [];

    constructor(
        private readonly problem: Problem,
        private readonly config: GAConfig
    ) {}

    public execute(): { nfe: number; success: boolean; bestFitness: number } {
        this.initializePopulation();
        this.evaluatePopulation();

        let nfe = this.config.populationSize;
        let generations = 0;
        let previousBestFitness = Infinity;
        let repeatedFitnessCount = 0;

        while (generations < this.config.maxGenerations && repeatedFitnessCount < this.config.maxRepetitions) {
            // Elitismo limpo e sem erro
            const nextGeneration: Individual[] = [{ ...this.getBestIndividual() }];

            while (nextGeneration.length < this.config.populationSize) {
                const parent1 = this.tournamentSelection();
                const parent2 = this.tournamentSelection();

                const [child1, child2] = this.crossover(parent1, parent2);

                this.mutate(child1);
                this.mutate(child2);
                
                nextGeneration.push(child1);
                if (nextGeneration.length < this.config.populationSize) {
                    nextGeneration.push(child2);
                }
            }
            this.population = nextGeneration;
            this.evaluatePopulation();

            nfe += this.config.populationSize;
            generations++;
            
            const currentBestFitness = this.getBestIndividual().fitness;

            if (MathUtils.isWithinTolerance(currentBestFitness, this.problem.optimumTarget)) break;

            if (currentBestFitness === previousBestFitness) {
                repeatedFitnessCount++;
            } else {
                repeatedFitnessCount = 0;
            }
            previousBestFitness = currentBestFitness;
        }

        const bestInd = this.getBestIndividual();
        const success = MathUtils.isWithinTolerance(bestInd.fitness, this.problem.optimumTarget);
        return { nfe, success, bestFitness: bestInd.fitness };
    }

    private initializePopulation(): void {
        this.population = Array.from({ length: this.config.populationSize }, () => ({
            x1: MathUtils.generateRandomNumber(this.problem.minBound, this.problem.maxBound),
            x2: MathUtils.generateRandomNumber(this.problem.minBound, this.problem.maxBound),
            fitness: 0
        }));
    }

    private evaluatePopulation(): void {
        for (const ind of this.population) {
            ind.fitness = this.problem.calculateFitness(ind.x1, ind.x2);
        }
    }

    private getBestIndividual(): Individual {
        return this.population.reduce((best, curr) => curr.fitness < best.fitness ? curr : best);
    }

    private tournamentSelection(): Individual {
        let best: Individual | null = null;
        for (let i = 0; i < this.config.tournamentSize; i++) {
            const ind = this.population[Math.floor(Math.random() * this.population.length)];
            if (!best || ind.fitness < best.fitness) best = ind;
        }
        return { ...best! };
    }

    private crossover(parent1: Individual, parent2: Individual): [Individual, Individual] {
        const c1 = { ...parent1 };
        const c2 = { ...parent2 };

        if (Math.random() < this.config.crossoverRate) {
            const alpha = Math.random(); // Sorteia o peso dinamicamente, sem precisar na config!
            c1.x1 = (parent1.x1 * alpha) + (parent2.x1 * (1 - alpha));
            c1.x2 = (parent1.x2 * alpha) + (parent2.x2 * (1 - alpha));
            c2.x1 = (parent2.x1 * alpha) + (parent1.x1 * (1 - alpha));
            c2.x2 = (parent2.x2 * alpha) + (parent1.x2 * (1 - alpha));
        }
        return [c1, c2];
    }

    private mutate(ind: Individual): void {
        if (Math.random() < this.config.mutationRate) {
            ind.x1 = MathUtils.generateRandomNumber(this.problem.minBound, this.problem.maxBound);
        }
        if (Math.random() < this.config.mutationRate) {
            ind.x2 = MathUtils.generateRandomNumber(this.problem.minBound, this.problem.maxBound);
        }
    }
}