import { assertCollectionLength, assertRange, type RandomSource } from "../../domain/RandomSource";

export class MathRandomSource implements RandomSource {
    public nextProbability(): number {
        return Math.random();
    }

    public nextBetween(min: number, max: number): number {
        assertRange(min, max);

        if (min === max) {
            return min;
        }

        return (this.nextProbability() * (max - min)) + min;
    }

    public nextIndex(length: number): number {
        assertCollectionLength(length);

        return Math.floor(this.nextProbability() * length);
    }
}
