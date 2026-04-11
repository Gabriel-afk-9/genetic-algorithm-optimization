import { createProblem, type Problem } from "../Problem";

export function createBohachevsky1Problem(): Problem {
    return createProblem({
        name: "BF1",
        minBound: -50,
        maxBound: 50,
        optimumTarget: 0,
        calculateFitness: (x1: number, x2: number): number => {
            const term1 = x1 ** 2;
            const term2 = 2 * (x2 ** 2);
            const term3 = 0.3 * Math.cos(3 * Math.PI * x1);
            const term4 = 0.4 * Math.cos(4 * Math.PI * x2);

            return term1 + term2 - term3 - term4 + 0.7;
        }
    });
}
