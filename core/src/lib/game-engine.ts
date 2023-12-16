import * as TTTModel from '@tic-tac-toe/model';
import { getRandomNullIndex } from './utils';

/**
 * The GameEngine class is responsible for managing the game logic.
 */
export class GameEngine {
	//
	// Constants representing winning combinations and a draw mask
	public static solutionMasks = [0x1c0, 0x038, 0x007, 0x124, 0x092, 0x049, 0x111, 0x054];
	// 511
	private readonly drawMask = 0x1ff;

	/**
	 * Takes the first turn for the CPU in the game.
	 * Randomly selects an empty cell on the board and assigns it as the CPU's move.
	 * If no empty cell is available, throws an error indicating an impossible next move.
	 * @param {TTTModel.AppState} state - The current application state.
	 * @returns {TTTModel.AppState} - The updated application state after the CPU's first move.
	 * @throws {Error} - Throws an error if no empty cell is available for the CPU's move.
	 */
	public takeFirstTurn(state: TTTModel.AppState): TTTModel.AppState {
		const nullIndex = getRandomNullIndex(state.boardState);
		if (~nullIndex) {
			state.boardState[nullIndex] = state.cpuSymbol;
			this.update(state, nullIndex);
		} else {
			throw new Error('Next move not possible.');
		}
		return state;
	}

	/**
	 * Gets an array of winning cell indices based on a winning mask.
	 * @param winningMask - The winning mask representing a winning combination.
	 * @returns An array of winning cell indices.
	 */
	public getWinningCells(winningMask: number): number[] {
		return Array.from({ length: 9 }, (_, i) => i).filter((i) => {
			Boolean(winningMask & (1 << i));
		});
	}

	/**
	 * Determines the winner of the game based on the current state.
	 * @param state - The current game state.
	 * @returns The player symbol of the winner or null if there is no winner yet.
	 */
	public determineWinner(state: TTTModel.AppState): TTTModel.PlayerSymbol | null {
		const { bitBoards, currentPlayer } = state;
		return (
			GameEngine.solutionMasks.find((mask) => {
				return (bitBoards[currentPlayer] & mask) === mask;
			}) ?? null
		);
	}

	/**
	 * Determines if the game has ended in a draw.
	 * @param state - The current game state.
	 * @returns True if the game is a draw, false otherwise.
	 */
	public determineDraw(state: TTTModel.AppState): boolean {
		const [score1, score2] = state.bitBoards;
		return (score1 | score2) === this.drawMask;
	}

	/**
	 * Updates the game state based on the player's move.
	 * @param state - The current game state.
	 * @param cellIndex - The index of the selected cell.
	 * @returns The updated game state.
	 */
	public update(state: TTTModel.AppState, cellIndex: number): TTTModel.AppState {
		const mask = 1 << cellIndex;
		const [scoreX, scoreO] = state.bitBoards;

		if (!((scoreX | scoreO) & mask)) {
			state.bitBoards[state.currentPlayer] |= mask;
			state.boardState[cellIndex] = state.currentPlayer;

			const winningMask = this.determineWinner(state);
			if (winningMask !== null) {
				if (state.currentPlayer === state.playerSymbol) {
					state.gameState = TTTModel.GameState.WIN;
					state.scores[0] += 1;
				} else {
					state.gameState = TTTModel.GameState.LOST;
					state.scores[2] += 1;
				}
				state.appModalScreen = TTTModel.AppModalScreen.GAME_OVER;
				state.solutionCells = this.getWinningCells(
					winningMask
				) as TTTModel.AppState['solutionCells'];
			} else if (this.determineDraw(state)) {
				state.gameState = TTTModel.GameState.DRAW;
				state.scores[1] += 1;
				state.appModalScreen = TTTModel.AppModalScreen.GAME_OVER;
			} else {
				state.currentPlayer ^= 1 as TTTModel.PlayerSymbol;
			}
		}

		return state;
	}
}
