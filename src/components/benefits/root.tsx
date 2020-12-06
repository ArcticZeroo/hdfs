import React from 'react';
import { AccentCard, CenteredCardTitle } from '../card/card';
import { FSAContributions } from './fsa/fsa-contributions';
import { IncomeAndExpenses } from './income/income-and-expenses';
import { RetirementBenefit } from './retirement/retirement-benefit';
import { StockPurchase } from './stock/stock-purchase';

export const ExpensesAndBenefits = () => (
    <div>
        <AccentCard>
            <CenteredCardTitle>
                Expenses and Benefits
            </CenteredCardTitle>
        </AccentCard>
        <IncomeAndExpenses/>
        <RetirementBenefit/>
        <StockPurchase/>
        <FSAContributions/>
    </div>
);