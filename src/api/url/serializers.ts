import { ISerializable } from '../../models/serializable';

export const stringSerializer: ISerializable<string> = {
    serialize(value) {
        return value;
    },
    deserialize(value) {
        return value;
    }
};

export const numberSerializer: ISerializable<number> = {
    serialize(value) {
        return value.toString();
    },
    deserialize(value) {
        return Number(value);
    }
};

export const booleanSerializer: ISerializable<boolean> = {
    serialize(value: boolean): string {
        return Number(value).toString();
    },
    deserialize(value: string): boolean {
        return Boolean(Number(value));
    }
}

export const enumSerializer = (values: string[]): ISerializable<string> => ({
    serialize(value: string): string {
        const enumIndex = values.indexOf(value)
        if (enumIndex === -1) {
            return '';
        }
        return enumIndex.toString();
    },
    deserialize(value: string): string {
        const asIndex = Number(value);
        if (Number.isNaN(asIndex)) {
            return '';
        }
        return values[asIndex];
    }
})