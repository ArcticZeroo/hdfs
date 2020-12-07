import * as React from 'react';
import styled from 'styled-components';
import { paletteVars } from '../../constants/css-variables';
import { guessForegroundColor } from '../../util/guess-color';

export const CardContainer = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem;
`;

const cardTitleStyle = `
  font-family: "Google Sans", "Product Sans", "Roboto", sans-serif;
  font-size: 1.25em;
  margin-bottom: 0.5rem;
`;

export const CardTitle = styled.div`${cardTitleStyle}`;

export const CardBody = styled.div``;

export const CenteredCardTitle = styled.div`
  ${cardTitleStyle};
  text-align: center;
  margin-bottom: 0;
`;

export interface ICardProps {
    title?: React.ReactNode | string;
    backgroundColor?: string;
    textColor?: string;
}

export const Card: React.FC<ICardProps> = ({ children, backgroundColor, textColor }) => {
    if (!textColor && backgroundColor) {
        textColor = guessForegroundColor(backgroundColor);
    }

    return (
        <CardContainer style={{ backgroundColor, color: textColor }}>
            {children}
        </CardContainer>
    );
};

Card.defaultProps = {
    backgroundColor: `var(${paletteVars.primaryColor})`,
    textColor:       `var(${paletteVars.primaryTextColor})`
};

export const AccentCard: React.FC<ICardProps> = ({ children, ...props }) => (
    <Card {...props} backgroundColor={`var(${paletteVars.accentColor})`}
          textColor={`var(${paletteVars.accentTextColor})`}>
        {children}
    </Card>
);

export const ErrorCard: React.FC<ICardProps> = ({ children, ...props }) => (
    <Card {...props} backgroundColor={`var(${paletteVars.errorColor})`}
          textColor={`var(${paletteVars.errorTextColor})`}>
        {children}
    </Card>
);