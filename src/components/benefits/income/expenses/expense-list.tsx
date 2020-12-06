import React, { ChangeEvent, useState } from 'react';
import { ExpenseItem } from './expense-item';

export const ExpenseList: React.FC = () => {
    const [names, setNames] = useState<Array<string>>([]);
    const [costs, setCosts] = useState<Array<number>>([]);

    function copyAndSet<T>(array: T[], value: T, index: number) {
        const newValues = [...array];
        newValues[index] = value;
        return newValues
    }

    const onNameChanged = (value: string, valueIndex: number) => {
        setNames(copyAndSet(names, value, valueIndex));
    };

    const onCostChanged = (value: number, valueIndex: number) => {
        setCosts(copyAndSet(costs, value, valueIndex));
    };

    const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, valueIndex: number) => {
        const newValue = Number(event.target.value);
        const newValues = [...costs];
        newValues[valueIndex] = newValue;
        setCosts(newValues);
    };

    const onAddExpenseClicked = () => {
        setNames([...names, ''])
        setCosts([...costs, 0]);
    };

    const expenses = [];
    let total = 0;
    for (let i = 0; i < names.length; ++i) {
        expenses.push(<ExpenseItem index={i} name={names[i]} cost={costs[i]}
                                   onNameChanged={onNameChanged} onCostChanged={onCostChanged}/>);
        total += costs[i];
    }

    return (
        <>
            <table>

            </table>
            <button onClick={onAddExpenseClicked}>
                Add Expense
            </button>
        </>
    );
};