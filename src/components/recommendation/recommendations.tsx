import React from 'react';
import { useNetIncome } from '../../hooks/query-params';
import { AccentCard, CardBody, CardTitle, CenteredCardTitle, ErrorCard } from '../card/card';
import { Link } from '../styled/link';

export const Recommendations = () => {
    const netIncome = useNetIncome();

    return (
        <div>
            <AccentCard>
                <CenteredCardTitle>
                    Recommendations
                </CenteredCardTitle>
            </AccentCard>
            {
                netIncome <= 0 ? (
                    <ErrorCard>
                        <CardTitle>
                            Not Enough Cash Flow
                        </CardTitle>
                        <CardBody>
                            <p>
                                Your cash flow is too low to make any recommendations. You need to have a positive<br/>
                                cash flow in order to put any money into your monthly benefits.
                            </p>
                            <p>
                                Please look into&nbsp;
                                <Link href="https://www.nerdwallet.com/blog/finance/how-to-build-a-budget/">
                                    budgeting resources
                                </Link>.
                            </p>
                        </CardBody>
                    </ErrorCard>
                ) : (
                    <div>
                        TODO
                    </div>
                )
            }
        </div>
    );
};