import { ChangeNotifier } from './change-notifier';

export class ValueNotifier<T> extends ChangeNotifier<T> {
    private _value: T;

    constructor(initialValue: T) {
        super();
        this._value = initialValue;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (this._value != newValue) {
            this._value = newValue;
            this.notifyListeners(newValue);
        }
    }
}