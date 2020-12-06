import { IPalette } from '../models/palette';

export const paletteVars: Record<keyof IPalette, string> = {
    backgroundColor:  '--background-color',
    primaryColor:     '--primary-color',
    accentColor:      '--accent-color',
    primaryTextColor: '--primary-text-color',
    accentTextColor:  '--accent-text-color',
    errorColor:       '--error-color',
    errorTextColor:   '--error-text-color',
};