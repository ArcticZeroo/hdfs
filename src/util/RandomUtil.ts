export default abstract class RandomUtil {
    /**
     * Get a random number centered around the given center value (default zero),
     * where the maximum value on each side is {n}
     */
    static centered(width: number, center: number = 0) {
        return (Math.random() * width) - (width / 2) + center;
    }
}