import * as React from 'react';
import styled from 'styled-components';
import { paletteVars } from '../../constants/css-variables';
import { guessForegroundColor } from '../../util/guess-color';

const CardContainer = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem;
`;

const CardTitle = styled.div`
  font-family: "Google Sans", "Product Sans", "Roboto", sans-serif;
  font-size: 1.25em;
  margin-bottom: 0.5rem;
`;

const CardBody = styled.div``;

export interface ICardProps {
    title?: React.ReactNode | string;
    backgroundColor?: string;
    textColor?: string;
}

const Card: React.FC<ICardProps> = ({ title, children, backgroundColor, textColor }) => {
    if (!textColor && backgroundColor) {
        textColor = guessForegroundColor(backgroundColor);
    }

    return (
        <CardContainer style={{ backgroundColor, color: textColor }}>
            {title && (
                <CardTitle>
                    {title}
                </CardTitle>
            )}
            {
                children && (
                    <CardBody>
                        {children}
                    </CardBody>
                )
            }
        </CardContainer>
    );
};

Card.defaultProps = {
    backgroundColor: `var(${paletteVars.primaryColor})`,
    textColor: `var(${paletteVars.primaryTextColor})`
};

export default Card;