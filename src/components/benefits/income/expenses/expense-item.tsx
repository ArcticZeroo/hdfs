import React from 'react';
import { Input } from '../../../input/labels-and-input';

interface IExpenseItemProps {
    index: number;
    name: string;
    cost: number;

    onNameChanged(value: string, index: number): void;

    onCostChanged(value: number, index: number): void;
}

export const ExpenseItem: React.FC<IExpenseItemProps> = ({ index, name, cost, onNameChanged, onCostChanged }) => {
    return (
        <tr>
            <td>
                <Input value={name} type="number" onChange={event => onCostChanged(Number(event.target.value), index)}/>
            </td>
            <td>
                <Input value={name} onChange={event => onNameChanged(event.target.value, index)}/>
            </td>
        </tr>
    );
};