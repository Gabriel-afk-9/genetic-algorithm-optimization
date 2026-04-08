import { Individual } from "../Individual";
import { GAConfig } from "../GAConfig";
import { Problem } from "../Problem";

export interface CrossoverStrategy {
    cross(parent1: Individual, parent2: Individual, config: GAConfig, problem: Problem): [Individual, Individual];
}