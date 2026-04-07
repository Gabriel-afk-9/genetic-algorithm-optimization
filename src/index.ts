import { GAConfig } from "./domain/GAConfig";
import { Bohachevsky1 } from "./infrastructure/problems/Bohachevsky1";
import { CamelBack3 } from "./infrastructure/problems/CamelBack3";
import { RunOptimization } from "./usecases/RunOptimization";

function main() {
    const runOptimization = new RunOptimization();

    const bf1Problem = new Bohachevsky1();
    const cb3Problem = new CamelBack3();

    const configBf1: GAConfig = {
        populationSize: 100,      // Tamanho da população
        maxGenerations: 1000,     // Limite máximo de gerações
        mutationRate: 0.07,       // Taxa de mutação
        crossoverRate: 0.95,      // Taxa de cruzamento
        crossoverAlpha: 0.68,     // Carga genética do melhor pai
        tournamentSize: 5,        // Quantos lutam no torneio
        maxRepetitions: 5         // Critério de parada
    };

    const configCb3: GAConfig = { 
        populationSize: 100,
        maxGenerations: 1000,
        mutationRate: 0.1,
        crossoverRate: 0.9,
        crossoverAlpha: 0.8,
        tournamentSize: 3,
        maxRepetitions: 5
        // ...configBf1
    }; 

    const resultBf1 = runOptimization.execute(bf1Problem, configBf1);
    const resultCb3 = runOptimization.execute(cb3Problem, configCb3);

    console.log(resultBf1);
    console.log(resultCb3);
}

main();