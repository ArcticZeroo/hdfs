import { MathUtil } from './math';

export abstract class StringUtil {
    static capitalize(s: string) {
        if (!s) {
            return '';
        }

        let capitalized = s[0].toUpperCase();
        if (s.length > 1) {
            capitalized += s.slice(1).toLowerCase();
        }
        return capitalized;
    }

    static money(amount: number, precision: number = 2) {
        const fixedAmount = MathUtil.toFixed(amount, precision);
        const pieces: string[] = [];
        let current = Math.floor(fixedAmount);
        while (current > 0) {
            const beforeComma = current % 1000;
            pieces.splice(0, 0, beforeComma.toString());
            current = Math.floor(current / 1000);
        }
        const decimalPlace = Math.floor((fixedAmount - Math.floor(fixedAmount)) * Math.pow(10, precision));

        const output = pieces.map((piece, i) => i === 0 ? piece : piece.padStart(3, '0'));

        return `$${output.join(',') || '0'}${decimalPlace > 0 ? `.${decimalPlace}` : ''}`;
    }
}