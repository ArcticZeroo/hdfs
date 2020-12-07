import React from 'react';
import { useAge, useInvestmentPreference } from '../../hooks/query-params';
import { InvestmentPreference } from '../../models/finance';
import { Card, CardBody, CardTitle } from '../card/card';
import { BoundedNumberInput, EnumInput, Label, LabelAndInputContainer } from '../input/labels-and-input';

export const Demographics: React.FC = () => {
    const [age, setAge] = useAge();
    const [investmentPreference, setInvestmentPreference] = useInvestmentPreference();

    return (
        <Card>
            <CardTitle>
                Demographics
            </CardTitle>
            <CardBody>
                <LabelAndInputContainer>
                    <Label>Your Age (Years)</Label>
                    <BoundedNumberInput value={age} onChange={setAge} min={0}/>
                </LabelAndInputContainer>
                <LabelAndInputContainer>
                    <Label>Your Investment Preference</Label>
                    <EnumInput options={InvestmentPreference} names={{
                        [InvestmentPreference.moderate]:     'Moderate',
                        [InvestmentPreference.conservative]: 'Conservative',
                        [InvestmentPreference.aggressive]:   'Aggressive',
                    }} value={investmentPreference} defaultValue={InvestmentPreference.moderate}
                               onChange={setInvestmentPreference}/>
                </LabelAndInputContainer>
            </CardBody>
        </Card>
    );
};