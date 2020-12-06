import history from 'history/hash';
import { URLParameters } from '../../models/parameters';

const parameters: Record<URLParameters, string> = {
    [URLParameters.expenses]:                  'expenses',
    [URLParameters.grossIncome]:               'grossIncome',
    [URLParameters.retirementType]:            'retireType',
    [URLParameters.retirementMatchPercentage]: 'retireMatchPercentage',
    [URLParameters.retirementMatchYearlyCap]:  'retireYearlyCap'
};

export function saveStateInUrl(state: Record<URLParameters, string>) {
    const stateData = btoa(JSON.stringify(state));
    history.push({
        pathname: history.location.pathname,
        search: `?state=${stateData}`
    });
}

export function retrieveStateFromUrl() {
    const searchParams = new URLSearchParams(history.location.search);
    const stateValue = searchParams.get('state');
    if (!stateValue) {
        return {};
    }
    return JSON.parse(atob(stateValue));
}