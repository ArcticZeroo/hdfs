export const RetirementAccountType = {
    employeeContributed: 'employeeContributed',
    noneOrOther:         'noneOrOther'
} as const;

export const Retirement401kType = {
    roth:     'roth',
    standard: 'standard'
} as const;

export const InvestmentPreference = {
    conservative: 'conservative',
    moderate:     'moderate',
    aggressive:   'aggressive',
} as const;