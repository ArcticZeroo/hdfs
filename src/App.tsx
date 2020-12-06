import React from 'react';
import styled from 'styled-components';
import { RetirementBenefit } from './components/benefits/retirement/retirement-benefit';
import { IncomeAndExpenses } from './components/benefits/income/income-and-expenses';
import { StockPurchase } from './components/benefits/stock/stock-purchase';
import { darkPalette, lightPalette } from './constants/colors';
import { paletteVars } from './constants/css-variables';
import './App.css';
import { IPalette } from './models/palette';
import { keysOf } from './util/keys';

const paletteToCss = (palette: IPalette): string => {
    const result: string[] = [];

    for (const key of keysOf(palette)) {
        result.push(`${paletteVars[key]}: ${palette[key]};`);
    }

    return result.join('\n');
};

const defaultPaletteData = `
${paletteToCss(lightPalette)};

@media(prefers-color-scheme: dark) {
  ${paletteToCss(darkPalette)};
}
`;

const AppContainer = styled.div`
  ${defaultPaletteData};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(${paletteVars.backgroundColor});
  color: var(${paletteVars.primaryTextColor});
`;

function App() {
    return (
        <AppContainer>
            <IncomeAndExpenses/>
            <RetirementBenefit/>
            <StockPurchase/>
        </AppContainer>
    );
}

export default App;
