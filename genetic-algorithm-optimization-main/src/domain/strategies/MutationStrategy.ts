import { Individual } from "../Individual";
import { GAConfig } from "../GAConfig";
import { Problem } from "../Problem";

export interface MutationStrategy {
    mutate(individual: Individual, config: GAConfig, problem: Problem): void;
}