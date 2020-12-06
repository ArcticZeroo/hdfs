export interface IPalette {
    // Defines the background color of the page. No text should be on this layer.
    backgroundColor: string;
    // Defines the primary background color for things such as cards, nav bars, dialogs, etc
    primaryColor: string;
    // Defines the color for an accent on the primary color, e.g. an accented title bar for a card or a button
    accentColor: string;
    // Defines the text color on top of the primary color
    primaryTextColor: string;
    // Defines the text color on top of the accent color
    accentTextColor: string;
    // Defines the color for errors
    errorColor: string;
    // Defines the text color on top of errors
    errorTextColor: string;
}

