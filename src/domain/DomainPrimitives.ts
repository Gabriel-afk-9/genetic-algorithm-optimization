export function assertFiniteNumber(value: number, fieldName: string): void {
    if (!Number.isFinite(value)) {
        throw new Error(`${fieldName} must be a finite number.`);
    }
}

export function assertProbability(value: number, fieldName: string): void {
    assertFiniteNumber(value, fieldName);

    if (value < 0 || value > 1) {
        throw new Error(`${fieldName} must be between 0 and 1.`);
    }
}

export function assertPositiveInteger(value: number, fieldName: string): void {
    if (!Number.isInteger(value) || value <= 0) {
        throw new Error(`${fieldName} must be a positive integer.`);
    }
}

export function assertNonNegativeInteger(value: number, fieldName: string): void {
    if (!Number.isInteger(value) || value < 0) {
        throw new Error(`${fieldName} must be a non-negative integer.`);
    }
}
