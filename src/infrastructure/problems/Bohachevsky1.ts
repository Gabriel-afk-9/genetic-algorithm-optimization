import { Problem } from "../../domain/Problem";

export class Bohachevsky1 implements Problem{
    readonly name = "Bf1";
    readonly minBound = -50;
    readonly maxBound = 50;
    readonly optimumTarget = 0;

    calculateFitness (x1: number, x2: number): number {
        const term1 = Math.pow(x1, 2);
        const term2 = 2 * Math.pow(x2, 2);
        const term3 = 0.3 * Math.cos(3 * Math.PI * x1);
        const term4 = 0.4 * Math.cos(4 * Math.PI * x2);

        return term1 + term2 - term3 - term4 + 0.7;
    }
}