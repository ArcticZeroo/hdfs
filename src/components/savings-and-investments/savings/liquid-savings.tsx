import React from 'react';
import { getRawTaxAmount } from '../../../api/income/income';
import { recommendedMonthsForSavings, standardDeduction2020 } from '../../../constants/finance';
import {
    useExpenses,
    useGrossIncome,
    usePersonalUse,
    useSavingsAlready,
    useSavingsDesired
} from '../../../hooks/query-params';
import { MathUtil } from '../../../util/math';
import { Card, CardBody, CardTitle } from '../../card/card';
import { BoundedNumberInput, Input, Label, LabelAndInputContainer } from '../../input/labels-and-input';
import { Hint } from '../../styled/hint';

export const LiquidSavings = () => {
    const [grossIncome] = useGrossIncome();
    const [expenses] = useExpenses();
    const [personalUsePercent] = usePersonalUse();

    const netIncome = grossIncome - expenses;
    const yearlyTaxAmount = getRawTaxAmount(grossIncome * 12) - standardDeduction2020;
    const afterTaxMoney = netIncome - (yearlyTaxAmount / 12);
    const moneyUsedForPersonal = afterTaxMoney * (personalUsePercent / 100);
    const savingsRecommended = MathUtil.toFixed((expenses + moneyUsedForPersonal) * recommendedMonthsForSavings, 2);

    const [savingsDesired, setSavingsDesired] = useSavingsDesired(savingsRecommended);
    const [savingsAlready, setSavingsAlready] = useSavingsAlready();

    return (
        <Card>
            <CardTitle>Liquid Savings</CardTitle>
            <CardBody>
                <LabelAndInputContainer>
                    <Label>
                        Your recommended liquid savings ($)<br/>
                        <Hint>
                            Based on recommended {recommendedMonthsForSavings} months of savings, using your
                            monthly<br/>
                            expenses + personal use funds
                        </Hint>
                    </Label>
                    <Input disabled={true} type="number" value={savingsRecommended}/>
                </LabelAndInputContainer>
                <LabelAndInputContainer>
                    <Label>How much would you like to have in savings? ($)</Label>
                    <BoundedNumberInput value={savingsDesired} onChange={setSavingsDesired} min={0}/>
                </LabelAndInputContainer>
                <LabelAndInputContainer>
                    <Label>How much do you already have in savings? ($)</Label>
                    <BoundedNumberInput value={savingsAlready} onChange={setSavingsAlready} min={0}/>
                </LabelAndInputContainer>
            </CardBody>
        </Card>
    );
};