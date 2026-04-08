export type CrossoverStrategy = 'ARITHMETIC' | 'BLX_ALPHA';
export type MutationStrategy = 'UNIFORM' | 'GAUSSIAN';

export interface GAConfig {
    populationSize: number;
    maxGenerations: number;
    mutationRate: number;
    crossoverRate: number;
    tournamentSize: number;
    maxRepetitions: number;    
    crossoverStrategy: CrossoverStrategy;
    mutationStrategy: MutationStrategy;
}