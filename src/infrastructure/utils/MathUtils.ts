export class MathUtils {
    static generateRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    static isWithinTolerance(value: number, target: number, tolerance: number = 0.01): boolean {
        return Math.abs(value - target) < tolerance;
    }
}