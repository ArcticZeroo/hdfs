import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Card from '../../card/card';
import { BoundedNumberInput, Input, Label, LabelAndInputContainer } from '../../input/labels-and-input';

const RadioButtonInput = styled.input`
`;

const RadioButtonLabel = styled.label`
  padding-left: 0.25rem;
  padding-right: 1rem;
`;

export const StockPurchase = () => {
    const [hasStockPurchasePlan, setHasStockPurchasePlan] = useState(false);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [yearlyPurchaseLimit, setYearlyPurchaseLimit] = useState(0);

    const onHasStockPurchasePlanChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setHasStockPurchasePlan(event.target.value === 'yes');
    };

    return (
        <Card title="Stock Purchase Plan">
            <LabelAndInputContainer>
                <Label>Does your employer offer an Employee Stock Purchase Plan?</Label>
                <div>
                    <RadioButtonInput type="radio" name="has-purchase-plan" id="has-purchase-plan-yes" value="yes"
                                      onChange={onHasStockPurchasePlanChanged}
                                      checked={hasStockPurchasePlan}/><RadioButtonLabel
                    htmlFor="has-purchase-plan-yes">Yes</RadioButtonLabel>
                    <RadioButtonInput type="radio" name="has-purchase-plan" id="has-purchase-plan-no" value="no"
                                      onChange={onHasStockPurchasePlanChanged}
                                      checked={!hasStockPurchasePlan}/><RadioButtonLabel
                    htmlFor="has-purchase-plan-no">No</RadioButtonLabel>
                </div>
            </LabelAndInputContainer>
            {
                hasStockPurchasePlan && (
                    <>
                        <LabelAndInputContainer>
                            <Label>Purchase Discount (0-100%)</Label>
                            <BoundedNumberInput min={0} max={100} value={discountPercent}
                                                onChange={setDiscountPercent}/>
                        </LabelAndInputContainer>
                        <LabelAndInputContainer>
                            <Label>Yearly purchase limit ($)</Label>
                            <BoundedNumberInput min={0} value={yearlyPurchaseLimit} onChange={setYearlyPurchaseLimit}/>
                        </LabelAndInputContainer>
                    </>
                )
            }
        </Card>
    );
};