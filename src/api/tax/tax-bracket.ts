import { incomeBrackets2020 } from '../../constants/income-bracket';

export const getTotalTax = (income: number) => {
    let totalTax = 0;

    for (const [[minBound, maxBound], taxRate] of incomeBrackets2020) {
        const taxableAmount = Math.min(income, maxBound) - minBound;
        totalTax += taxableAmount * taxRate;
        if (income <= maxBound) {
            break;
        }
    }

    return totalTax;
};