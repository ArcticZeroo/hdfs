export interface ISerializable<T> {
    serialize(value: T): string;
    deserialize(value: string): T;
}