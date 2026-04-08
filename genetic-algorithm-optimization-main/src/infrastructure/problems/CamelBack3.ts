import { Problem } from "../../domain/Problem";

export class CamelBack3 implements Problem {
    readonly name = "Cb3";
    readonly minBound = -5;
    readonly maxBound = 5;
    readonly optimumTarget = 0;

    calculateFitness (x1: number, x2: number): number {
        const term1 = 2 * Math.pow(x1, 2);
        const term2 = 1.05 * Math.pow(x1, 4); 
        const term3 = (1 / 6) * Math.pow(x1, 6);
        const term4 = x1 * x2;
        const term5 = Math.pow(x2, 2);

        return term1 - term2 + term3 + term4 + term5;
    }
}