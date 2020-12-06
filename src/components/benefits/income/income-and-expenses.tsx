import React, { ChangeEvent, useContext, useState } from 'react';
import { NumberParam, useQueryParam, withDefault } from 'use-query-params';
import { queryParam } from '../../../constants/query-params';
import { GrossIncomeContext, NetIncomeContext } from '../../../context/income';
import { useGrossIncome } from '../../../context/query-params';
import Card from '../../card/card';
import { Label, LabelAndInputContainer, Input, BoundedNumberInput } from '../../input/labels-and-input';

export const IncomeAndExpenses: React.FC = () => {
    const [grossIncome, setGrossIncome] = useQueryParam('gi', withDefault(NumberParam, 0));
    const [expenses, setExpenses] = useState(0);
    const [netIncome, setNetIncome] = useContext(NetIncomeContext);

    const onExpensesChanged = (newExpenses: number) => {
        setExpenses(newExpenses);
        setNetIncome(grossIncome - newExpenses);
    };

    const onGrossIncomeChanged = (newGrossIncome: number) => {
        setGrossIncome(newGrossIncome);
        setNetIncome(newGrossIncome - expenses);
    };

    return (
        <Card title="Monthly Income">
            <LabelAndInputContainer>
                <Label>
                    Gross Income ($)
                </Label>
                <BoundedNumberInput value={grossIncome} onChange={onGrossIncomeChanged} min={0}/>
            </LabelAndInputContainer>
            <LabelAndInputContainer>
                <Label>
                    Expenses ($)
                </Label>
                <BoundedNumberInput value={expenses} onChange={onExpensesChanged} min={0}/>
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