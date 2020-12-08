import React, { useState } from 'react';
import styled from 'styled-components';
import { getRawYearlyTaxAmount } from '../../api/income/income';
import {
    hsaContributionLimit, investmentSplit,
    recommendedMonthsForSavings, recommendedPercentInStock,
    retirementRothContributionLimit,
    retirementRothIncomeLimit,
    standardDeduction2020
} from '../../constants/finance';
import {
    useAge,
    useDefinedContributionExpectedReturn,
    useDefinedContributionMatchLimit,
    useDefinedContributionMatchPercent, useEmployerHSAContributions,
    useExpenses,
    useGrossIncome,
    useHasStockPurchasePlan, useInvestmentPreference,
    useIsHSASupported, useMedicalExpenses,
    useNetIncome,
    usePersonalUse, useRetirement401kType,
    useRetirementBenefitType,
    useSavingsAlready,
    useSavingsDesired,
    useStateTax,
    useStockPurchaseDiscount,
    useStockPurchaseLimit
} from '../../hooks/query-params';
import { InvestmentType, Retirement401kType, RetirementAccountType } from '../../models/finance';
import { MathUtil } from '../../util/math';
import { StringUtil } from '../../util/string';
import { AccentCard, Card, CardBody, CardTitle, CenteredCardTitle, ErrorCard } from '../card/card';
import { Link } from '../styled/link';

const InsightList = styled.ul`
  list-style-type: circle;
  padding-left: 1.25rem;
`;

const InsightListItem = styled.li`
  padding: 0.25rem 0.1rem 0.25rem 0.1rem;
`;

const BreakdownTable = styled.table`
  td {
    padding: 0.5rem;
  }
`;

const NegativeCashFlowRecommendation = () => (
    <ErrorCard>
        <CardTitle>
            Not Enough Cash Flow
        </CardTitle>
        <CardBody>
            <p>
                Your cash flow is too low to make any recommendations. You need to have a positive<br/>
                cash flow in order to put any money into your monthly benefits.
            </p>
            <p>
                Please look into&nbsp;
                <Link href="https://www.nerdwallet.com/blog/finance/how-to-build-a-budget/">
                    budgeting resources
                </Link>.
            </p>
        </CardBody>
    </ErrorCard>
);

