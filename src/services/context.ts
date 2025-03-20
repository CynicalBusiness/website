import { getContext, setContext } from "@tanstack/react-start/server";

export interface RequestContextStore {
    [key: PropertyKey]: unknown;
}

export const RequestContextStoreKey = "RequestContextStore";

/**
 * Service for handling **server-side-only** request context.
 *
 * For shared and/or client context, use the router context instead.
 */
export class ContextService {
    public getStore(): RequestContextStore {
        let store = getContext(RequestContextStoreKey) as RequestContextStore;
        if (!store) {
            setContext(RequestContextStoreKey, (store = {}));
        }
        return store;
    }

    public get<K extends keyof RequestContextStore>(
        key: K,
    ): RequestContextStore[K] | undefined;
    public get<T = unknown>(key: PropertyKey): T | undefined;
    public get(key: PropertyKey): unknown {
        return this.getStore()[key];
    }

    public set<K extends keyof RequestContextStore>(
        key: K,
        value: RequestContextStore[K],
    ): RequestContextStore[K];
    public set<T = unknown>(key: PropertyKey, value: T): T;
    public set(key: PropertyKey, value: unknown): unknown {
        this.getStore()[key] = value;
        return value;
    }
}
