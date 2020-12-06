import React from 'react';
import styled from 'styled-components';
import { ExpensesAndBenefits } from './components/benefits/root';
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
  flex-wrap: wrap;
  align-items: center;
  background: var(${paletteVars.backgroundColor});
  color: var(${paletteVars.primaryTextColor});
`;

function App() {
    return (
        <AppContainer>
            <ExpensesAndBenefits/>
        </AppContainer>
    );
}

export default App;
