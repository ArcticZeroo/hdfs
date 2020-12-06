import { useState } from 'react';
import { searchParams, updateParam } from '../api/url/url-manager';
import { ISerializable } from '../models/serializable';

const getDefaultState = <T>(paramName: string, serializable: ISerializable<T>, defaultValue: T) => {
    const paramValue = searchParams.urlSearchParams.get(paramName);

    if (!paramValue) {
        return defaultValue;
    }

    return serializable.deserialize(paramValue);
};

export const useQueryParam = <T>(paramName: string, paramSerializable: ISerializable<T>, defaultValue: T) => {
    const [value, setValueState] = useState(getDefaultState(paramName, paramSerializable, defaultValue));

    const updateValue = (newValue: T) => {
        const serializedValue = paramSerializable.serialize(newValue);
        updateParam(paramName, serializedValue);
        setValueState(newValue);
    };

    return [value, updateValue] as const;
};