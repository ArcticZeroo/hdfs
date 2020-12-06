/**
 * This file contains type guards that allow narrowing of types from an unknown type to a known type.
 * see https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards for more info
 */


import { RecordKey, RecordObject } from '../models/record';

// the result of the typeof operator, but with an additional string "any" to represent a non-null value
export type TypeofResult =
    'string'
    | 'number'
    | 'object'
    | 'boolean'
    | 'symbol'
    | 'function'
    | 'bigint'
    | 'undefined'
    | 'non-null';

/**
 * Given a value and a map of expected prop types for each key in the value, return whether all prop types match the
 * expected type.
 * @param value - The value, which must first be guarded via isObject
 * @param expectedPropTypes - A map of <key, expected typeof result string> for your interface
 */
function propTypesMatch(value: Record<RecordKey, unknown>, expectedPropTypes: Record<RecordKey, TypeofResult>) {
    return Object.keys(value).every(key => (
        expectedPropTypes[key] == null
        || (expectedPropTypes[key] === 'non-null' && value[key] != null)
        || typeof value[key] === expectedPropTypes[key]
    ));
}

/**
 * Type guard for a standard JS object (in TypeScript, this is a Record<RecordKey, unknown>
 * @param value - The value to guard
 */
export function isObject(value: unknown): value is RecordObject {
    return value != null && typeof value === 'object';
}

/**
 * Type guard for an arbitrary interface T, given a map of its expected prop types for each key.
 * "duck interface" refers to the property of dynamically typed languages called duck typing, which allows any
 * two types T and U to be assignable to one another as long as the their signatures are identical -- i.e. their keys
 * have the correct types, functions have the correct argument/return types, etc.
 * @param value - The value to guard
 * @param expectedPropTypes - A map of <key, expected typeof result string> for your interface
 */
export function isDuckInterface<T>(value: unknown, expectedPropTypes: { [K in keyof T]?: TypeofResult }): value is T {
    return isObject(value)
           && propTypesMatch(value, expectedPropTypes as Record<RecordKey, TypeofResult>);
}
