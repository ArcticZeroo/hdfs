import React from 'react';
import { useHasStockPurchasePlan, useStockPurchaseDiscount, useStockPurchaseLimit } from '../../../hooks/query-params';
import { Card, CardBody, CardTitle } from '../../card/card';
import { BooleanInput, BoundedNumberInput, Label, LabelAndInputContainer } from '../../input/labels-and-input';

export const StockPurchase = () => {
    const [hasStockPurchasePlan, setHasStockPurchasePlan] = useHasStockPurchasePlan();
    const [discountPercent, setDiscountPercent] = useStockPurchaseDiscount();
    const [yearlyPurchaseLimit, setYearlyPurchaseLimit] = useStockPurchaseLimit();

    return (
        <Card>
            <CardTitle>
                Stock Purchase Plan
            </CardTitle>
            <CardBody>
                <LabelAndInputContainer>
                    <Label>Does your employer offer an Employee Stock Purchase Plan?</Label>
                    <BooleanInput nameBase={'has-purchase-plan'} value={hasStockPurchasePlan} onChange={setHasStockPurchasePlan}/>
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
                                <BoundedNumberInput min={0} value={yearlyPurchaseLimit}
                                                    onChange={setYearlyPurchaseLimit}/>
                            </LabelAndInputContainer>
                        </>
                    )
                }
            </CardBody>
        </Card>
    );
};