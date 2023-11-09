import * as TTTModel from '@tic-tac-toe/model';

export const delay = (ms = 500): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Gets the indices of null (empty) cells in the game board state.
 * @param {AppState['boardState']} boardState - The current state of the game board.
 * @returns {number[]} An array of indices representing null (empty) cells.
 */
export const getNullIndices = (
	boardState: TTTModel.AppState['boardState']
): number[] => {
	return boardState.reduce(
		(
			indices: number[],
			value: TTTModel.PlayerSymbol | null,
			index: number
		) => {
			if (value === null) {
				indices.push(index);
			}
			return indices;
		},
		[]
	);
};

/**
 * Generates a random null index from the given board state.
 * @param boardState - The game board state.
 * @returns A random null index or null if none is available.
 */
export const getRandomNullIndex = (
	boardState: TTTModel.AppState['boardState']
): number | null => {
	const nullIndices = getNullIndices(boardState);

	if (nullIndices.length === 0) {
		return null;
	}

	const randomIndex = nullIndices[(Math.random() * nullIndices.length) << 0];
	return randomIndex;
};
