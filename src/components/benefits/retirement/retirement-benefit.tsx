import React, { ChangeEvent, useState } from 'react';
import {
    useDefinedContributionExpectedReturn,
    useDefinedContributionMatchLimit,
    useDefinedContributionMatchPercent,
    useRetirementBenefitType
} from '../../../hooks/query-params';
import { RetirementAccountType } from '../../../models/retirement';
import { Card } from '../../card/card';
import { BoundedNumberInput, Input, Label, LabelAndInputContainer } from '../../input/labels-and-input';

type RetirementAccountMember = keyof typeof RetirementAccountType;

export const RetirementBenefit = () => {
    const [benefitType, setBenefitType] = useRetirementBenefitType();
    const [matchPercent, setMatchPercent] = useDefinedContributionMatchPercent();
    const [matchLimit, setMatchLimit] = useDefinedContributionMatchLimit();
    const [returnPercent, setReturnPercent] = useDefinedContributionExpectedReturn();

    const onTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const typeValue = event.target.value;
        if (typeValue in RetirementAccountType) {
            setBenefitType(RetirementAccountType[typeValue as RetirementAccountMember]);
        } else {
            setBenefitType(RetirementAccountType.noneOrOther);
        }
    };

    return (
        <Card title="Retirement Benefit">
            <LabelAndInputContainer>
                <Label>Retirement Benefit Type</Label>
                <select value={benefitType} onChange={onTypeChange}>
                    <option value={RetirementAccountType.noneOrOther}>None/Other</option>
                    <option value={RetirementAccountType.employeeContributed}>Defined Contribution</option>
                </select>
            </LabelAndInputContainer>
            {
                benefitType === RetirementAccountType.employeeContributed && (
                    <>
                        <LabelAndInputContainer>
                            <Label>Match Amount (0-100%)</Label>
                            <BoundedNumberInput placeholder={'Amount (percent)'} value={matchPercent}
                                                onChange={setMatchPercent} min={0} max={100}/>
                        </LabelAndInputContainer>
                        <LabelAndInputContainer>
                            <Label>Match Limit ($, Yearly)</Label>
                            <BoundedNumberInput placeholder={'Amount (dollars)'} value={matchLimit}
                                                onChange={setMatchLimit} min={0}/>
                        </LabelAndInputContainer>
                        <LabelAndInputContainer>
                            <Label>Expected return (0-100%)</Label>
                            <BoundedNumberInput placeholder={'Amount (percent)'} value={returnPercent}
                                                onChange={setReturnPercent} min={0} max={100}/>
                        </LabelAndInputContainer>
                    </>
                )
            }
        </Card>
    );
};