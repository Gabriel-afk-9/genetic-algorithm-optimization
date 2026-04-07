// 1. Bohachevsky 1 (BF1)
export function calcFitnessBf1 (x1: number, x2: number): number {
    const term1 = Math.pow(x1, 2);
    const term2 = 2 * Math.pow(x2, 2);
    const term3 = 0.3 * Math.cos(3 * Math.PI * x1);
    const term4 = 0.4 * Math.cos(4 * Math.PI * x2);

    return term1 + term2 - term3 - term4 + 0.7;
}

// 2. Camel Back - 3 Three Hump (CB3)
export function calcFitnessCb3 (x1: number, x2: number): number {
    const term1 = 2 * Math.pow(x1, 2);
    const term2 = 1.05 * Math.pow(x1, 4); 
    const term3 = (1 / 6) * Math.pow(x1, 6);
    const term4 = x1 * x2;
    const term5 = Math.pow(x2, 2);

    return term1 - term2 + term3 + term4 + term5;
}