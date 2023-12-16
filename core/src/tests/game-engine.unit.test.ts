import { AppState, GameStatus, PlayerSymbol } from '@tic-tac-toe/model';
import { GameEngine } from '../lib/game-engine';
import { AppStore } from '../lib/store-manager';

let gameEngine: GameEngine;
let appState: AppState;

beforeEach(() => {
	appState = AppStore.initialState;
	gameEngine = new GameEngine();
});

describe('GameEngine - determineWinner', () => {
	it('should correctly determine the winner', () => {
		// Prepare
		appState.bitBoards = [0b000000111, 0b000000000]; // Player X wins with top row (binary: 000000111, decimal: 7)
		appState.boardState = [0, 0, 0, null, null, null, null, null, null];
		// Act
		const isWinner = gameEngine.determineWinner(appState);
		// Assert
		expect(typeof isWinner).toBe('number');
	});

	it('should correctly determine no winner', () => {
		// Prepare
		appState.bitBoards = [0x0, 0x0]; // No winning combination for any player
		appState.boardState = [0, 0, 0, null, null, null, null, null, null];
		// Act
		const isWinner = gameEngine.determineWinner(appState);
		// Assert
		expect(isWinner).toBe(null);
	});
});

describe('GameEngine - determineDraw', () => {
	it('should correctly determine a draw', () => {
		// Prepare
		appState.bitBoards = [339, 172];
		appState.boardState = [0, 0, 0, 0, 1, 0, 0, 0, 1];
		// Act
		const isDraw = gameEngine.determineDraw(appState);
		// Assert
		expect(isDraw).toBe(true);
	});

	it('should correctly determine no draw', () => {
		// Prepare
		appState.bitBoards = [0b000000101, 0b000000010];
		// Act
		const isDraw = gameEngine.determineDraw(appState);
		// Assert
		expect(isDraw).toBe(false);
	});

	it('should correctly process a valid turn and update the game state', () => {
		// Prepare
		const cellIndex = 4; // Centered Cell index
		// Act
		const updatedAppState = gameEngine.update(appState, cellIndex);
		// Assert
		expect(updatedAppState.bitBoards[0]).toBe(16);
	});

	it('should correctly switch turns after a valid player move', () => {
		// Prepare
		const cellIndex = 4; // Cell index for the player's move
		// Act
		const updatedGameStatus = gameEngine.update(appState, cellIndex);
		// Assert
		expect(updatedGameStatus.currentPlayer).toBe(1); // Player O's turn after Player X's move
	});

	it('should not switch turns after an invalid player move', () => {
		// Prepare
		const cellIndex = 0;
		// Act
		const updatedGameStatus = gameEngine.update(appState, cellIndex);
		// Assert
		expect(updatedGameStatus.currentPlayer).toBe(appState.currentPlayer);
	});

	it('should not update the game state for an invalid move on an occupied cell', () => {
		// Prepare
		const cellIndex = 4; // Cell index for the first valid move
		// Act
		// Make the first valid move to occupy the cell
		const updatedGameStatus = gameEngine.update(appState, cellIndex);
		// Attempt to make another move on the same cell (invalid move)
		const invalidMoveGameStatus = gameEngine.update(updatedGameStatus, cellIndex);
		// Assert
		expect(invalidMoveGameStatus).toEqual(updatedGameStatus);
	});

	it('should not update the game state for an invalid move on an out-of-bounds cell', () => {
		// Prepare
		const invalidCellIndex = -1; // Cell index out of bounds (negative)
		// Act
		const invalidMoveGameStatus = gameEngine.update(appState, invalidCellIndex);
		// Assert
		expect(invalidMoveGameStatus).toEqual(appState);
	});

	it('should detect winning condition for player X', () => {
		// Prepare
		const winCombination = [0, 4, 1, 5, 2]; // Winning combination for player X
		// Act
		winCombination.forEach((cellIndex) => {
			appState = gameEngine.update(appState, cellIndex);
		});
		// Assert
		expect(appState.gameStatus).toBe(GameStatus.WIN);
		expect(appState.scores[0]).toBe(1);
	});

	it('should detect winning condition for player O', () => {
		// Prepare
		appState.currentPlayer = PlayerSymbol.O;
		const winCombination = [0, 3, 1, 4, 2];
		// Act
		winCombination.forEach((cellIndex) => {
			appState = gameEngine.update(appState, cellIndex);
		});
		// Assert
		expect(appState.gameStatus).toBe(GameStatus.LOST);
		expect(appState.scores[2]).toBe(1);
	});

	it('should not detect winning condition when there is none', () => {
		// Prepare
		const nonWinningCombination = [0, 3, 1, 2, 4]; // Non-winning combination
		// Act
		nonWinningCombination.forEach((cellIndex) => {
			appState = gameEngine.update(appState, cellIndex);
		});
		// Assert
		expect(appState.gameStatus).toBe(GameStatus.STOPPED);
		expect(appState.scores).toEqual([0, 0, 0]);
	});

	it('should detect draw condition', () => {
		// Prepare
		const movesForDraw = [0, 3, 1, 4, 5, 2, 6, 7, 8]; // These moves result in a draw
		// Act
		movesForDraw.forEach((cellIndex) => {
			appState = gameEngine.update(appState, cellIndex);
		});
		// Assert
		expect(appState.gameStatus).toBe(GameStatus.DRAW);
		expect(appState.scores[1]).toBe(1);
		expect(appState.bitBoards[appState.playerSymbol]).toBe(355);
		expect(appState.bitBoards[appState.cpuSymbol]).toBe(156);
	});

	it('should not detect draw condition when there is none', () => {
		// Prepare
		const nonDrawMoves: number[] = [0, 1, 2, 4]; // These moves do not result in a draw
		// Act
		nonDrawMoves.forEach((cellIndex) => {
			appState = gameEngine.update(appState, cellIndex);
		});
		// Assert
		expect(appState.gameStatus).toBe(GameStatus.STOPPED);
		expect(appState.scores).toEqual([0, 0, 0]);
	});
});
