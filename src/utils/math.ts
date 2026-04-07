export function generateRandomNumber (min: number, max: number) {
    return Math.random() * (max - min) + min;
}