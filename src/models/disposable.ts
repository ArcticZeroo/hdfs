export interface IDisposable {
    dispose(): void;
}

export function using<T extends IDisposable>(resource: T, use: (resource: T) => void) {
    try {
        use(resource);
    } finally {
        resource.dispose();
    }
}