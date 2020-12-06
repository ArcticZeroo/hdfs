import React from 'react';
import { getTotalTax } from '../../../api/tax/tax-bracket';
import { useExpenses, useGrossIncome } from '../../../hooks/query-params';
import { MathUtil } from '../../../util/math';
import { Card, CardBody, CardTitle } from '../../card/card';
import { Label, LabelAndInputContainer, Input, BoundedNumberInput } from '../../input/labels-and-input';
import { Hint } from '../../styled/hint';

export const IncomeAndExpenses: React.FC = () => {
    const [grossIncome, setGrossIncome] = useGrossIncome();
    const [expenses, setExpenses] = useExpenses();
    const netIncome = grossIncome - expenses;
    const taxAmount = getTotalTax(grossIncome * 12);
    const afterTax = MathUtil.toFixed(netIncome - (taxAmount / 12), 2);

    return (
        <Card>
            <CardTitle>
                Monthly Income
            </CardTitle>
            <CardBody>
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
                        Net Income Pre-Tax ($)
                    </Label>
                    <Input type="number" disabled={true} value={netIncome}/>
                </LabelAndInputContainer>
                <LabelAndInputContainer>
                    <Label>
                        Net Income After-Tax ($)<br/>
                        <Hint>Based on the 2020 income tax bracket</Hint>
                    </Label>
                    <Input type="number" disabled={true} value={afterTax}/>
                </LabelAndInputContainer>
            </CardBody>
        </Card>
    );
};