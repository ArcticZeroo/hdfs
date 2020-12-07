import React from 'react';
import { AccentCard, CenteredCardTitle } from '../card/card';
import { LiquidSavings } from './savings/liquid-savings';

export const SavingsAndInvestments = () => (
    <div>
        <AccentCard>
            <CenteredCardTitle>Savings</CenteredCardTitle>
        </AccentCard>
        <LiquidSavings/>
    </div>
)