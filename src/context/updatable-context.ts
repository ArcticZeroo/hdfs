import React from 'react';

type IUpdatableContext<T> = [T, (value: T) => void];

export const createUpdatableContext = <T>(defaultValue: T) => {
    return React.createContext<IUpdatableContext<T>>([defaultValue, () => void 0]);
};