import { AG1 } from './algorithms/AG1';
import { AG2 } from './algorithms/AG2';
import { calcFitnessBf1, calcFitnessCb3 } from './problems/optimization';
import { GAConfig } from './algorithms/GeneticAlgorithm';

const NUM_REPETICOES = 100;

type AGConstructor = new (config: GAConfig) => AG1;

function testarAlgoritmo(nomeDoTeste: string, AlgoritmoClass: AGConstructor, config: GAConfig): void {
    let totalNfe = 0;
    let sucessos = 0;

    console.log(`\n${nomeDoTeste}`);

    for (let i = 0; i < NUM_REPETICOES; i++) {
        const ag = new AlgoritmoClass(config);
        const resultado = ag.run();

        totalNfe += resultado.nfe;
        
        if (resultado.success) {
            sucessos++;
        }
    }

    const mediaNfe = totalNfe / NUM_REPETICOES;
    const sr = (sucessos / NUM_REPETICOES) * 100; 

    console.log(`--- Resultados: ${nomeDoTeste} ---`);
    console.log(`NFE (Média): ${mediaNfe.toFixed(0)}`);
    console.log(`SR (Taxa de Sucesso): ${sr}%`);
    console.log(`-------------------------------------------------`);
}

const configBf1: GAConfig = {
    populationSize: 100,
    maxGenerations: 1000,
    mutationRate: 0.1,
    crossoverRate: 0.9,
    crossoverAlpha: 0.8,
    tournamentSize: 3,
    perturbationSize: 0.5,
    bounds: { min: -50, max: 50 }, 
    fitnessFunction: calcFitnessBf1
};

const configCb3: GAConfig = {
    populationSize: 100,
    maxGenerations: 1000,
    mutationRate: 0.1,
    crossoverRate: 0.9,
    crossoverAlpha: 0.8,
    tournamentSize: 3,
    perturbationSize: 0.5,
    bounds: { min: -5, max: 5 },
    fitnessFunction: calcFitnessCb3
};

testarAlgoritmo("BF1 - Método AG1 (Mutação Total)", AG1, configBf1);
testarAlgoritmo("BF1 - Método AG2 (Mutação Perturbação)", AG2, configBf1);

testarAlgoritmo("CB3 - Método AG1 (Mutação Total)", AG1, configCb3);
testarAlgoritmo("CB3 - Método AG2 (Mutação Perturbação)", AG2, configCb3);