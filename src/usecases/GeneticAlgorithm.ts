import { Individual } from "../domain/Individual";
import { Problem } from "../domain/Problem";
import { GAConfig } from "../domain/GAConfig";
import { MathUtils } from "../infrastructure/utils/MathUtils";

export class GeneticAlgorithm {
    private population: Individual[] = [];

    constructor(private problem: Problem, private config: GAConfig) {}

    public execute(): { nfe: number; success: boolean; bestFitness: number } {
        this.initializePopulation();
        this.evaluatePopulation();
        
        let nfe = this.config.populationSize;
        let generations = 0;
        let repeatedFitnessCount = 0;
        let previousBestFitness = Infinity;

        while (repeatedFitnessCount < this.config.maxRepetitions && generations < this.config.maxGenerations) {
            const nextGeneration: Individual[] = [{ ...this.getBestIndividual() }]; // Elitismo

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
            
            if (MathUtils.isWithinTolerance(currentBestFitness, this.problem.optimumTarget)) {
                break; 
            }

            if (currentBestFitness === previousBestFitness) {
                repeatedFitnessCount++;
            } else {
                repeatedFitnessCount = 0;
            }
            
            previousBestFitness = currentBestFitness;
        }

        const bestIndividual = this.getBestIndividual();
        const isSuccess = MathUtils.isWithinTolerance(bestIndividual.fitness, this.problem.optimumTarget);
        
        return { nfe, success: isSuccess, bestFitness: bestIndividual.fitness };
    }

    private initializePopulation(): void {
        this.population = [];
        for (let i = 0; i < this.config.populationSize; i++) {
            this.population.push({
                x1: MathUtils.generateRandomNumber(this.problem.minBound, this.problem.maxBound),
                x2: MathUtils.generateRandomNumber(this.problem.minBound, this.problem.maxBound),
                fitness: 0
            });
        }
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
            if (!best || ind.fitness < best.fitness) {
                best = ind;
            }
        }
        return { ...best! };
    }

    private crossover(parent1: Individual, parent2: Individual): [Individual, Individual] {
        const child1 = { ...parent1 };
        const child2 = { ...parent2 };

        if (Math.random() < this.config.crossoverRate) {
            child1.x1 = (parent1.x1 * this.config.crossoverAlpha) + (parent2.x1 * (1 - this.config.crossoverAlpha));
            child1.x2 = (parent1.x2 * this.config.crossoverAlpha) + (parent2.x2 * (1 - this.config.crossoverAlpha));
            child2.x1 = (parent2.x1 * this.config.crossoverAlpha) + (parent1.x1 * (1 - this.config.crossoverAlpha));
            child2.x2 = (parent2.x2 * this.config.crossoverAlpha) + (parent1.x2 * (1 - this.config.crossoverAlpha));
        }

        return [child1, child2];
    }

    private mutate(individual: Individual): void {
        if (Math.random() < this.config.mutationRate) {
            individual.x1 = MathUtils.generateRandomNumber(this.problem.minBound, this.problem.maxBound);
        }
        if (Math.random() < this.config.mutationRate) {
            individual.x2 = MathUtils.generateRandomNumber(this.problem.minBound, this.problem.maxBound);
        }
    }
}