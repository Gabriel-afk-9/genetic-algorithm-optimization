import { createGAConfig } from "./domain/GAConfig";
import { type OptimizationSummary } from "./domain/OptimizationResult";
import { createBohachevsky1Problem } from "./domain/problems/Bohachevsky1Problem";
import { createCamelBack3Problem } from "./domain/problems/CamelBack3Problem";
import { MathRandomSource } from "./infrastructure/utils/MathRandomSource";
import { RunOptimization } from "./usecases/RunOptimization";

function formatSummary(summary: OptimizationSummary): string {
    const successRate = Math.round(summary.successRate * 100);

    return `${summary.problemName} NFE ${summary.averageNfe} SR ${successRate}% | Melhor Fitness Encontrado: ${summary.bestFitness.toFixed(5)}`;
}

function main(): void {
    const randomSource = new MathRandomSource();
    const runOptimization = new RunOptimization(randomSource);

    const configBf1 = createGAConfig({
        populationSize: 100,
        maxGenerations: 1000,
        mutationRate: 0.07,
        crossoverRate: 0.95,
        tournamentSize: 5,
        maxRepetitions: 5
    });

    const configCb3 = createGAConfig({
        populationSize: 100,
        maxGenerations: 1000,
        mutationRate: 0.1,
        crossoverRate: 0.9,
        tournamentSize: 3,
        maxRepetitions: 5
    });

    console.log(formatSummary(runOptimization.execute(createBohachevsky1Problem(), configBf1)));
    console.log(formatSummary(runOptimization.execute(createCamelBack3Problem(), configCb3)));
}

main();
