import React from 'react';
import { useAge } from '../../hooks/query-params';
import { Card, CardBody, CardTitle } from '../card/card';
import { BoundedNumberInput, Label, LabelAndInputContainer } from '../input/labels-and-input';

export const Demographics: React.FC = () => {
    const [age, setAge] = useAge();

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
            </CardBody>
        </Card>
    );
}