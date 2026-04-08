import { CrossoverStrategy } from "../../domain/strategies/CrossoverStrategy";
import { Individual } from "../../domain/Individual";
import { GAConfig } from "../../domain/GAConfig";
import { Problem } from "../../domain/Problem";

export class ArithmeticCrossover implements CrossoverStrategy {
    cross(parent1: Individual, parent2: Individual, config: GAConfig, problem: Problem): [Individual, Individual] {
        const child1 = { ...parent1 };
        const child2 = { ...parent2 };

        if (Math.random() < config.crossoverRate) {
            const alpha = Math.random(); 

            child1.x1 = (parent1.x1 * alpha) + (parent2.x1 * (1 - alpha));
            child1.x2 = (parent1.x2 * alpha) + (parent2.x2 * (1 - alpha));
            child2.x1 = (parent2.x1 * alpha) + (parent1.x1 * (1 - alpha));
            child2.x2 = (parent2.x2 * alpha) + (parent1.x2 * (1 - alpha));
        }
        return [child1, child2];
    }
}