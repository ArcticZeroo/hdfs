import React from 'react';
import { getRawYearlyTaxAmount } from '../../../api/income/income';
import { standardDeduction2020 } from '../../../constants/finance';
import { useExpenses, useGrossIncome, usePersonalUse, useStateTax } from '../../../hooks/query-params';
import { MathUtil } from '../../../util/math';
import { Card, CardBody, CardTitle } from '../../card/card';
import { Label, LabelAndInputContainer, Input, BoundedNumberInput } from '../../input/labels-and-input';
import { Hint } from '../../styled/hint';

export const IncomeAndExpenses: React.FC = () => {
    const [grossIncome, setGrossIncome] = useGrossIncome();
    const [expenses, setExpenses] = useExpenses();
    const [personalUse, setPersonalUse] = usePersonalUse();
    const [stateTax, setStateTax] = useStateTax();
    const netIncome = MathUtil.toFixed(grossIncome - expenses, 2);
    const taxAmount = MathUtil.toFixed(Math.max(getRawYearlyTaxAmount(grossIncome * 12, stateTax) - standardDeduction2020, 0), 2);
    const afterTax = MathUtil.toFixed(netIncome - (taxAmount / 12), 2);
    const afterTaxAndPersonal = MathUtil.toFixed(afterTax * (1 - (personalUse / 100)), 2);

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
                        Expenses ($)<br/>
                        <Hint>
                            This should include medical expenses.
                        </Hint>
                    </Label>
                    <BoundedNumberInput value={expenses} onChange={setExpenses} min={0}/>
                </LabelAndInputContainer>
                <LabelAndInputContainer>
                    <Label>
                        Your State's Income Tax (%)
                    </Label>
                    <BoundedNumberInput value={stateTax} onChange={setStateTax} min={0} max={100}/>
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
                        <Hint>Based on the 2020 income tax bracket and standard deduction.</Hint>
                    </Label>
                    <Input type="number" disabled={true} value={afterTax}/>
                </LabelAndInputContainer>
                <LabelAndInputContainer>
                    <Label>
                        What percent would you like to set aside for personal use? (0-100%)
                    </Label>
                    <BoundedNumberInput value={personalUse} onChange={setPersonalUse} min={0} max={100}/>
                </LabelAndInputContainer>
                <LabelAndInputContainer>
                    <Label>
                        Net Income After Tax and Personal Use ($)
                    </Label>
                    <Input type="number" disabled={true} value={afterTaxAndPersonal}/>
                </LabelAndInputContainer>
            </CardBody>
        </Card>
    );
};