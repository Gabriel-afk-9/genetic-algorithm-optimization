import { assertPositiveInteger } from "../domain/DomainPrimitives";
import { type GAConfig } from "../domain/GAConfig";
import { createOptimizationSummary, type OptimizationSummary } from "../domain/OptimizationResult";
import { type Problem } from "../domain/Problem";
import { type RandomSource } from "../domain/RandomSource";
import { GeneticAlgorithm } from "./GeneticAlgorithm";

export class RunOptimization {
    constructor(
        private readonly randomSource: RandomSource,
        private readonly totalRuns: number = 100
    ) {
        assertPositiveInteger(totalRuns, "totalRuns");
    }

    public execute(problem: Problem, config: GAConfig): OptimizationSummary {
        let totalNfe = 0;
        let successCount = 0;
        let absoluteBestFitness = Infinity;

        for (let i = 0; i < this.totalRuns; i++) {
            const algorithm = new GeneticAlgorithm(problem, config, this.randomSource);
            const result = algorithm.execute();
            totalNfe += result.nfe;

            if (result.bestFitness < absoluteBestFitness) {
                absoluteBestFitness = result.bestFitness;
            }

            if (result.success) {
                successCount++;
            }
        }

        return createOptimizationSummary({
            problemName: problem.name,
            totalRuns: this.totalRuns,
            successfulRuns: successCount,
            successRate: successCount / this.totalRuns,
            averageNfe: Math.round(totalNfe / this.totalRuns),
            bestFitness: absoluteBestFitness
        });
    }
}
