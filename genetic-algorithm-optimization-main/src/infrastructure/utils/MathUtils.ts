export class MathUtils {
    static generateRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    static isWithinTolerance(value: number, target: number, tolerance: number = 0.01): boolean {
        return Math.abs(value - target) < tolerance;
    }

    static clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }

    static generateGaussianRandom(mean: number, stdDev: number): number {
        let u1 = 1.0 - Math.random();
        let u2 = 1.0 - Math.random();
        let randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
        return mean + stdDev * randStdNormal;
    }
}