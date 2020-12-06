/**
 * A utility method to tell typescript that Object.keys returns a list of keys for the given object.
 * This only works when the object has string keys.
 * @param obj - The object to get keys for.
 * @returns The same as Object.keys
 */
import { KeysMatching } from '../models/keys-matching';

export function keysOf<T extends KeysMatching<T, string>>(obj: T): Array<keyof T> {
    return Object.keys(obj) as Array<keyof T>;
}