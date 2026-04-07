export interface GAConfig {
    populationSize: number;
    maxGenerations: number;
    mutationRate: number;
    crossoverRate: number;
    crossoverAlpha: number;
    tournamentSize: number;
    maxRepetitions: number;
}