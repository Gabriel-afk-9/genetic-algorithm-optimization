import { Individual } from "../models/Individual";
import { generateRandomNumber } from "../utils/math";

type FitnessFunction = (x1: number, x2: number) => number;

export interface GAConfig {
    populationSize: number;
    maxGenerations: number;
    mutationRate: number;
    crossoverRate: number;
    bounds: {
        min: number;
        max: number
    },
    fitnessFunction: FitnessFunction; 
}

export class GeneticAlgorithm {
    protected config: GAConfig;
    private population: Individual[] = [];

    constructor(config: GAConfig) {
        this.config = config;
    }
    public initializePopulation(): void {
        this.population = [];
        for (let i = 0; i < this.config.populationSize; i++) {
            const x1 = generateRandomNumber(this.config.bounds.min, this.config.bounds.max);
            const x2 = generateRandomNumber(this.config.bounds.min, this.config.bounds.max);
            
            this.population.push({
                x1,
                x2,
                fitness: 0
            });
        }
    }

    public evaluatePopulation(): void {
        for (const ind of this.population) {
            ind.fitness = this.config.fitnessFunction(ind.x1, ind.x2);
        }
    }

    public getBestIndividual(): Individual {
        return this.population.reduce((best, current) => {
            return current.fitness < best.fitness ? current : best;
        });
    }

    private tournamentSelection(tournamentSize: number = 3): Individual {
        let bestContender: Individual | null = null;

        for (let i = 0; i < tournamentSize; i++) {
            const randomIndex = Math.floor(Math.random() * this.population.length);
            const contender = this.population[randomIndex];

            if (!bestContender || contender.fitness < bestContender.fitness) {
                bestContender = contender;
            }
        }

        return { ...bestContender! }; 
    }

    private crossover(parent1: Individual, parent2: Individual): [Individual, Individual] {
        if (Math.random() > this.config.crossoverRate) {
            return [{ ...parent1 }, { ...parent2 }];
        }

        const alpha = 0.8;

        const child1: Individual = {
            x1: (parent1.x1 * alpha) + (parent2.x1 * (1 - alpha)),
            x2: (parent1.x2 * alpha) + (parent2.x2 * (1 - alpha)),
            fitness: 0
        };

        const child2: Individual = {
            x1: (parent2.x1 * alpha) + (parent1.x1 * (1 - alpha)),
            x2: (parent2.x2 * alpha) + (parent1.x2 * (1 - alpha)),
            fitness: 0
        };

        return [child1, child2];
    }

    protected mutate(individual: Individual): void {
        if (Math.random() < this.config.mutationRate) {
            if (Math.random() < 0.5) {
                individual.x1 = generateRandomNumber(this.config.bounds.min, this.config.bounds.max);
            } else {
                individual.x2 = generateRandomNumber(this.config.bounds.min, this.config.bounds.max);
            }
        }
    }

    public evolve(): void {
        const newPopulation: Individual[] = [];

        const bestCurrent = this.getBestIndividual();
        newPopulation.push({ ...bestCurrent }); 

        while (newPopulation.length < this.config.populationSize) {
            const p1 = this.tournamentSelection();
            const p2 = this.tournamentSelection();

            const [child1, child2] = this.crossover(p1, p2);

            this.mutate(child1);
            this.mutate(child2);

            newPopulation.push(child1);
            
            if (newPopulation.length < this.config.populationSize) {
                newPopulation.push(child2);
            }
        }

        this.population = newPopulation;
        this.evaluatePopulation();
    }
}