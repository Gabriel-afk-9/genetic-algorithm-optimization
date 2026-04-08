import { GAConfig, CrossoverStrategy, MutationStrategy } from "./domain/GAConfig"; // <-- Importe os tipos novos!
import { Problem } from "./domain/Problem";
import { Bohachevsky1 } from "./infrastructure/problems/Bohachevsky1";
import { CamelBack3 } from "./infrastructure/problems/CamelBack3";
import { RunOptimization } from "./usecases/RunOptimization";
import { MathUtils } from "./infrastructure/utils/MathUtils";

interface TuningLimits {
    minPop: number; maxPop: number;
    minMut: number; maxMut: number;
    minCross: number; maxCross: number;
    minTour: number; maxTour: number;
}

const problemLimits: Record<string, TuningLimits> = {
    "Bf1": {
        minPop: 50, maxPop: 150,    
        minMut: 0.05, maxMut: 0.15,  
        minCross: 0.80, maxCross: 0.95,
        minTour: 3, maxTour: 5
    },
    "Cb3": {
        minPop: 30, maxPop: 80,      
        minMut: 0.01, maxMut: 0.05,  
        minCross: 0.90, maxCross: 0.99, 
        minTour: 4, maxTour: 8       
    }
};

const crossoverStrategies: CrossoverStrategy[] = ['ARITHMETIC', 'BLX_ALPHA'];
const mutationStrategies: MutationStrategy[] = ['UNIFORM', 'GAUSSIAN'];

function runAutoTuner(problem: Problem, targetNfe: number, targetSr: number) {
    const runOptimization = new RunOptimization();
    const limits = problemLimits[problem.name];

    if (!limits) return;

    console.log(`AutoTuner para: ${problem.name}`);
    console.log(`Meta: NFE < ${targetNfe} e SR = ${targetSr}%`);

    let attempt = 1;
    let find = false;

    while (!find) {
        const randomCrossoverStrategy = crossoverStrategies[Math.floor(Math.random() * crossoverStrategies.length)];
        const randomMutationStrategy = mutationStrategies[Math.floor(Math.random() * mutationStrategies.length)];

        const randomConfig: GAConfig = {
            populationSize: Math.floor(MathUtils.generateRandomNumber(limits.minPop, limits.maxPop)),
            maxGenerations: 1000,
            mutationRate: parseFloat(MathUtils.generateRandomNumber(limits.minMut, limits.maxMut).toFixed(2)), 
            crossoverRate: parseFloat(MathUtils.generateRandomNumber(limits.minCross, limits.maxCross).toFixed(2)),
            tournamentSize: Math.floor(MathUtils.generateRandomNumber(limits.minTour, limits.maxTour)),
            maxRepetitions: 5,            
            crossoverStrategy: randomCrossoverStrategy,
            mutationStrategy: randomMutationStrategy
        };

        const resultText = runOptimization.execute(problem, randomConfig);
        
        const nfeExtracted = parseInt(resultText.split("NFE ")[1].split(" ")[0]);
        const srExtracted = parseInt(resultText.split("SR ")[1].split("%")[0]);

        console.log(`[${randomCrossoverStrategy} + ${randomMutationStrategy}] -> NFE: ${nfeExtracted} | SR: ${srExtracted}%`);

        if (nfeExtracted < targetNfe && srExtracted >= targetSr) {
            find = true;
            console.log("\nCONFIGURAÇÃO ENCONTRADA!");
            console.log(resultText);
            console.log(randomConfig);
        }

        attempt++;
    }
}

function startTuning() {
    const bf1 = new Bohachevsky1();
    const cb3 = new CamelBack3();
    
    runAutoTuner(cb3, 140, 100); 
    // runAutoTuner(bf1, 657, 100); 
}

startTuning();