import { MutationStrategy } from "../../domain/strategies/MutationStrategy";
import { Individual } from "../../domain/Individual";
import { GAConfig } from "../../domain/GAConfig";
import { Problem } from "../../domain/Problem";
import { MathUtils } from "../utils/MathUtils";

export class UniformMutation implements MutationStrategy {
    mutate(individual: Individual, config: GAConfig, problem: Problem): void {
        if (Math.random() < config.mutationRate) {
            individual.x1 = MathUtils.generateRandomNumber(problem.minBound, problem.maxBound);
        }
        if (Math.random() < config.mutationRate) {
            individual.x2 = MathUtils.generateRandomNumber(problem.minBound, problem.maxBound);
        }
    }
}