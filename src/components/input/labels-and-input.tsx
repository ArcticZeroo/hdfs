import React, { DetailedHTMLProps } from 'react';
import styled from 'styled-components';
import { MathUtil } from '../../util/math';

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