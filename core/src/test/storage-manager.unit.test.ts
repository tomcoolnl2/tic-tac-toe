import {
	AppState,
	AppScreen,
	IntelligenceLevel,
	PlayerSymbol,
	GameState,
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

	it('should retrieve the user from storage', () => {
		// Prepare
		const user = { name: 'John', avatar: PlayerSymbol.X };
		// Act
		mockStorage.setItem('ttt:user', JSON.stringify(user));
		// Assert
		const retrievedUser = stateStorage.user;
		expect(retrievedUser).toEqual(user);
	});

	it('should return null when state is not found', () => {
		// Act
		const retrievedState = stateStorage.state;
		// Assert
		expect(retrievedState).toBeNull();
	});

	it('should return null when user is not found', () => {
		// Act
		const retrievedUser = stateStorage.user;
		// Assert
		expect(retrievedUser).toBeNull();
	});

	it('should set the state in storage', () => {
		// Act
		stateStorage.state = appState;
		const storedState = mockStorage.getItem('ttt:state');
		// Assert
		expect(JSON.parse(storedState!)).toEqual(appState);
	});

	it('should set the user in storage', () => {
		// Prepare
		const user = { name: 'John', avatar: PlayerSymbol.X, loggedIn: true };
		// Act
		stateStorage.user = user;
		const storedUser = mockStorage.getItem('ttt:user');
		// Assert
		expect(JSON.parse(storedUser!)).toEqual(user);
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
