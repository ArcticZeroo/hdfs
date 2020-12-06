import { numberSerializer } from '../api/url/serializers';
import { queryParam } from '../constants/query-params';
import { useQueryParam } from './use-query-param';

export const useGrossIncome = () => useQueryParam(queryParam.grossIncome, numberSerializer, 0);
export const useExpenses = () => useQueryParam(queryParam.expenses, numberSerializer, 0);
