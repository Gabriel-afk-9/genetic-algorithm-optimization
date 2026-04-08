import { GAConfig } from "./domain/GAConfig";
import { Bohachevsky1 } from "./infrastructure/problems/Bohachevsky1";
import { CamelBack3 } from "./infrastructure/problems/CamelBack3";
import { RunOptimization } from "./usecases/RunOptimization";

function main() {
    const runOptimization = new RunOptimization();
    
    const configBf1: GAConfig = { 
        populationSize: 100, 
        maxGenerations: 1000, 
        mutationRate: 0.10, 
        crossoverRate: 0.93, 
        tournamentSize: 3, 
        maxRepetitions: 5
        
    };
    
    const configCb3: GAConfig = { 
        populationSize: 50, 
        maxGenerations: 1000, 
        mutationRate: 0.05, 
        crossoverRate: 0.95, 
        tournamentSize: 5, 
        maxRepetitions: 5 
    };

    console.log("Executando Otimizações...");
    console.log(runOptimization.execute(new Bohachevsky1(), configBf1));
    console.log(runOptimization.execute(new CamelBack3(), configCb3));
}

main();