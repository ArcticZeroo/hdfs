import { incomeBrackets2020 } from '../../constants/finance';

export const getRawYearlyTaxAmount = (income: number, stateIncomeTaxPercent: number = 0) => {
    let totalTax = 0;

    for (const [[minBound, maxBound], taxRate] of incomeBrackets2020) {
        const taxableAmount = Math.min(income, maxBound) - minBound;
        totalTax += taxableAmount * taxRate;
        if (income <= maxBound) {
            break;
        }
    }

    return totalTax + (income * stateIncomeTaxPercent / 100);
};

