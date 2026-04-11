import { createProblem, type Problem } from "../Problem";

export function createCamelBack3Problem(): Problem {
    return createProblem({
        name: "CB3",
        minBound: -5,
        maxBound: 5,
        optimumTarget: 0,
        calculateFitness: (x1: number, x2: number): number => {
            const term1 = 2 * (x1 ** 2);
            const term2 = 1.05 * (x1 ** 4);
            const term3 = (1 / 6) * (x1 ** 6);
            const term4 = x1 * x2;
            const term5 = x2 ** 2;

            return term1 - term2 + term3 + term4 + term5;
        }
    });
}
