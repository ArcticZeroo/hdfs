import { BrowserHistory } from 'history';
import { ChangeNotifier } from '../listener/change-notifier';

export class SearchParamsNotifier extends ChangeNotifier<[URLSearchParams, URLSearchParams]> {
    private _lastSearch: string;
    private _lastUrlSearchParams: URLSearchParams;

    constructor(private readonly _history: BrowserHistory) {
        super();
        this._lastSearch = _history.location.search;
        this._lastUrlSearchParams = new URLSearchParams(this._lastSearch);
        this._addListeners();
    }

    get urlSearchParams() {
        return this._lastUrlSearchParams;
    }

    private _addListeners() {
        this._history.listen(state => {
            const newSearchParams = state.location.search;
            if (newSearchParams !== this._lastSearch) {
                this._lastSearch = newSearchParams;
                const oldUrlSearchParams = this._lastUrlSearchParams;
                this._lastUrlSearchParams = new URLSearchParams(this._lastSearch);
                this.notifyListeners([this._lastUrlSearchParams, oldUrlSearchParams]);
            }
        });
    }
}