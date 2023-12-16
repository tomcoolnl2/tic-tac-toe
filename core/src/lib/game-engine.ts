import * as TTTModel from '@tic-tac-toe/model';
import { getRandomNullIndex } from './utils';

/**
 * The GameEngine class is responsible for managing the game logic.
 */
export class GameEngine {
	/**
	 * Constants representing winning combinations.
	 * Each element in the array represents a winning combination on the game board.
	 */
	public static solutionMasks = [0x1c0, 0x038, 0x007, 0x124, 0x092, 0x049, 0x111, 0x054];

	/**
	 * Represents the number 511, used as a draw mask.
	 * This mask indicates a completely filled game board with no winner.
	 * It helps identify a drawn game situation.
	 */
	private readonly drawMask = 0x1ff;

	/**
	 * Takes the first turn for the CPU in the game.
	 * Randomly selects an empty cell on the board and assigns it as the CPU's move.
	 * If no empty cell is available, throws an error indicating an impossible next move.
	 * @param {TTTModel.AppState} appState - The current application state.
	 * @returns {TTTModel.AppState} - The updated application state after the CPU's first move.
	 * @throws {Error} - Throws an error if no empty cell is available for the CPU's move.
	 */
	public takeFirstTurn(appState: TTTModel.AppState): TTTModel.AppState {
		const nullIndex = getRandomNullIndex(appState.boardState);
		if (~nullIndex) {
			appState.boardState[nullIndex] = appState.cpuSymbol;
			this.update(appState, nullIndex);
		} else {
			throw new Error('Next move not possible.');
		}
		return appState;
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
	 * @param appState - The current game state.
	 * @returns True if the game is a draw, false otherwise.
	 */
	public determineDraw(appState: TTTModel.AppState): boolean {
		const [score1, score2] = appState.bitBoards;
		return (score1 | score2) === this.drawMask;
	}

	/**
	 * Updates the application state based on a move by either the player or the AI.
	 * @param appState - The current application state.
	 * @param cellIndex - The index of the selected cell.
	 * @returns The updated application state.
	 */
	public update(appState: TTTModel.AppState, cellIndex: number): TTTModel.AppState {
		//
		const mask = 1 << cellIndex;
		const [scoreX, scoreO] = appState.bitBoards;

		if (!((scoreX | scoreO) & mask)) {
			appState.bitBoards[appState.currentPlayer] |= mask;
			appState.boardState[cellIndex] = appState.currentPlayer;

			const winningMask = this.determineWinner(appState);
			if (winningMask !== null) {
				if (appState.currentPlayer === appState.playerSymbol) {
					appState.gameStatus = TTTModel.GameStatus.WIN;
					appState.scores[0] += 1;
				} else {
					appState.gameStatus = TTTModel.GameStatus.LOST;
					appState.scores[2] += 1;
				}
				appState.appModalScreen = TTTModel.AppModalScreen.GAME_OVER;
				appState.solutionCells = this.getWinningCells(
					winningMask
				) as TTTModel.AppState['solutionCells'];
			} else if (this.determineDraw(appState)) {
				appState.gameStatus = TTTModel.GameStatus.DRAW;
				appState.scores[1] += 1;
				appState.appModalScreen = TTTModel.AppModalScreen.GAME_OVER;
			} else {
				appState.currentPlayer ^= 1 as TTTModel.PlayerSymbol;
			}
		}

		return appState;
	}
}
