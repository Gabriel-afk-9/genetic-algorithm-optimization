import { assertFiniteNumber } from "./DomainPrimitives";

export interface DecisionVariables {
    readonly x1: number;
    readonly x2: number;
}

export interface Individual extends DecisionVariables {
    readonly fitness: number;
}

export function createIndividual(
    decisionVariables: DecisionVariables,
    fitness: number = 0
): Individual {
    assertFiniteNumber(decisionVariables.x1, "x1");
    assertFiniteNumber(decisionVariables.x2, "x2");
    assertFiniteNumber(fitness, "fitness");

    return Object.freeze({
        x1: decisionVariables.x1,
        x2: decisionVariables.x2,
        fitness
    });
}

export function withFitness(
    decisionVariables: DecisionVariables,
    fitness: number
): Individual {
    return createIndividual(decisionVariables, fitness);
}
