import { AppModalScreen, AppState, GameState, PlayerSymbol } from './model';
import { AppStore } from './store-manager';

/**
 * The GameEngine class is responsible for managing the game logic.
 */
export class GameEngine {

    // Constants representing winning combinations and a draw mask
    public static solutionMasks = [0x1c0, 0x038, 0x007, 0x124, 0x092, 0x049, 0x111, 0x054];
    private readonly drawMask = 0x1ff; // 511


    public takeFirstTurn(state: AppState): AppState {
        const nullIndex = AppStore.getRandomNullIndex(state.boardState);
        state.boardState[nullIndex] = state.cpuSymbol;
        this.update(state, nullIndex)
        return state;
    }
    /**
     * Gets an array of winning cell indices based on a winning mask.
     * @param winningMask - The winning mask representing a winning combination.
     * @returns An array of winning cell indices.
     */
    public getWinningCells(winningMask: number): number[] {
        return Array.from({ length: 9 }, (_, i) => i).filter(i => Boolean(winningMask & (1 << i)));
    }

    /**
     * Determines the winner of the game based on the current state.
     * @param state - The current game state.
     * @returns The player symbol of the winner or null if there is no winner yet.
     */
    public determineWinner(state: AppState): PlayerSymbol | null {
        const { bitBoards, currentPlayer } = state;
        return GameEngine.solutionMasks.find(mask => (bitBoards[currentPlayer] & mask) === mask) ?? null;
    }

    /**
     * Determines if the game has ended in a draw.
     * @param state - The current game state.
     * @returns True if the game is a draw, false otherwise.
     */
    public determineDraw(state: AppState): boolean {
        const [score1, score2] = state.bitBoards;
        return (score1 | score2) === this.drawMask;
    }

    /**
     * Updates the game state based on the player's move.
     * @param state - The current game state.
     * @param cellIndex - The index of the selected cell.
     * @returns The updated game state.
     */
    public update(state: AppState, cellIndex: number): AppState {
        const mask = 1 << cellIndex;
        const [scoreX, scoreO] = state.bitBoards;

        if (!((scoreX | scoreO) & mask)) {
            state.bitBoards[state.currentPlayer] |= mask;
            state.boardState[cellIndex] = state.currentPlayer;

            const winningMask = this.determineWinner(state);
            if (winningMask !== null) {
                if (state.currentPlayer === state.playerSymbol) {
                    state.gameState = GameState.WIN;
                    state.scores[0] += 1;
                } else {
                    state.gameState = GameState.LOST;
                    state.scores[2] += 1;
                }
                state.appModalScreen = AppModalScreen.GAME_OVER;
                state.solutionCells = this.getWinningCells(winningMask) as AppState['solutionCells'];
            } else if (this.determineDraw(state)) {
                state.gameState = GameState.DRAW;
                state.scores[1] += 1;
                state.appModalScreen = AppModalScreen.GAME_OVER;
            } else {
                state.currentPlayer ^= 1 as PlayerSymbol;
            }
        }

        return state;
    }
}
