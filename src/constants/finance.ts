export const incomeBrackets2020 = [
    [[0, 9875], 0.10],
    [[9876, 40125], 0.12],
    [[40126, 85525], 0.22],
    [[85526, 163300], 0.24],
    [[163301, 207350], 0.32],
    [[207351, 518400], 0.35],
    [[518401, Number.POSITIVE_INFINITY], 0.37]
] as const;

export const standardDeduction2020 = 12_400;

export const recommendedMonthsForSavings = 6;

export const retirementRothContributionLimit = (age: number) => age < 50 ? 6000 : 7000;

export const retirement401kContributionLimit = 19500;

export const hsaContributionLimit = (age: number) => age < 55 ? 3550 : 4550;

export const fsaContributionLimit = 2750;