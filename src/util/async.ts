export const throttledPromise = <T>(returnsPromise: () => Promise<T>, onSuccess: (value: T) => void, onFailure: (error: any) => void) => {
    let activePromiseSymbol: Symbol;

    return () => {
        const currentPromiseSymbol = Symbol();

        returnsPromise()
            .then(value => {
                if (currentPromiseSymbol === activePromiseSymbol) {
                    onSuccess(value);
                }
            }).catch(err => {
                if (currentPromiseSymbol === activePromiseSymbol) {
                    onFailure(err);
                }
        })
    }
};