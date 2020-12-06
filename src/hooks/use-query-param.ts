import { useEffect, useState } from 'react';
import { searchParams, updateParam } from '../api/url/url-manager';
import { ISerializable } from '../models/serializable';

const getCurrentValue = <T>(paramName: string, serializable: ISerializable<T>, defaultValue: T) => {
    const paramValue = searchParams.urlSearchParams.get(paramName);

    if (!paramValue) {
        return defaultValue;
    }

    return serializable.deserialize(paramValue);
};

export const useQueryParam = <T>(paramName: string, paramSerializable: ISerializable<T>, defaultValue: T) => {
    const [value, setValueState] = useState(getCurrentValue(paramName, paramSerializable, defaultValue));

    useEffect(() => {
        const onSearchParamsChanged = ([newSearchParams, oldSearchParams]: [URLSearchParams, URLSearchParams]) => {
            if (newSearchParams.get(paramName) !== oldSearchParams.get(paramName)) {
                const newValue = getCurrentValue(paramName, paramSerializable, defaultValue);
                if (newValue !== value) {
                    setValueState(newValue);
                }
            }
        };

        searchParams.addListener(onSearchParamsChanged);

        return () => searchParams.removeListener(onSearchParamsChanged);
    }, []);

    const updateValue = (newValue: T) => {
        if (newValue === defaultValue) {
            updateParam(paramName, null);
        } else {
            const serializedValue = paramSerializable.serialize(newValue);
            updateParam(paramName, serializedValue);
        }
        setValueState(newValue);
    };

    return [value, updateValue] as const;
};