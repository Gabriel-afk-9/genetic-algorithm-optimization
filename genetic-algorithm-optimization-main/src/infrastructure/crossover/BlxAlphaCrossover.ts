import { CrossoverStrategy } from "../../domain/strategies/CrossoverStrategy";
import { Individual } from "../../domain/Individual";
import { GAConfig } from "../../domain/GAConfig";
import { Problem } from "../../domain/Problem";
import { MathUtils } from "../utils/MathUtils";

export class BlxAlphaCrossover implements CrossoverStrategy {
    cross(parent1: Individual, parent2: Individual, config: GAConfig, problem: Problem): [Individual, Individual] {
        const child1 = { ...parent1 };
        const child2 = { ...parent2 };

        if (Math.random() < config.crossoverRate) {
            const alpha = 0.5; 
            
            const minX1 = Math.min(parent1.x1, parent2.x1);
            const maxX1 = Math.max(parent1.x1, parent2.x1);
            const diffX1 = maxX1 - minX1;
            child1.x1 = MathUtils.clamp(MathUtils.generateRandomNumber(minX1 - alpha * diffX1, maxX1 + alpha * diffX1), problem.minBound, problem.maxBound);
            child2.x1 = MathUtils.clamp(MathUtils.generateRandomNumber(minX1 - alpha * diffX1, maxX1 + alpha * diffX1), problem.minBound, problem.maxBound);
            
            const minX2 = Math.min(parent1.x2, parent2.x2);
            const maxX2 = Math.max(parent1.x2, parent2.x2);
            const diffX2 = maxX2 - minX2;
            child1.x2 = MathUtils.clamp(MathUtils.generateRandomNumber(minX2 - alpha * diffX2, maxX2 + alpha * diffX2), problem.minBound, problem.maxBound);
            child2.x2 = MathUtils.clamp(MathUtils.generateRandomNumber(minX2 - alpha * diffX2, maxX2 + alpha * diffX2), problem.minBound, problem.maxBound);
        }
        return [child1, child2];
    }
}