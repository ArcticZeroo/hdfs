interface IMeasurementParams {
    pixels: number;
    rem: number;
}

/**
 * Calculates screen measurements between pixels and rem.
 */
export class Measurement {
    private readonly _pixels: number;
    private readonly _rem: number;

    static get pixelsPerRem(): number {
        return Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    constructor({pixels = 0, rem = 0}: Partial<IMeasurementParams>) {
        this._pixels = pixels;
        this._rem = rem;
    }

    get inPixels(): number {
        return this._pixels + (this._rem * Measurement.pixelsPerRem);
    }

    get inRem(): number {
        return (this._pixels / Measurement.pixelsPerRem) + this._rem;
    }
}