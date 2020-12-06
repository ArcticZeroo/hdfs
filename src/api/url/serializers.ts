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