const PositiveCashFlowRecommendations = () => {
    const [monthlyGrossIncome] = useGrossIncome();
    const [monthlyExpenses] = useExpenses();
    const [stateTaxPercent] = useStateTax();
    const [age] = useAge();
    const [investmentPreference] = useInvestmentPreference();

    const yearlyGrossIncome = monthlyGrossIncome * 12;

    const [personalUsePercent] = usePersonalUse();

    const [retirementAccountType] = useRetirementBenefitType();
    const [retirement401kType] = useRetirement401kType();
    const [definedContributionMatchPercent] = useDefinedContributionMatchPercent();
    const [definedContributionMatchLimit] = useDefinedContributionMatchLimit();
    const [definedContributionReturn] = useDefinedContributionExpectedReturn();

    const [hasStockPurchasePlan] = useHasStockPurchasePlan();
    const [stockPurchasePlanDiscount] = useStockPurchaseDiscount();
    const [stockPurchasePlanLimit] = useStockPurchaseLimit();

    const [isHSASupported] = useIsHSASupported();
    const [hsaMonthlyMedicalExpenses] = useMedicalExpenses();
    const [hsaYearlyEmployerContributions] = useEmployerHSAContributions();

    const monthlyNetIncome = MathUtil.toFixed(monthlyGrossIncome - monthlyExpenses, 2);
    const yearlyNetIncome = monthlyNetIncome * 12;

    const yearlyTaxAmount = MathUtil.toFixed(Math.max(0, getRawYearlyTaxAmount(yearlyGrossIncome, stateTaxPercent) - standardDeduction2020), 2);
    const monthlyAfterTaxIncome = monthlyNetIncome - (yearlyTaxAmount / 12);
    const moneyUsedForPersonal = monthlyAfterTaxIncome * (personalUsePercent / 100);
    const savingsRecommended = MathUtil.toFixed((monthlyExpenses + moneyUsedForPersonal) * recommendedMonthsForSavings, 2);

    const [liquidSavingsDesired] = useSavingsDesired(savingsRecommended);
    const [liquidSavingsAlready] = useSavingsAlready();

    const liquidSavingsRemaining = Math.max(liquidSavingsDesired - liquidSavingsAlready, 0);

    const realDefinedContributionReturn = MathUtil.toFixed(retirementAccountType === RetirementAccountType.employeeContributed ? (
        (1 + (definedContributionMatchPercent / 100)) * (1 + (definedContributionReturn / 100)) - 1
    ) : 0, 4);

    const realDollarsUntilRetirementMatchLimitHit = definedContributionMatchLimit / (definedContributionMatchPercent / 100);

    const realStockPurchasePlanReturn = MathUtil.toFixed(hasStockPurchasePlan ? (stockPurchasePlanDiscount / 100) : 0, 4);

    const canContributeToRothIRA = yearlyGrossIncome < retirementRothIncomeLimit;

    const monthlyDollarsRequiredUntilRetirementMatchLimitHit = realDollarsUntilRetirementMatchLimitHit / 12;

    const paycheckPercentage = (price: number) => `(${MathUtil.toFixed((price / monthlyGrossIncome) * 100, 2)}% of your gross income)`;

    interface Transaction {
        name: string,
        cost: number,
        isTaxed: boolean
    }

    const transactions: Array<Transaction> = [];

    const monthlyTaxableIncome = () => monthlyGrossIncome - transactions.filter(transaction => !transaction.isTaxed)
        .map(transaction => transaction.cost)
        .reduce((a, b) => a + b, 0);

    const remainingMoney = (currentTransactions: Array<Transaction> = transactions) => (Math.max(0,
        (monthlyGrossIncome
         - ((getRawYearlyTaxAmount(monthlyTaxableIncome() * 12, stateTaxPercent) - standardDeduction2020) / 12)
         - monthlyExpenses
         - currentTransactions.filter(transaction => transaction.isTaxed)
             .map(transaction => transaction.cost)
             .reduce((a, b) => a + b, 0)) * (1 - (personalUsePercent / 100))
    ));

    if (retirementAccountType === RetirementAccountType.employeeContributed) {
        transactions.push({
            name:    '401k Plan',
            isTaxed: retirement401kType === Retirement401kType.roth,
            cost:    monthlyDollarsRequiredUntilRetirementMatchLimitHit
        });
    }

    const currentHSAContributionLimit = hsaContributionLimit(age);
    const currentHSAContributionLimitAfterEmployer = currentHSAContributionLimit - hsaYearlyEmployerContributions;

    let medicalExpensesLeft = hsaMonthlyMedicalExpenses;
    if (isHSASupported && currentHSAContributionLimitAfterEmployer > 0 && hsaMonthlyMedicalExpenses * 12 > hsaYearlyEmployerContributions) {
        const amountToContribute = Math.min(currentHSAContributionLimitAfterEmployer / 12, hsaMonthlyMedicalExpenses);
        transactions.push({
            name:    'Health Savings Account (Medical Expenses)',
            isTaxed: false,
            cost:    amountToContribute
        });
        medicalExpensesLeft -= amountToContribute;
    }

    if (medicalExpensesLeft > 0) {
        transactions.push({
            name:    'Flexible Spending Account (Medical Expenses)',
            isTaxed: false,
            cost:    medicalExpensesLeft,
        });
    }

    const percentOfSavingsAchieved = liquidSavingsDesired === 0 ? 1 : liquidSavingsAlready / liquidSavingsDesired;
    const savingsDivisorRatio = Math.min(Math.exp(percentOfSavingsAchieved - 0.95), 1);
    const splitForUserPreference = investmentSplit[investmentPreference];
    const savingsAsPercentOfRemaining = splitForUserPreference[InvestmentType.cash] / savingsDivisorRatio;
    const savingsPerMonth = Math.min(liquidSavingsRemaining / 12, remainingMoney() * savingsAsPercentOfRemaining);

    const differenceInSavingsPercentage = savingsAsPercentOfRemaining - splitForUserPreference[InvestmentType.cash];

    if (savingsPerMonth > 0) {
        transactions.push({
            name:    'Liquid Savings',
            isTaxed: true,
            cost:    savingsPerMonth
        });
    }

    if (canContributeToRothIRA) {
        transactions.push({
            name:    'Roth IRA',
            isTaxed: true,
            cost:    retirementRothContributionLimit(age) / 12
        });
    }

    if (hasStockPurchasePlan) {
        transactions.push({
            name:    'Stock purchase plan (you\'ll get this money back with the discount as soon as you can sell)',
            isTaxed: true,
            cost:    stockPurchasePlanLimit / 12
        });
    }

    const remainingMoneyAfterEverything = remainingMoney();
    // normally we'd let the final algorithm handle filtering out transactions that have no money left,
    // but we want stocks + bonds to go together always so we can't just leave one hanging
    if (remainingMoneyAfterEverything > 0) {
        const savingsNormalizedSplit = {
            [InvestmentType.bonds]:    splitForUserPreference[InvestmentType.bonds] - (differenceInSavingsPercentage / 2),
            [InvestmentType.equities]: splitForUserPreference[InvestmentType.equities] - (differenceInSavingsPercentage / 2),
        };

        const totalPercentage = Object.values(savingsNormalizedSplit).reduce((a, b) => a + b);

        const finalNormalizedSplit = {
            [InvestmentType.bonds]:    savingsNormalizedSplit[InvestmentType.bonds] / totalPercentage,
            [InvestmentType.equities]: savingsNormalizedSplit[InvestmentType.equities] / totalPercentage
        };

        transactions.push({
            name:    `Bonds (based on a normalized split of (${MathUtil.toFixed(finalNormalizedSplit[InvestmentType.bonds] * 100, 2)}%)`,
            isTaxed: true,
            cost:    finalNormalizedSplit[InvestmentType.bonds] * remainingMoneyAfterEverything
        });
        transactions.push({
            name:    `Stocks/Equities (based on a normalized split of (${MathUtil.toFixed(finalNormalizedSplit[InvestmentType.equities] * 100, 2)}%)`,
            isTaxed: true,
            cost:    finalNormalizedSplit[InvestmentType.equities] * remainingMoneyAfterEverything
        });
    }

    const getFeasibleTransactions = () => {
        const currentTransactions: Transaction[] = [];
        let remainingMoneyBeforeTransaction = remainingMoney(currentTransactions);
        for (const transaction of transactions) {
            const remainingMoneyAfterTransaction = remainingMoney([...currentTransactions, transaction]);
            if (remainingMoneyAfterTransaction <= 0) {
                currentTransactions.push({
                    ...transaction,
                    cost: remainingMoneyBeforeTransaction
                });
                // we've exhausted all our money :(
                break;
            }
            remainingMoneyBeforeTransaction = remainingMoneyAfterTransaction;
            currentTransactions.push(transaction);
        }
        return currentTransactions;
    };

    const feasibleTransactions = getFeasibleTransactions();

    const recommendations = feasibleTransactions.map(transaction => (
        <tr key={transaction.name}>
            <td>{transaction.name}</td>
            <td>{transaction.isTaxed ? 'Taxed' : 'Not Taxed'}</td>
            <td>{StringUtil.money(transaction.cost)} {paycheckPercentage(transaction.cost)}</td>
        </tr>
    ));

    return (
        <>
            <Card>
                <CardTitle>Information</CardTitle>
                <CardBody>
                    <p>
                        Here's what we know...
                    </p>
                    <InsightList>
                        <InsightListItem>
                            For every $1.00 you contribute to your 401k (up to&nbsp;
                            {StringUtil.money(realDollarsUntilRetirementMatchLimitHit)}), you return an additional&nbsp;
                            {StringUtil.money(realDefinedContributionReturn)} ({StringUtil.money(definedContributionMatchPercent / 100)} of
                            that immediately)
                        </InsightListItem>
                        <InsightListItem>
                            For every $1.00 you contribute to your stock purchase plan, you immediately return an
                            additional {StringUtil.money(realStockPurchasePlanReturn)} (which can be reinvested).<br/>
                            If you purchased the maximum amount of discounted stock and sold it, you would immediately
                            earn {StringUtil.money(stockPurchasePlanLimit * realStockPurchasePlanReturn)}
                        </InsightListItem>
                        <InsightListItem>
                            {
                                canContributeToRothIRA
                                ? 'You can contribute to a Roth IRA.'
                                : 'Your income is too high to contribute to a Roth IRA.'
                            }
                        </InsightListItem>
                        <InsightListItem>
                            You have {StringUtil.money(liquidSavingsRemaining)} until you reach your liquid savings
                            goal.
                        </InsightListItem>
                        <InsightListItem>
                            Based on your age ({age}):
                            <InsightList>
                                {
                                    isHSASupported && (
                                        <InsightListItem>
                                            You can contribute a total
                                            of {StringUtil.money(currentHSAContributionLimit)} to
                                            an HSA in
                                            2020 {hsaYearlyEmployerContributions > 0 ? `(${StringUtil.money(currentHSAContributionLimitAfterEmployer)} after your employer's contributions)` : ''}
                                        </InsightListItem>
                                    )
                                }
                                {
                                    canContributeToRothIRA && (
                                        <InsightListItem>
                                            You can
                                            contribute {StringUtil.money(retirementRothContributionLimit(age))} to a
                                            Roth IRA in 2020
                                        </InsightListItem>
                                    )
                                }
                                <InsightListItem>
                                    You are recommended to have approximately {recommendedPercentInStock(age)}% of your
                                    holdings in stock
                                </InsightListItem>
                            </InsightList>
                        </InsightListItem>
                        <InsightListItem>
                            Based on your risk preference ({investmentPreference}):
                            <InsightList>
                                <InsightListItem>
                                    You are recommended to save {MathUtil.toFixed(splitForUserPreference[InvestmentType.cash] * 100, 2)}% of your extra income as cash.
                                </InsightListItem>
                                <InsightListItem>
                                    You are recommended to invest {MathUtil.toFixed(splitForUserPreference[InvestmentType.bonds] * 100, 2)}% of your extra income in bonds.
                                </InsightListItem>
                                <InsightListItem>
                                    You are recommended to invest {MathUtil.toFixed(splitForUserPreference[InvestmentType.equities] * 100, 2)}% of your extra income in stocks/equities.
                                </InsightListItem>
                            </InsightList>
                        </InsightListItem>
                    </InsightList>
                </CardBody>
            </Card>
            <Card>
                <CardTitle>
                    Recommended Paycheck Breakdown
                </CardTitle>
                <CardBody>
                    <BreakdownTable>
                        <tr>
                            <th>Name</th>
                            <th>Tax Status</th>
                            <th>Recommended Amount</th>
                        </tr>
                        {recommendations}
                    </BreakdownTable>
                    {
                        feasibleTransactions.some(transaction => transaction.name.includes('Bonds') || transaction.name.includes('Stocks'))
                        && (
                            <p>
                                Bonds and stocks are used to fill all remaining income. It is entirely up to you<br/>
                                whether to re-distribute that income into liquid savings or other wealth vehicles.
                            </p>
                        )
                    }
                </CardBody>
            </Card>
        </>
    );
};

export const Recommendations = () => {
    const netIncome = useNetIncome();

    return (
        <div>
            <AccentCard>
                <CenteredCardTitle>
                    Recommendations
                </CenteredCardTitle>
            </AccentCard>
            {
                netIncome <= 0 ? (
                    <NegativeCashFlowRecommendation/>
                ) : (
                    <PositiveCashFlowRecommendations/>
                )
            }
        </div>
    );
};