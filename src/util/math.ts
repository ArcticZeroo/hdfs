export abstract class MathUtil {
    static clamp(value: number, {min, max}: {min: number, max: number}) {
        return Math.max(min, Math.min(value, max));
    }

    static toFixed(value: number, precision: number) {
        const multiplier = Math.pow(10, precision);
        return Math.floor(value * multiplier) / multiplier;
    }
}