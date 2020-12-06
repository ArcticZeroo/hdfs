import { IPalette } from '../models/palette';

export const primaryColors = {
    blue:        '#2196F3',
    almostBlack: '#212121',
    almostWhite: '#FAFAFA',
    lightGrey:   '#EEE',
    white:       'white',
    black:       'black',
    red:         '#F44336',
    darkRed:     '#B71C1C',
};

export const accentColors = {
    blue: '#448AFF'
};

export const lightPalette: IPalette = {
    backgroundColor:  primaryColors.almostWhite,
    primaryColor:     primaryColors.blue,
    primaryTextColor: primaryColors.white,
    accentColor:      primaryColors.lightGrey,
    accentTextColor:  primaryColors.almostBlack,
    errorColor:       primaryColors.red,
    errorTextColor:   primaryColors.almostBlack,
};

export const darkPalette: IPalette = {
    backgroundColor:  primaryColors.black,
    primaryColor:     primaryColors.almostBlack,
    primaryTextColor: primaryColors.almostWhite,
    accentColor:      accentColors.blue,
    accentTextColor:  primaryColors.almostBlack,
    errorColor:       primaryColors.darkRed,
    errorTextColor:   primaryColors.white,
};