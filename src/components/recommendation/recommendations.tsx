import React from 'react';
import styled from 'styled-components';
import { getRawTaxAmount } from '../../api/income/income';
import {
    hsaContributionLimit,
    recommendedMonthsForSavings, recommendedPercentInStock,
    retirementRothContributionLimit,
    retirementRothIncomeLimit,
    standardDeduction2020
} from '../../constants/finance';
import {
    useAge,
    useDefinedContributionExpectedReturn,
    useDefinedContributionMatchLimit,
    useDefinedContributionMatchPercent,
    useExpenses,
    useGrossIncome, useHasStockPurchasePlan, useIsHSASupported,
    useNetIncome, usePersonalUse,
    useRetirementBenefitType, useSavingsAlready, useSavingsDesired, useStockPurchaseDiscount, useStockPurchaseLimit
} from '../../hooks/query-params';
import { RetirementAccountType } from '../../models/finance';
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
    const [age] = useAge();

    const yearlyGrossIncome = monthlyGrossIncome * 12;

    const [personalUsePercent] = usePersonalUse();

    const [retirementAccountType] = useRetirementBenefitType();
    const [definedContributionMatchPercent] = useDefinedContributionMatchPercent();
    const [definedContributionMatchLimit] = useDefinedContributionMatchLimit();
    const [definedContributionReturn] = useDefinedContributionExpectedReturn();

    const [hasStockPurchasePlan] = useHasStockPurchasePlan();
    const [stockPurchasePlanDiscount] = useStockPurchaseDiscount();
    const [stockPurchasePlanLimit] = useStockPurchaseLimit();

    const [isHSASupported] = useIsHSASupported();

    const monthlyNetIncome = monthlyGrossIncome - monthlyExpenses;
    const yearlyTaxAmount = getRawTaxAmount(monthlyGrossIncome * 12) - standardDeduction2020;
    const afterTaxMoney = monthlyNetIncome - (yearlyTaxAmount / 12);
    const moneyUsedForPersonal = afterTaxMoney * (personalUsePercent / 100);
    const savingsRecommended = MathUtil.toFixed((monthlyExpenses + moneyUsedForPersonal) * recommendedMonthsForSavings, 2);

    const [liquidSavingsDesired] = useSavingsDesired(savingsRecommended);
    const [liquidSavingsAlready] = useSavingsAlready();

    console.log('liquid savings:', liquidSavingsDesired, liquidSavingsAlready);

    const liquidSavingsRemaining = Math.max(liquidSavingsDesired - liquidSavingsAlready, 0);

    const realDefinedContributionReturn = MathUtil.toFixed(retirementAccountType === RetirementAccountType.employeeContributed ? (
        (1 + (definedContributionMatchPercent / 100)) * (1 + (definedContributionReturn / 100)) - 1
    ) : 0, 4);

    const realDollarsUntilRetirementMatchLimitHit = definedContributionMatchLimit / (definedContributionMatchPercent / 100);

    const realStockPurchasePlanReturn = MathUtil.toFixed(hasStockPurchasePlan ? (stockPurchasePlanDiscount / 100) : 0, 4);

    const canContributeToRothIRA = yearlyGrossIncome < retirementRothIncomeLimit;

    return (
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
                        {StringUtil.money(realDefinedContributionReturn)} ({StringUtil.money(definedContributionMatchPercent / 100)} of that immediately)
                    </InsightListItem>
                    <InsightListItem>
                        For every $1.00 you contribute to your stock purchase plan, you immediately return an
                        additional {StringUtil.money(realStockPurchasePlanReturn)} (which can be reinvested)
                    </InsightListItem>
                    <InsightListItem>
                        {canContributeToRothIRA ? 'You can contribute to a Roth IRA.' : 'Your income is too high to contribute to a Roth IRA.'}
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
                                        You can contribute {StringUtil.money(hsaContributionLimit(age))} to an HSA in 2020
                                    </InsightListItem>
                                )
                            }
                            {
                                canContributeToRothIRA && (
                                    <InsightListItem>
                                        You can contribute {StringUtil.money(retirementRothContributionLimit(age))} to a Roth IRA in 2020
                                    </InsightListItem>
                                )
                            }
                            <InsightListItem>
                                You are recommended to have approximately {recommendedPercentInStock(age)}% of your holdings in stock
                            </InsightListItem>
                        </InsightList>
                    </InsightListItem>
                </InsightList>
            </CardBody>
        </Card>
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