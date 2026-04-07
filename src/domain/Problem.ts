export interface Problem {
    readonly name: string;
    readonly minBound: number;
    readonly maxBound: number;
    readonly optimumTarget: number;

    calculateFitness(x1: number, x2: number): number;
}