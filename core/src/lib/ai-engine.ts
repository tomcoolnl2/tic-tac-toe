import * as TTTModel from '@tic-tac-toe/model';
import { getNullIndices, getRandomNullIndex, sleep } from './utils';
import { GameEngine } from './game-engine';

/**
 * The AIEngine class is responsible for managing AI player behavior in the game.
 */
export class AIEngine {
	/**
	 * Checks if the current player can win with their next move.
	 * @param {AppState} appState - The current state of the game.
	 * * @param {PlayerSymbol} player - The player to see if it's score is a winning one on a next move
	 * @returns {number} The cellIndex for winning on the next move, otherwise -1.
	 */
	public getWinningNextMove(appState: TTTModel.AppState, player: TTTModel.PlayerSymbol): number {
		const { bitBoards, boardState } = appState;
		const playerBitboard = bitBoards[player];
		const nullIndices = getNullIndices(boardState);
		for (const cellIndex of nullIndices) {
			// Clone the bitboard and set the bit for the current empty cell
			const potentialBitboard = playerBitboard | (1 << cellIndex);
			// Check against every winning mask
			for (const winningMask of GameEngine.solutionMasks) {
				if ((potentialBitboard & winningMask) === winningMask) {
					return cellIndex;
				}
			}
		}
		return -1;
	}

	/**
	 * AI strategy for the Intelligence Level "EASY."
	 * It will randomly select a empty cell index for the next move.
	 * @param appState - The current application state.
	 * @returns A number representing the selected index or -1.
	 */
	private [TTTModel.IntelligenceLevel.EASY](appState: TTTModel.AppState): number {
		return getRandomNullIndex(appState.boardState);
	}

	/**
	 * Calculates the Hamming distance between two bitboards.
	 * The Hamming distance is the number of differing bits between two integers.
	 * @param {number} bitboardA - The first bitboard number.
	 * @param {number} bitboardB - The second bitboard number.
	 * @returns {number} The Hamming distance between the two bitboards.
	 */
	private calculateDistance(bitboardA: number, bitboardB: number): number {
		//
		let distance = 0;
		let diff = bitboardA ^ bitboardB; // XOR operation to identify differing bits

		while (diff) {
			distance += 1;
			diff &= diff - 1; // Clear the least significant bit set in the diff
		}

		return distance;
	}

	/**
	 * Calculates the best move index for the CPU player based on the closest distance
	 * to any winning mask on the game board.
	 * @param {TTTModel.AppState} appState - The current application state.
	 * @returns {number} The index representing the best move for the CPU player.
	 */
	private calculateBestMove(appState: TTTModel.AppState): number {
		//
		let bestMoveIndex = -1;
		let closestDistance = Infinity;

		const nullIndices = getNullIndices(appState.boardState);

		for (const cellIndex of nullIndices) {
			// Clone the bitboard and set the bit for the current empty cell
			const cpuBitboard = appState.bitBoards[appState.cpuSymbol];
			const potentialBitboard = cpuBitboard | (1 << cellIndex);

			// Calculate the closest distance to any winning mask
			let minDistance = Infinity;
			for (const winningMask of GameEngine.solutionMasks) {
				const distance = this.calculateDistance(potentialBitboard, winningMask);
				if (distance < minDistance) {
					minDistance = distance;
				}
			}

			// Update the best move if the current move is closer to a winning mask
			if (minDistance < closestDistance) {
				closestDistance = minDistance;
				bestMoveIndex = cellIndex;
			}
		}

		return bestMoveIndex;
	}

	/**
	 * AI strategy for the Intelligence Level "NOVICE."
	 * NOVICE will lookout for easy winning combinations
	 * and prevent the Player from winning on the next turn.
	 * @param appState - The current application state.
	 * @returns A number representing the selected index or -1.
	 */
	private [TTTModel.IntelligenceLevel.MEDIUM](appState: TTTModel.AppState): number {
		// check if AI can win
		let cellIndex = this.getWinningNextMove(appState, appState.cpuSymbol);
		// if not, prevent human from winning
		if (!~cellIndex) {
			cellIndex = this.getWinningNextMove(appState, appState.playerSymbol);
		}
		// Choose a random next option
		if (!~cellIndex) {
			cellIndex = getRandomNullIndex(appState.boardState);
		}
		return cellIndex;
	}

	/**
	 * AI strategy for the Intelligence Level "MASTER."
	 * MASTER will actively block winning options for the Player
	 * and actively play for winning its self
	 * @param appState - The current application state.
	 * @returns A number representing the selected index or -1.
	 */
	private [TTTModel.IntelligenceLevel.HARD](appState: TTTModel.AppState): number {
		// check if AI can win
		let cellIndex = this.getWinningNextMove(appState, appState.cpuSymbol);
		// if not, prevent human from winning
		if (!~cellIndex) {
			cellIndex = this.getWinningNextMove(appState, appState.playerSymbol);
		}
		// Choose a random next option
		// TODO choose the best next option
		if (!~cellIndex) {
			cellIndex = this.calculateBestMove(appState);
		}
		return cellIndex;
	}

	/**
	 * Updates the AI player's move based on the current application state.
	 * @param appState - The current application state.
	 * @returns A Promise that resolves to the selected index.
	 * @throws {Error} - Throws an error if no empty cell is available for the CPU's move.
	 */
	public async update(appState: TTTModel.AppState): Promise<number> {
		await sleep(500);
		const index = this[appState.intelligenceLevel](appState) as number;
		if (!~index) {
			throw new Error('Next move not possible.');
		}
		return index;
	}
}
