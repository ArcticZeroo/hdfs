import React from 'react';
import { AccentCard, CenteredCardTitle } from '../card/card';
import { HealthSavingsContributions } from './health-savings/health-savings-contributions';
import { IncomeAndExpenses } from './income/income-and-expenses';
import { RetirementBenefit } from './retirement/retirement-benefit';
import { LiquidSavings } from '../savings-and-investments/savings/liquid-savings';
import { StockPurchase } from './stock/stock-purchase';

export const ExpensesAndBenefits = () => (
    <div>
        <AccentCard>
            <CenteredCardTitle>
                Expenses and Benefits
            </CenteredCardTitle>
        </AccentCard>
        <IncomeAndExpenses/>
        <HealthSavingsContributions/>
        <RetirementBenefit/>
        <StockPurchase/>
    </div>
);