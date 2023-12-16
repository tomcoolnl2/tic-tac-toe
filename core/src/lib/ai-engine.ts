import * as TTTModel from '@tic-tac-toe/model';
import { getNullIndices, getRandomNullIndex, sleep } from './utils';
import { GameEngine } from './game-engine';

/**
 * The AIEngine class is responsible for managing AI player behavior in the game.
 */
export class AIEngine {
	//
	private moveHistory: { symbol: TTTModel.PlayerSymbol }[] = [];

	/**
	 * Checks if the current player can win with their next move.
	 * @param {AppState} appState - The current state of the game.
	 * @param {PlayerSymbol} player - The player to see if it's score is a winning one on a next move
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
		let bestMoveIndex = -1;
		let closestDistance = Infinity;
		const nullIndices = getNullIndices(appState.boardState);
		for (const cellIndex of nullIndices) {
			const cpuBitboard = appState.bitBoards[appState.cpuSymbol];
			const potentialBitboard = cpuBitboard | (1 << cellIndex);
			const evaluation = this.evaluateMove(appState, potentialBitboard, cellIndex);
			if (evaluation < closestDistance) {
				closestDistance = evaluation;
				bestMoveIndex = cellIndex;
			}
		}
		return bestMoveIndex;
	}

	/**
	 * Calculates the distance to the closest winning mask for the given potential bitboard.
	 * @param {number} potentialBitboard - The potential bitboard configuration to evaluate.
	 * @returns {number} The distance to the closest winning mask.
	 */
	private calculateDistanceToWinningMasks(potentialBitboard: number): number {
		let distance = Infinity;
		for (const winningMask of GameEngine.solutionMasks) {
			const currentDistance = this.calculateDistance(potentialBitboard, winningMask);
			if (currentDistance < distance) {
				distance = currentDistance;
			}
		}
		return distance; // Return the calculated distance
	}

	/**
	 * Evaluates a potential move based on various strategic aspects and game state.
	 * @param {TTTModel.AppState} appState - The current state of the game.
	 * @param {number} potentialBitboard - The potential bitboard configuration for the move.
	 * @param {number} cellIndex - The index of the cell for the potential move.
	 * @returns {number} The evaluation score for the potential move.
	 */
	private evaluateMove(appState: TTTModel.AppState, potentialBitboard: number, cellIndex: number): number {
		//
		const distanceToWinningMasks = this.calculateDistanceToWinningMasks(potentialBitboard);
		let strategicEvaluation = 0;

		const playerWinningMoveIndex = this.getWinningNextMove(appState, appState.playerSymbol);
		if (playerWinningMoveIndex === cellIndex) {
			strategicEvaluation += 100; // Prioritize blocking player's winning move
		}

		// 1. Occupying Key Positions
		const corners = [0, 2, 6, 8];
		const edges = [1, 3, 5, 7];
		if (corners.includes(cellIndex)) {
			strategicEvaluation += 50; // Adjust score for occupying corners
		} else if (edges.includes(cellIndex)) {
			strategicEvaluation += 30; // Adjust score for occupying edges
		}

		// 2. Future Move Assessment (Example: prioritizing the center)
		if (cellIndex === 4) {
			strategicEvaluation += 20; // Prioritize the center for future moves
		}

		// 3. Pattern Recognition (Example: prioritize if two marks are in a row)
		const cpuBitboard = appState.bitBoards[appState.cpuSymbol];
		for (const mask of GameEngine.solutionMasks) {
			if ((cpuBitboard & mask) === mask && mask & (1 << cellIndex)) {
				strategicEvaluation += 40; // Adjust score based on recognized patterns
				break;
			}
		}

		// 4. Vulnerability Assessment (penalize potential losing moves)
		const opponentWinningMoveIndex = this.getWinningNextMove(appState, appState.playerSymbol);
		if (opponentWinningMoveIndex === cellIndex) {
			strategicEvaluation -= 30; // Adjust score based on identified vulnerabilities
		}

		// 5. Adaptive Strategy (Example: adjust based on previous opponent's moves)
		const previousOpponentMoves = this.moveHistory.filter((move) => move.symbol === appState.playerSymbol);
		if (previousOpponentMoves.length > 0) {
			// Adjust score based on opponent's tendencies
			strategicEvaluation += 10;
		}

		const finalEvaluation = distanceToWinningMasks + strategicEvaluation;

		return finalEvaluation; // Return the evaluated score for the move
	}
	/**
	 * AI strategy for the Intelligence Level "MEDIUM".
	 * MEDIUM will lookout for easy winning combinations
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
	 * AI strategy for the Intelligence Level "HARD".
	 * HARD will actively block winning options for the Player
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
		this.moveHistory.push({ symbol: appState.currentPlayer });
		return index;
	}
}
