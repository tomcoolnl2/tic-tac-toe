import { AppState, PlayerSymbol } from '@tic-tac-toe/model';

/**
 * Asynchronously pauses the execution for a specified duration.
 * @param {number} [ms=500] - The duration in milliseconds to wait before resolving the promise.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 */
export const sleep = (ms = 500): Promise<void> => new Promise((r) => setTimeout(r, ms));

/**
 * Gets the indices of null (empty) cells in the game board state.
 * @param {AppState['boardState']} boardState - The current state of the game board.
 * @returns {number[]} An array of indices representing null (empty) cells.
 */
export const getNullIndices = (boardState: AppState['boardState']): number[] => {
	return boardState.reduce((indices: number[], value: PlayerSymbol | null, index: number) => {
		return value === null ? [...indices, index] : indices;
	}, []);
};

/**
 * Generates a random null index from the given board state.
 * @param boardState - The game board state.
 * @returns A random null index or null if none is available.
 */
export const getRandomNullIndex = (boardState: AppState['boardState']): number => {
	const nullIndices = getNullIndices(boardState);
	return nullIndices.length ? nullIndices[(Math.random() * nullIndices.length) << 0] : -1;
};
