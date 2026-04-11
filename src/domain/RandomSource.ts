import { assertFiniteNumber, assertPositiveInteger } from "./DomainPrimitives";

export interface RandomSource {
    nextProbability(): number;
    nextBetween(min: number, max: number): number;
    nextIndex(length: number): number;
}

export function assertRange(min: number, max: number): void {
    assertFiniteNumber(min, "min");
    assertFiniteNumber(max, "max");

    if (min > max) {
        throw new Error("min must be less than or equal to max.");
    }
}

export function assertCollectionLength(length: number): void {
    assertPositiveInteger(length, "length");
}
