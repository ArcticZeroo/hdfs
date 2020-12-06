import { Measurement } from '../util/measurement';

/**
 * Defines a flex display object where items are centered vertically and horizontally.
 */
export const centeredFlex = `
display: flex;
justify-content: center;
align-items: center;
`;

/**
 * Defines a button that has no "default css", pretty much meaning the border/outline.
 * This doesn't change the background in case it is used after the background is already set.
 */
export const resetButton = `
border: none;
outline: none;
`;

/**
 * Defines a square object with the same width/height. Unlike the others, this is a method.
 * @param size - a {@link Measurement} defining the height and width of this object
 */
export const square = (size: Measurement) => `
width: ${size.inRem}rem;
height: ${size.inRem}rem;
`;