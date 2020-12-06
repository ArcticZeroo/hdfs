import React from "react";
import { useMedicalExpenses } from '../../../hooks/query-params';
import { Card, CardBody, CardTitle } from '../../card/card';
import { BoundedNumberInput, Label, LabelAndInputContainer } from '../../input/labels-and-input';

export const FSAContributions = () => {
    const [medicalExpenses, setMedicalExpenses] = useMedicalExpenses();

    return (
      <Card>
          <CardTitle>
              FSA Contributions
          </CardTitle>
          <CardBody>
              <LabelAndInputContainer>
                  <Label>How much do you typically spend on medical expenses per month? ($)</Label>
                  <BoundedNumberInput value={medicalExpenses} onChange={setMedicalExpenses} min={0}/>
              </LabelAndInputContainer>
          </CardBody>
      </Card>
    );
};