export abstract class MathUtil {
    static clamp(value: number, {min, max}: {min: number, max: number}) {
        return Math.max(min, Math.min(value, max));
    }
}