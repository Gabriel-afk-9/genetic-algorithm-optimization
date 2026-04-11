import { assertFiniteNumber } from "./DomainPrimitives";

export type FitnessFunction = (x1: number, x2: number) => number;

export interface Problem {
    readonly name: string;
    readonly minBound: number;
    readonly maxBound: number;
    readonly optimumTarget: number;
    readonly calculateFitness: FitnessFunction;
}

export function createProblem(problem: Problem): Problem {
    const normalizedName = problem.name.trim();

    if (normalizedName.length === 0) {
        throw new Error("Problem name must not be empty.");
    }

    assertFiniteNumber(problem.minBound, "minBound");
    assertFiniteNumber(problem.maxBound, "maxBound");
    assertFiniteNumber(problem.optimumTarget, "optimumTarget");

    if (problem.minBound > problem.maxBound) {
        throw new Error("minBound must be less than or equal to maxBound.");
    }

    return Object.freeze({
        name: normalizedName,
        minBound: problem.minBound,
        maxBound: problem.maxBound,
        optimumTarget: problem.optimumTarget,
        calculateFitness: problem.calculateFitness
    });
}
