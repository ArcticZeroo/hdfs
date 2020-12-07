import React from "react";
import { useMedicalExpenses } from '../../../hooks/query-params';
import { Card, CardBody, CardTitle } from '../../card/card';
import { BoundedNumberInput, Label, LabelAndInputContainer } from '../../input/labels-and-input';
import { Hint } from "../../styled/hint";

export const FSAContributions = () => {
    const [medicalExpenses, setMedicalExpenses] = useMedicalExpenses();

    return (
      <Card>
          <CardTitle>
              FSA Contributions
          </CardTitle>
          <CardBody>
              <LabelAndInputContainer>
                  <Label>
                      How much of your monthly expenses are medical? ($)<br/>
                      <Hint>These should have been included in your expenses above.</Hint>
                  </Label>
                  <BoundedNumberInput value={medicalExpenses} onChange={setMedicalExpenses} min={0}/>
              </LabelAndInputContainer>
          </CardBody>
      </Card>
    );
};