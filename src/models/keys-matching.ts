/**
 * A utility type which allows you to assert that the given type only has keys with the given type as values.
 */
export type KeysMatching<T, V> = { [K in keyof T]-?: V; }