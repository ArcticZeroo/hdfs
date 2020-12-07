import React from "react";
import { useEmployerHSAContributions, useIsHSASupported, useMedicalExpenses } from '../../../hooks/query-params';
import { Card, CardBody, CardTitle } from '../../card/card';
import { BooleanInput, BoundedNumberInput, Label, LabelAndInputContainer } from '../../input/labels-and-input';
import { Hint } from "../../styled/hint";

export const HealthSavingsContributions = () => {
    const [medicalExpenses, setMedicalExpenses] = useMedicalExpenses();
    const [isHSASupported, setIsHSASupported] = useIsHSASupported();
    const [employerHSAContributions, setEmployerHSAContributions] = useEmployerHSAContributions();

    return (
      <Card>
          <CardTitle>
              Health Savings Contributions
          </CardTitle>
          <CardBody>
              <LabelAndInputContainer>
                  <Label>
                      How much of your monthly expenses are medical? ($)<br/>
                      <Hint>These should have been included in your expenses above.</Hint>
                  </Label>
                  <BoundedNumberInput value={medicalExpenses} onChange={setMedicalExpenses} min={0}/>
              </LabelAndInputContainer>
              <LabelAndInputContainer>
                  <Label>
                      Does your health insurance allow you to contribute to an HSA?
                  </Label>
                  <BooleanInput nameBase={'allows-hsa'} value={isHSASupported} onChange={setIsHSASupported}/>
              </LabelAndInputContainer>
              {
                  isHSASupported && (
                      <LabelAndInputContainer>
                          <Label>
                              How much, if any, does your employer contribute to your HSA each year? ($)
                          </Label>
                          <BoundedNumberInput value={employerHSAContributions} onChange={setEmployerHSAContributions} min={0}/>
                      </LabelAndInputContainer>
                  )
              }
          </CardBody>
      </Card>
    );
};