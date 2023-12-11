import {
	AppState,
	AppScreen,
	IntelligenceLevel,
	PlayerSymbol,
	GameState,
	Locale,
} from '@tic-tac-toe/model';
import { StateStorage } from '../lib/storage-manager';
import { MockStorage } from './mock/mock-storage';

let stateStorage: StateStorage;
let mockStorage: MockStorage;
let appState: AppState;

beforeEach(() => {
	mockStorage = new MockStorage();
	stateStorage = new StateStorage(mockStorage);

	appState = {
		language: Locale.EN,
		appScreen: AppScreen.LOADING,
		appModalScreen: null,
		intelligenceLevel: IntelligenceLevel.EASY,
		bitBoards: [0x0, 0x0],
		boardState: Array.from({ length: 9 }, () => null),
		currentPlayer: 0,
		playerSymbol: PlayerSymbol.X,
		cpuSymbol: PlayerSymbol.O,
		gameState: GameState.PREPLAY,
		solutionCells: null,
		scores: [0, 0, 0],
	};
});

afterEach(() => {
	mockStorage.clear();
});

describe('StateStorage', () => {
	it('should retrieve the state from storage', () => {
		// Act
		mockStorage.setItem('ttt:state', JSON.stringify(appState));
		// Assert
		const retrievedState = stateStorage.state;
		expect(retrievedState).toEqual(appState);
	});

	it('should return null when state is not found', () => {
		// Act
		const retrievedState = stateStorage.state;
		// Assert
		expect(retrievedState).toBeNull();
	});

	it('should set the state in storage', () => {
		// Act
		stateStorage.state = appState;
		const storedState = mockStorage.getItem('ttt:state');
		// Assert
		expect(JSON.parse(storedState!)).toEqual(appState);
	});

	it('should clear the state from storage', () => {
		// Act
		mockStorage.setItem('ttt', JSON.stringify(appState));
		stateStorage.clearState();
		const storedState = mockStorage.getItem('ttt');
		// Assert
		expect(storedState).toBeNull();
	});

	it('should generate the correct namespace for state', () => {
		// Act
		const namespace = stateStorage['namespace']('state');
		// Assert
		expect(namespace).toBe('ttt:state');
	});

	it('should generate the correct namespace for user', () => {
		// Act
		const namespace = stateStorage['namespace']('user');
		// Assert
		expect(namespace).toBe('ttt:user');
	});
});
