export default abstract class ArrayUtil {
    /**
     * Copy the given elements into the array, starting at the given {startIndex}
     * @param array The array to copy elements into
     * @param startIndex The starting index to copy elements
     * @param elements Elements to copy into this array, replacing existing items
     */
    static replace<T>(array: T[], startIndex: number, elements: T[]) {
        for (let i = 0; i < elements.length; ++i) {
            const targetIndex = startIndex + i;
            if (targetIndex >= array.length) {
                array.push(elements[i]);
            } else {
                array[targetIndex] = elements[i];
            }
        }
    }

    static sum(array: Iterable<number>) {
        let total = 0;
        for (const item of array) {
            total += item;
        }
        return total;
    }
}