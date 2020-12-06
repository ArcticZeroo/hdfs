import { booleanSerializer, enumSerializer, numberSerializer, stringSerializer } from '../api/url/serializers';
import { queryParam } from '../constants/query-params';
import { RetirementAccountType } from '../models/retirement';
import { useQueryParam } from './use-query-param';

export const useGrossIncome = () => useQueryParam(queryParam.grossIncome, numberSerializer, 0);
export const useExpenses = () => useQueryParam(queryParam.expenses, numberSerializer, 0);

export const useRetirementBenefitType = () => useQueryParam(queryParam.retirementBenefitType,
    enumSerializer(Object.values(RetirementAccountType)), RetirementAccountType.noneOrOther);
export const useDefinedContributionMatchLimit = () => useQueryParam(queryParam.definedContributionMatchLimit, numberSerializer, 0);
export const useDefinedContributionMatchPercent = () => useQueryParam(queryParam.definedContributionMatchPercent, numberSerializer, 0);
export const useDefinedContributionExpectedReturn = () => useQueryParam(queryParam.definedContributionExpectedReturn, numberSerializer, 0);

export const useHasStockPurchasePlan = () => useQueryParam(queryParam.hasStockPurchasePlan, booleanSerializer, false);
export const useStockPurchaseDiscount = () => useQueryParam(queryParam.stockPurchaseDiscount, numberSerializer, 0);
export const useStockPurchaseLimit = () => useQueryParam(queryParam.stockPurchaseLimit, numberSerializer, 0);