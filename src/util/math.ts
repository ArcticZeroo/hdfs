export abstract class MathUtil {
    static clamp(value: number, {min, max}: {min: number, max: number}) {
        return Math.max(min, Math.min(value, max));
    }

    static toFixed(value: number, precision: number) {
        let multiplier = 1;
        for (let i = 0; i < precision; i++) {
            multiplier *= 10;
        }
        return Math.floor(value * multiplier) / multiplier;
    }
}