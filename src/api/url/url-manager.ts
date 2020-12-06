import { createBrowserHistory } from 'history';
import Nullable from '../../models/nullable';
import { SearchParamsNotifier } from './search-params-notifier';

export const history = createBrowserHistory();

export const searchParams = new SearchParamsNotifier(history);

export const updateParam = (param: string, value: Nullable<string>) => {
    const currentUrlSearchParams = new URLSearchParams(searchParams.urlSearchParams);
    // doesn't matter if we mutate this one because it's about to be updated anyways, /shrug
    if (!value) {
        currentUrlSearchParams.delete(param);
    } else {
        currentUrlSearchParams.set(param, value);
    }
    history.replace(`${history.location.pathname}?${currentUrlSearchParams.toString()}`);
};