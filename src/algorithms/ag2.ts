import { AG1 } from './AG1';
import { Individual } from '../models/Individual';
import { generateRandomNumber } from '../utils/math';

export class AG2 extends AG1 {
    
    protected mutate(individual: Individual): void {
        if (Math.random() < this.config.mutationRate) {
            
            const perturbacao = this.config.perturbationSize ?? 0.5;
            
            if (Math.random() < 0.5) {
                individual.x1 += generateRandomNumber(-perturbacao, perturbacao);
                individual.x1 = Math.max(this.config.bounds.min, Math.min(this.config.bounds.max, individual.x1));
            } else {
                individual.x2 += generateRandomNumber(-perturbacao, perturbacao);
                individual.x2 = Math.max(this.config.bounds.min, Math.min(this.config.bounds.max, individual.x2));
            }
        }
    }
}