import React from 'react';
import { useExpenses, useGrossIncome } from '../../../hooks/query-params';
import Card from '../../card/card';
import { Label, LabelAndInputContainer, Input, BoundedNumberInput } from '../../input/labels-and-input';

export const IncomeAndExpenses: React.FC = () => {
    const [grossIncome, setGrossIncome] = useGrossIncome();
    const [expenses, setExpenses] = useExpenses();
    const netIncome = grossIncome - expenses;

    return (
        <Card title="Monthly Income">
            <LabelAndInputContainer>
                <Label>
                    Gross Income ($)
                </Label>
                <BoundedNumberInput value={grossIncome} onChange={setGrossIncome} min={0}/>
            </LabelAndInputContainer>
            <LabelAndInputContainer>
                <Label>
                    Expenses ($)
                </Label>
                <BoundedNumberInput value={expenses} onChange={setExpenses} min={0}/>
            </LabelAndInputContainer>
            <LabelAndInputContainer>
                <Label>
                    Net Income ($)
                </Label>
                <Input type="number" disabled={true} value={netIncome}/>
            </LabelAndInputContainer>
        </Card>
    );
};