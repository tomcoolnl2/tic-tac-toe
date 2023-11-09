import { AppState, User } from './model';

/**
 * The StateStorage class is responsible for managing application state and user data storage.
 */
export class StateStorage {

    /** The key used to identify the data in storage. */
    public static readonly key = 'ttt';
    
    /** The underlying storage implementation (e.g., sessionStorage). */
    public storage: Storage;

    /**
     * Creates an instance of the StateStorage class.
     * @param storage - The storage implementation to use (e.g., sessionStorage).
     */
    constructor(storage?: Storage) {
        this.storage = storage || sessionStorage;
    }

    /**
     * Generates a namespaced key for storage.
     * @param ns - The namespace identifier.
     * @returns The namespaced key.
     */
    private namespace(ns: string): string {
        return `${StateStorage.key}:${ns}`;
    }

    /**
     * Retrieves the application state from storage.
     * @returns The application state.
     */
    public get state(): AppState {
        return this.fromStorage<AppState>('state');
    }

    /**
     * Stores the application state in storage.
     * @param state - The application state to store.
     */
    public set state(state: AppState) {
        this.toStorage<AppState>('state', state);
    }

    /**
     * Retrieves user data from storage.
     * @returns User data.
     */
    public get user(): User {
        return this.fromStorage<User>('user');
    }

    /**
     * Stores user data in storage.
     * @param state - The user data to store.
     */
    public set user(state: User) {
        this.toStorage<User>('user', state);
    }

    /**
     * Retrieves data from storage based on a namespace.
     * @param ns - The namespace identifier.
     * @returns The data retrieved from storage.
     */
    private fromStorage<T>(ns: string): T {
        return JSON.parse(
            this.storage.getItem(this.namespace(ns)) ?? null
        ) as T;
    }

    /**
     * Stores data in storage based on a namespace.
     * @param ns - The namespace identifier.
     * @param state - The data to store.
     */
    private toStorage<T>(ns: string, state: T): void {
        this.storage.setItem(this.namespace(ns), JSON.stringify(state));
    }

    /**
     * Clears the stored state and user data.
     */
    public clearState(): void {
        this.storage.removeItem(StateStorage.key);
    }
}
