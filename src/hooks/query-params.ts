import { booleanSerializer, enumSerializer, numberSerializer, stringSerializer } from '../api/url/serializers';
import { queryParam } from '../constants/query-params';
import { InvestmentPreference, Retirement401kType, RetirementAccountType } from '../models/finance';
import { useQueryParam } from './use-query-param';

export const useAge = () => useQueryParam(queryParam.age, numberSerializer, 0);
export const useInvestmentPreference = () => useQueryParam(queryParam.investmentPreference, enumSerializer(InvestmentPreference), InvestmentPreference.moderate);

export const useGrossIncome = () => useQueryParam(queryParam.grossIncome, numberSerializer, 0);
export const useExpenses = () => useQueryParam(queryParam.expenses, numberSerializer, 0);
export const usePersonalUse = () => useQueryParam(queryParam.personalUse, numberSerializer, 0);
export const useStateTax = () => useQueryParam(queryParam.stateTax, numberSerializer, 0);
export const useNetIncome = () => {
    const [grossIncome] = useGrossIncome();
    const [expenses] = useExpenses();
    return grossIncome - expenses;
}

export const useRetirementBenefitType = () => useQueryParam(queryParam.retirementBenefitType,
    enumSerializer(RetirementAccountType), RetirementAccountType.noneOrOther);
export const useRetirement401kType = () => useQueryParam(queryParam.retirement401kType,
    enumSerializer(Retirement401kType), Retirement401kType.standard);
export const useDefinedContributionMatchLimit = () => useQueryParam(queryParam.definedContributionMatchLimit, numberSerializer, 0);
export const useDefinedContributionMatchPercent = () => useQueryParam(queryParam.definedContributionMatchPercent, numberSerializer, 0);
export const useDefinedContributionExpectedReturn = () => useQueryParam(queryParam.definedContributionExpectedReturn, numberSerializer, 0);

export const useHasStockPurchasePlan = () => useQueryParam(queryParam.hasStockPurchasePlan, booleanSerializer, false);
export const useStockPurchaseDiscount = () => useQueryParam(queryParam.stockPurchaseDiscount, numberSerializer, 0);
export const useStockPurchaseLimit = () => useQueryParam(queryParam.stockPurchaseLimit, numberSerializer, 0);

export const useMedicalExpenses = () => useQueryParam(queryParam.healthSavingsMedicalExpenses, numberSerializer, 0);
export const useIsHSASupported = () => useQueryParam(queryParam.healthSavingsHSASupported, booleanSerializer, false);
export const useEmployerHSAContributions = () => useQueryParam(queryParam.healthSavingsHSAEmployerContributions, numberSerializer, 0);

export const useSavingsDesired = (defaultValue = 0) => useQueryParam(queryParam.savingsDesired, numberSerializer, defaultValue);
export const useSavingsAlready = () => useQueryParam(queryParam.savingsAlready, numberSerializer, 0);