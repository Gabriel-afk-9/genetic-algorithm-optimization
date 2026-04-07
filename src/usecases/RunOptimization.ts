import { Problem } from "../domain/Problem";
import { GAConfig } from "../domain/GAConfig";
import { GeneticAlgorithm } from "./GeneticAlgorithm";

export class RunOptimization {
    private readonly TOTAL_RUNS = 100;

    public execute(problem: Problem, config: GAConfig): string {
        let totalNfe = 0;
        let successCount = 0;
        let absoluteBestFitness = Infinity;

        for (let i = 0; i < this.TOTAL_RUNS; i++) {
            const algorithm = new GeneticAlgorithm(problem, config);
            const result = algorithm.execute();
            
            totalNfe += result.nfe;
            
            if (result.bestFitness < absoluteBestFitness) {
                absoluteBestFitness = result.bestFitness;
            }
            if (result.success) {
                successCount++;
            }
        }

        const averageNfe = Math.round(totalNfe / this.TOTAL_RUNS);
        const successRate = Math.round((successCount / this.TOTAL_RUNS) * 100);

        return `${problem.name} NFE ${averageNfe} SR ${successRate}% | Melhor Fitness Encontrado: ${absoluteBestFitness.toFixed(5)}`;
    }
}