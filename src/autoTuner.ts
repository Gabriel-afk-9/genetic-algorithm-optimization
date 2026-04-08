import { GAConfig } from "./domain/GAConfig";
import { Problem } from "./domain/Problem";
import { Bohachevsky1 } from "./infrastructure/problems/Bohachevsky1";
import { CamelBack3 } from "./infrastructure/problems/CamelBack3";
import { RunOptimization } from "./usecases/RunOptimization";
import { MathUtils } from "./infrastructure/utils/MathUtils";

function runAutoTuner(problem: Problem, targetNfe: number, targetSr: number) {
    const runOptimization = new RunOptimization();
    
    console.log(`Iniciando auto testador para: ${problem.name}`);
    console.log(`Objetivo: NFE < ${targetNfe} e SR = ${targetSr}%`);

    let attempt = 1;
    let find = false;

    while (!find) {
        const randomConfig: GAConfig = {
            populationSize: 100, 
            maxGenerations: 1000,
            mutationRate: parseFloat(MathUtils.generateRandomNumber(0.05, 0.4).toFixed(2)), 
            crossoverRate: parseFloat(MathUtils.generateRandomNumber(0.7, 0.95).toFixed(2)),
            crossoverAlpha: parseFloat(MathUtils.generateRandomNumber(0.5, 0.9).toFixed(2)),
            tournamentSize: Math.floor(MathUtils.generateRandomNumber(2, 6)),
            maxRepetitions: 5
        };

        const resultText = runOptimization.execute(problem, randomConfig);
        
        const nfeExtracted = parseInt(resultText.split("NFE ")[1].split(" ")[0]);
        const srExtracted = parseInt(resultText.split("SR ")[1].split("%")[0]);

        console.log(`NFE: ${nfeExtracted} | SR: ${srExtracted}%`);

        if (nfeExtracted < targetNfe && srExtracted >= targetSr) {
            find = true;
            console.log("\nCONFIGURAÇÃO ENCONTRADA!");
            console.log(resultText);
            console.log("A melhor config encontrada: ");
            console.log(randomConfig);
        }

        attempt ++;
    }
}

function startTuning() {
    const bf1 = new Bohachevsky1();
    const cb3 = new CamelBack3();
    
    // runAutoTuner(bf1, 754, 100); 
    runAutoTuner(cb3, 163, 100); 
}

startTuning();