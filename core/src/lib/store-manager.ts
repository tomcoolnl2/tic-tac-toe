import * as Rx from 'rxjs';
import * as React from 'react';
import * as TTTModel from '@tic-tac-toe/model';
import { AIEngine } from './ai-engine';
import { GameEngine } from './game-engine';
import { StateStorage } from './storage-manager';

/**
 * Represents the main application state manager.
 */
class Store {
	private static _instance: Store;

	private aiEngine: AIEngine | null = null;
	public gameEngine: GameEngine | null = null;
	public storage: StateStorage | null = null;

	/**
	 * Represents the state of the application.
	 */
	public state$: Rx.BehaviorSubject<TTTModel.AppState>;

	private constructor() {
		this.aiEngine = new AIEngine();
		this.gameEngine = new GameEngine();
		this.storage = new StateStorage();
		// Initialize state and user BehaviorSubjects with default or stored values
		const state = this.storage.state ?? this.initialState;
		this.state$ = new Rx.BehaviorSubject(state);
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
	 * Gets the initial application state.
	 */
	public get initialState(): TTTModel.AppState {
		return {
			language: TTTModel.Locale.EN,
			appScreen: TTTModel.AppScreen.LOADING,
			appModalScreen: null,
			intelligenceLevel: TTTModel.IntelligenceLevel.EASY,
			bitBoards: [0x0, 0x0],
			boardState: Array.from({ length: 9 }, () => null),
			currentPlayer: 0,
			playerSymbol: TTTModel.PlayerSymbol.X,
			cpuSymbol: TTTModel.PlayerSymbol.O,
			gameState: TTTModel.GameState.STOPPED,
			solutionCells: null,
			scores: [0, 0, 0],
		};
	}

	/**
	 * Generates the next game state based on the previous application state.
	 * @param prevAppState - The previous application state.
	 * @returns The next application state.
	 */
	public getNextRoundGameState(prevAppState: TTTModel.AppState) {
		const { playerSymbol, cpuSymbol, intelligenceLevel, scores, language } = prevAppState;
		return {
			...this.initialState,
			language,
			playerSymbol,
			cpuSymbol,
			intelligenceLevel,
			scores,
			gameState: TTTModel.GameState.PLAYING,
			appScreen: TTTModel.AppScreen.GAME,
		};
	}

	/**
	 * Updates the application state and stores it.
	 * @param newState - The new application state.
	 */
	public nextState(newState: TTTModel.AppState): void {
		this.state$.next(newState);
		this.storage!.state = newState;
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
	public subscribe(setState: React.Dispatch<React.SetStateAction<TTTModel.AppState>>): void {
		this.state$.subscribe(setState);
	}

	/**
	 * Updates the application state based on the selected cell index.
	 * @param cellIndex - The index of the selected cell.
	 */
	public update = async (cellIndex: number): Promise<void> => {
		await Rx.lastValueFrom(
			Rx.from(this.state$).pipe(
				Rx.take(1), // Take the latest value from the BehaviorSubject
				Rx.mergeMap(async (state) => {
					// Call game engine method passing current state and cellIndex
					let newState = this.gameEngine!.update({ ...state }, cellIndex);
					// Update state using nextState method and await the completion
					this.nextState(newState);

					if (newState.gameState === TTTModel.GameState.PLAYING) {
						// Initiate AI's turn with a delay
						const nullIndex = await this.aiEngine!.update(newState);
						newState = this.gameEngine!.update({ ...newState }, nullIndex);
						this.nextState(newState);
					}
				})
			)
		);
	};

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
	public log(): TTTModel.LoggerState {
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
