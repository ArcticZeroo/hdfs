import React, { ChangeEvent, DetailedHTMLProps } from 'react';
import styled from 'styled-components';
import { MathUtil } from '../../util/math';
import { StringUtil } from '../../util/string';

export const LabelAndInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0 0.5rem 0;
`;

export const Label = styled.label`
  margin-right: 2rem;
`;

export const Input = styled.input`
  padding: 0.35rem 0.75rem 0.35rem 0.75rem;
  border: none;
  outline: none;
  border-radius: 0.25rem;

  :disabled {
    background: rgba(255, 255, 255, 0.85);
  }
`;

const RadioButtonInput = styled.input`
`;

const RadioButtonLabel = styled.label`
  padding-left: 0.25rem;
  padding-right: 1rem;
`;


interface IBoundedNumberInputProps {
    min?: number;
    max?: number;
    value: number;

    onChange(value: number): void;

    placeholder?: string;
    id?: string;
    className?: string;
}

export const BoundedNumberInput: React.FC<IBoundedNumberInputProps> = ({
                                                                           min = Number.MIN_SAFE_INTEGER,
                                                                           max = Number.MAX_SAFE_INTEGER,
                                                                           value,
                                                                           onChange,
                                                                           ...props
                                                                       }) => {
    return <Input {...props} type="number" value={MathUtil.clamp(value, { min, max })}
                  onChange={event => onChange(MathUtil.clamp(Number(event.target.value), { min, max }))}/>;
};

interface IBooleanInputProps {
    nameBase: string;
    value: boolean;

    onChange(newValue: boolean): void;
}

export const BooleanInput: React.FC<IBooleanInputProps> = ({ nameBase, value, onChange }) => {
    const onYesNoButtonClicked = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value === 'yes');
    };

    const YesNoButton = ({ isYes }: { isYes: boolean }) => {
        const name = isYes ? 'Yes' : 'No';
        const id = `${nameBase}-${name.toLowerCase()}`;
        return (
            <>
                <RadioButtonInput type="radio" name={nameBase} id={id} value={name.toLowerCase()}
                                  onChange={onYesNoButtonClicked}
                                  checked={isYes === value}/><RadioButtonLabel
                htmlFor={id}>{StringUtil.capitalize(name)}</RadioButtonLabel>
            </>
        );
    };

    return (
        <div>
            <YesNoButton isYes={true}/>
            <YesNoButton isYes={false}/>
        </div>
    );
};

interface IEnumSelection<T extends Record<string, string>> {
    options: T;
    names: Record<keyof T, string>;
    value: T[keyof T];
    defaultValue: T[keyof T];

    onChange(value: T[keyof T]): void;
}

export function EnumInput<T extends Record<string, string>>({ options, names, value, defaultValue, onChange }: IEnumSelection<T>) {
   type EnumMember = keyof typeof options;

    const onValueChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        if (newValue in options) {
            onChange(options[newValue as EnumMember]);
        } else {
            onChange(defaultValue);
        }
    };

    return (
        <select onChange={onValueChange} value={value}>
            {Object.keys(options).map(option => (
                <option value={options[option]}>
                    {names[option]}
                </option>
            ))}
        </select>
    )
}

