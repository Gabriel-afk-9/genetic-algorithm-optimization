import { GeneticAlgorithm, GAConfig } from './GeneticAlgorithm';

export class AG1 extends GeneticAlgorithm {
    
    constructor(config: GAConfig) {
        super(config);
    }

    public run(): { bestFitness: number, nfe: number, success: boolean } {
        this.initializePopulation();
        this.evaluatePopulation();
        
        let nfe = this.config.populationSize;
        let generations = 0;
        let contFitRep = 0;
        let minFitAnterior = Infinity;

        while (contFitRep < 20 && generations < this.config.maxGenerations) {
            this.evolve();
            
            nfe += this.config.populationSize; 
            generations++;

            const minFitAtual = this.getBestIndividual().fitness;

            if (minFitAtual === minFitAnterior) {
                contFitRep++;
            } else {
                contFitRep = 0;
            }

            minFitAnterior = minFitAtual;
        }

        const bestResult = this.getBestIndividual().fitness;
        
        const success = Math.abs(bestResult - 0) < 0.01;

        return { bestFitness: bestResult, nfe, success };
    }
}