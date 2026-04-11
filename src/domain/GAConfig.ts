import { assertPositiveInteger, assertProbability } from "./DomainPrimitives";

export interface GAConfig {
    readonly populationSize: number;
    readonly maxGenerations: number;
    readonly mutationRate: number;
    readonly crossoverRate: number;
    readonly tournamentSize: number;
    readonly maxRepetitions: number;
}

export function createGAConfig(config: GAConfig): GAConfig {
    assertPositiveInteger(config.populationSize, "populationSize");
    assertPositiveInteger(config.maxGenerations, "maxGenerations");
    assertProbability(config.mutationRate, "mutationRate");
    assertProbability(config.crossoverRate, "crossoverRate");
    assertPositiveInteger(config.tournamentSize, "tournamentSize");
    assertPositiveInteger(config.maxRepetitions, "maxRepetitions");

    return Object.freeze({
        populationSize: config.populationSize,
        maxGenerations: config.maxGenerations,
        mutationRate: config.mutationRate,
        crossoverRate: config.crossoverRate,
        tournamentSize: config.tournamentSize,
        maxRepetitions: config.maxRepetitions
    });
}
