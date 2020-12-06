export type Listener<T> = (value: T) => void;

export class ChangeNotifier<T> {
    private _listeners: Array<Listener<T>> = [];

    addListener(listener: Listener<T>) {
        this._listeners.push(listener);
    }

    removeListener(listener: Listener<T>) {
        const listenerIndex = this._listeners.indexOf(listener);
        if (listenerIndex === -1) {
            return;
        }
        this._listeners.splice(listenerIndex, 1);
    }

    notifyListeners(value: T) {
        for (const listener of this._listeners) {
            listener(value);
        }
    }
}