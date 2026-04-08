import { MutationStrategy } from "../../domain/strategies/MutationStrategy";
import { Individual } from "../../domain/Individual";
import { GAConfig } from "../../domain/GAConfig";
import { Problem } from "../../domain/Problem";
import { MathUtils } from "../utils/MathUtils";

export class GaussianMutation implements MutationStrategy {
    mutate(individual: Individual, config: GAConfig, problem: Problem): void {
        const stdDev = (problem.maxBound - problem.minBound) * 0.1;

        if (Math.random() < config.mutationRate) {
            individual.x1 += MathUtils.generateGaussianRandom(0, stdDev);
            individual.x1 = MathUtils.clamp(individual.x1, problem.minBound, problem.maxBound);
        }
        if (Math.random() < config.mutationRate) {
            individual.x2 += MathUtils.generateGaussianRandom(0, stdDev);
            individual.x2 = MathUtils.clamp(individual.x2, problem.minBound, problem.maxBound);
        }
    }
}