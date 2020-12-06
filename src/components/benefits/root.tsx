import React from 'react';
import styled from 'styled-components';
import { AccentCard } from '../card/card';
import { FSAContributions } from './fsa/fsa-contributions';
import { IncomeAndExpenses } from './income/income-and-expenses';
import { RetirementBenefit } from './retirement/retirement-benefit';
import { StockPurchase } from './stock/stock-purchase';

const Title = styled.div`
  text-align: center;
  font-size: 1.5rem;
`;

export const ExpensesAndBenefits = () => (
    <div>
        <AccentCard>
            <Title>
                Expenses and Benefits
            </Title>
        </AccentCard>
        <IncomeAndExpenses/>
        <RetirementBenefit/>
        <StockPurchase/>
        <FSAContributions/>
    </div>
);