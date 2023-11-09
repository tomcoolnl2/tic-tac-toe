import * as Rx from 'rxjs';
import { AppState, LoggerState, PlayerSymbol, GameState, User, AppScreen, IntelligenceLevel } from './model';
import { StateStorage } from './storage-manager';
import { GameEngine } from './game-engine';
import { AIEngine } from './ai-engine';

/**
 * Represents the main application state manager.
 */
class Store {
    private static _instance: Store = null;    

    private aiEngine: AIEngine = null;
    public gameEngine: GameEngine = null;
    public storage: StateStorage = null;

    /**
     * Represents the state of the application.
     */
    public state$: Rx.BehaviorSubject<AppState> = null;

    /**
     * Represents the user-specific state.
     */
    public user$: Rx.BehaviorSubject<User> = null;

    private constructor() {
        this.storage = new StateStorage();
        this.aiEngine = new AIEngine();
        this.gameEngine = new GameEngine();

        // Initialize state and user BehaviorSubjects with default or stored values
        this.state$ = new Rx.BehaviorSubject(this.storage.state ?? this.initialState);
        this.user$ = new Rx.BehaviorSubject(this.storage.user ?? this.initialUserState);
    }

    /**
     * Gets the singleton instance of the Store.
     */
    public static get instance(): Store {
        if (!Store._instance) {
            Store._instance = new Store();
        }
        return Store._instance;
    }

    /**
     * Gets the initial user state.
     */
    private get initialUserState(): User {
        return {
            name: '',
            avatar: PlayerSymbol.X,
        };
    }

    /**
     * Gets the initial application state.
     */
    public get initialState(): AppState {
        return {
            appScreen: AppScreen.SETTINGS,
            appModalScreen: null,
            intelligenceLevel: IntelligenceLevel.BIEBER,
            bitBoards: [0x0, 0x0],
            boardState: Array.from({ length: 9 }, () => null),
            currentPlayer: 0,
            playerSymbol: PlayerSymbol.X,
            cpuSymbol: PlayerSymbol.O,
            gameState: GameState.PREPLAY,
            solutionCells: null,
            scores: [0, 0, 0]
        };
    }

    /**
     * Generates the next game state based on the previous application state.
     * @param prevAppState - The previous application state.
     * @returns The next application state.
     */
    public getNextGameState(prevAppState: AppState) {
        return {
            ...this.initialState,
            playerSymbol: prevAppState.playerSymbol,
            cpuSymbol: prevAppState.cpuSymbol,
            intelligenceLevel: prevAppState.intelligenceLevel,
            scores: prevAppState.scores,
            gameState: GameState.PLAYING,
            appScreen: AppScreen.GAME,
        }
    }

    /**
     * Updates the application state and stores it.
     * @param newState - The new application state.
     */
    public nextState(newState: AppState): void {
        this.state$.next(newState);
        this.storage.state = newState;
    }

    /**
     * Resets the application state to its initial state.
     */
    public resetState() {
        this.nextState(this.initialState);
    }

    /**
     * Subscribes a React component to changes in the application state.
     * @param setState - The React state setter function.
     */
    public subscribe(setState: React.Dispatch<React.SetStateAction<AppState>>): void {
        this.state$.subscribe(setState);
    }

    /**
     * Updates the application state based on the selected cell index.
     * @param cellIndex - The index of the selected cell.
     */
    public update = async (cellIndex: number): Promise<void> => {
        await Rx.lastValueFrom(
            Rx.from(this.state$)
                .pipe(
                    Rx.take(1), // Take the latest value from the BehaviorSubject
                    Rx.mergeMap(async (state) => {
                        // Call game engine method passing current state and cellIndex
                        let newState = this.gameEngine.update({ ...state }, cellIndex);
                        // Update state using nextState method and await the completion
                        this.nextState(newState);

                        if (newState.gameState === GameState.PLAYING) {
                            // Initiate AI's turn with a delay
                            const nullIndex = await this.aiEngine.update(newState);
                            newState = this.gameEngine.update({ ...newState }, nullIndex);
                            this.nextState(newState);
                        }
                    })
                )
        );
    }
    
    /**
     * Gets the indices of null (empty) cells in the game board state.
     * @param {AppState['boardState']} boardState - The current state of the game board.
     * @returns {number[]} An array of indices representing null (empty) cells.
     */
    public getNullIndices(boardState: AppState['boardState']): number[] {
        return boardState.reduce((indices, value, index) => (value === null ? [...indices, index] : indices), []);
    }

    /**
     * Generates a random null index from the given board state.
     * @param boardState - The game board state.
     * @returns A random null index or null if none is available.
     */
    public getRandomNullIndex(boardState: AppState['boardState']): number | null {

        const nullIndices = this.getNullIndices(boardState);
        
        if (nullIndices.length === 0) {
            return null;
        }

        const randomIndex = nullIndices[Math.floor(Math.random() * nullIndices.length)];
        return randomIndex;
    }

    /**
     * Converts a number to a hexadecimal string.
     * @param n - The number to convert.
     * @returns The hexadecimal representation of the number.
     */
    public static toHexString = (n: number): string => `0x${n.toString(16)}`;

    /**
     * Converts a number to a binary string.
     * @param n - The number to convert.
     * @returns The binary representation of the number.
     */
    public static toBinString = (n: number): string => `0b${(n >>> 0).toString(2)}`;

    /**
     * Logs the application state and its representations.
     * @returns The logger state object containing various representations of the state.
     */
    public log(): LoggerState {
        const bitBoards = this.state$.value.bitBoards;
        return {
            appState: this.state$.value,
            dec: bitBoards,
            hex: bitBoards.map(Store.toHexString),
            bin: bitBoards.map(Store.toBinString),
        };
    }
}

const AppStore = Store.instance;
export { AppStore };