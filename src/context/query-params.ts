import { NumberParam, StringParam, useQueryParam, withDefault } from 'use-query-params';
import { queryParam } from '../constants/query-params';
import { RetirementAccountType } from '../models/retirement';

export const useGrossIncome = () => useQueryParam(queryParam.grossIncome, withDefault(NumberParam, 0));
export const useExpenses = () => useQueryParam(queryParam.expenses, withDefault(NumberParam, 0));
export const useRetirementBenefitType = () => useQueryParam(queryParam.retirementBenefitType, withDefault(StringParam, RetirementAccountType.noneOrOther));
