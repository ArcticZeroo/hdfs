import React, { ChangeEvent } from 'react';
import {
    useDefinedContributionExpectedReturn,
    useDefinedContributionMatchLimit,
    useDefinedContributionMatchPercent, useRetirement401kType,
    useRetirementBenefitType
} from '../../../hooks/query-params';
import { Retirement401kType, RetirementAccountType } from '../../../models/finance';
import { Card, CardBody, CardTitle } from '../../card/card';
import { BoundedNumberInput, EnumInput, Input, Label, LabelAndInputContainer } from '../../input/labels-and-input';

type RetirementAccountMember = keyof typeof RetirementAccountType;
type Retirement401kTypeMember = keyof typeof Retirement401kType;

export const RetirementBenefit = () => {
    const [benefitType, setBenefitType] = useRetirementBenefitType();
    const [retirement401kType, setRetirement401kType] = useRetirement401kType();
    const [matchPercent, setMatchPercent] = useDefinedContributionMatchPercent();
    const [matchLimit, setMatchLimit] = useDefinedContributionMatchLimit();
    const [returnPercent, setReturnPercent] = useDefinedContributionExpectedReturn();

    const onBenefitTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const typeValue = event.target.value;
        if (typeValue in RetirementAccountType) {
            setBenefitType(RetirementAccountType[typeValue as RetirementAccountMember]);
        } else {
            setBenefitType(RetirementAccountType.noneOrOther);
        }
    };

    const on401kTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const typeValue = event.target.value;
        if (typeValue in Retirement401kType) {
            setRetirement401kType(Retirement401kType[typeValue as Retirement401kTypeMember]);
        } else {
            setRetirement401kType(Retirement401kType.standard);
        }
    };

    return (
        <Card>
            <CardTitle>
                Retirement Benefit
            </CardTitle>
            <CardBody>
                <LabelAndInputContainer>
                    <Label>Retirement Benefit Type</Label>
                    <EnumInput options={RetirementAccountType} names={{
                        [RetirementAccountType.noneOrOther]:         'None/Other',
                        [RetirementAccountType.employeeContributed]: 'Defined Contribution'
                    }} value={benefitType} defaultValue={RetirementAccountType.noneOrOther} onChange={setBenefitType}/>
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
                                <Label>Expected return (%)</Label>
                                <BoundedNumberInput placeholder={'Amount (percent)'} value={returnPercent}
                                                    onChange={setReturnPercent} min={0}/>
                            </LabelAndInputContainer>
                            <LabelAndInputContainer>
                                <Label>401k Type</Label>
                                <EnumInput options={Retirement401kType} names={{
                                    [Retirement401kType.standard]: 'Standard 401k',
                                    [Retirement401kType.roth]:     'Roth 401k'
                                }} value={retirement401kType} defaultValue={Retirement401kType.standard}
                                           onChange={setRetirement401kType}/>
                            </LabelAndInputContainer>
                        </>
                    )
                }
            </CardBody>
        </Card>
    );
};