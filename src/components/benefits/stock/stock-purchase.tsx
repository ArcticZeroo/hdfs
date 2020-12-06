import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { useHasStockPurchasePlan, useStockPurchaseDiscount, useStockPurchaseLimit } from '../../../hooks/query-params';
import { StringUtil } from '../../../util/string';
import { Card } from '../../card/card';
import { BoundedNumberInput, Input, Label, LabelAndInputContainer } from '../../input/labels-and-input';

const RadioButtonInput = styled.input`
`;

const RadioButtonLabel = styled.label`
  padding-left: 0.25rem;
  padding-right: 1rem;
`;

export const StockPurchase = () => {
    const [hasStockPurchasePlan, setHasStockPurchasePlan] = useHasStockPurchasePlan();
    const [discountPercent, setDiscountPercent] = useStockPurchaseDiscount();
    const [yearlyPurchaseLimit, setYearlyPurchaseLimit] = useStockPurchaseLimit();

    const onHasStockPurchasePlanChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setHasStockPurchasePlan(event.target.value === 'yes');
    };

    const nameBase = 'has-purchase-plan';
    const YesNoButton = ({ isYes }: { isYes: boolean }) => {
        const name = isYes ? 'Yes' : 'No';
        const id = `${nameBase}-${name.toLowerCase()}`;
        return (
            <>
                <RadioButtonInput type="radio" name={nameBase} id={id} value={name.toLowerCase()}
                                  onChange={onHasStockPurchasePlanChanged}
                                  checked={isYes === hasStockPurchasePlan}/><RadioButtonLabel
                htmlFor={id}>{StringUtil.capitalize(name)}</RadioButtonLabel>
            </>
        );
    };

    return (
        <Card title="Stock Purchase Plan">
            <LabelAndInputContainer>
                <Label>Does your employer offer an Employee Stock Purchase Plan?</Label>
                <div>
                    <YesNoButton isYes={true}/>
                    <YesNoButton isYes={false}/>
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