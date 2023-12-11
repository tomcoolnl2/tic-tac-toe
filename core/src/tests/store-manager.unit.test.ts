import {
	AppState,
	AppScreen,
	IntelligenceLevel,
	PlayerSymbol,
	GameState,
	Locale,
} from '@tic-tac-toe/model';
import { AppStore } from '../lib/store-manager';

let store: typeof AppStore;
let appState: AppState;

beforeEach(() => {
	appState = {
		language: Locale.EN,
		appScreen: AppScreen.LOADING,
		appModalScreen: null,
		intelligenceLevel: IntelligenceLevel.EASY,
		bitBoards: [0x0, 0x0],
		boardState: Array.from({ length: 9 }, () => null),
		currentPlayer: PlayerSymbol.X,
		playerSymbol: PlayerSymbol.X,
		cpuSymbol: PlayerSymbol.O,
		gameState: GameState.PREPLAY,
		solutionCells: null,
		scores: [0, 0, 0],
	};

	store = AppStore;
});

describe('StateStorage', () => {
	test('Store initializes with the correct initial state and user state', () => {
		// Assert
		expect(store.state$.getValue()).toEqual(appState);
	});

	test('State updates correctly and updates storage', async () => {
		// Prepare
		const newState: AppState = {
			language: Locale.EN,
			appScreen: AppScreen.LOADING,
			appModalScreen: null,
			intelligenceLevel: IntelligenceLevel.MEDIUM,
			bitBoards: [0x1, 0x2],
			boardState: [PlayerSymbol.X, PlayerSymbol.O, null, null, null, null, null, null, null],
			currentPlayer: PlayerSymbol.O,
			playerSymbol: PlayerSymbol.X,
			cpuSymbol: PlayerSymbol.O,
			gameState: GameState.PLAYING,
			solutionCells: null,
			scores: [1, 2, 0],
		};
		// Act
		await store.nextState(newState);
		// Assert
		expect(store.state$.getValue()).toEqual(newState);
		expect(store.state$.value).toEqual(store.log().appState);
		expect(store.storage!.state).toEqual(newState);
	});

	test('Processing a turn correctly updates the state', () => {
		// Prepare
		const initialState = store.state$.getValue();
		// Act
		const updatedState = store.update(0);
		// Assert
		expect(updatedState).not.toEqual(initialState);
	});
});
