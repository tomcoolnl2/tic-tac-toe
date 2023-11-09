import { delay } from '../utils';
import { GameEngine } from './game-engine';
import { AppState, IntelligenceLevel, PlayerSymbol } from './model';
import { AppStore } from './store-manager';

/**
 * The AIEngine class is responsible for managing AI player behavior in the game.
 */
export class AIEngine {

    /**
     * Checks if the current player can win with their next move.
     * @param {AppState} appState - The current state of the game.
     * @returns {number} The cellIndex for winning on the next move, otherwise -1.
     */
    private isWinningNextMove(appState: AppState, player: PlayerSymbol): number {
        const { bitBoards, boardState } = appState;
        const playerBitboard = bitBoards[player];
        const nullIndices = AppStore.getNullIndices(boardState);
    
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
     * AI strategy for the Intelligence Level "BIEBER."
     * @param appState - The current application state.
     * @returns A number representing the selected index.
     */
    private [IntelligenceLevel.BIEBER](appState: AppState): number {
        return AppStore.getRandomNullIndex(appState.boardState) ?? 0;
    }

    // private calculateBestMove(appState: AppState): number {
    //     let bestMoveIndex = -1;
    //     let closestDistance = Infinity;
    
    //     const nullIndices = AppStore.getNullIndices(appState.boardState)

    //     for (const cellIndex of nullIndices) {
    //         // Clone the bitboard and set the bit for the current empty cell
    //         const cpuBitboard = appState.bitBoards[appState.cpuSymbol];
    //         const potentialBitboard = cpuBitboard | (1 << cellIndex);
    
    //         // Calculate the closest distance to any winning mask
    //         let minDistance = Infinity;
    //         for (const winningMask of solutionMasks) {
    //             const distance = calculateDistance(potentialBitboard, winningMask); // Custom function to calculate distance
    //             if (distance < minDistance) {
    //                 minDistance = distance;
    //             }
    //         }
    
    //         // Update the best move if the current move is closer to a winning mask
    //         if (minDistance < closestDistance) {
    //             closestDistance = minDistance;
    //             bestMoveIndex = cellIndex;
    //         }
    //     }
    
    //     return bestMoveIndex;
    // }
    
    /**
     * AI strategy for the Intelligence Level "NOVICE."
     * NOVICE will lookout for easy winning combinations 
     * and prevent the Player from winning if it is able on the next turn.
     * @param appState - The current application state.
     * @returns A Promise that resolves to void.
     */
    private [IntelligenceLevel.NOVICE](appState: AppState): number {
        let cellIndex = this.isWinningNextMove(appState, appState.playerSymbol);
        if (!~cellIndex) {
            cellIndex = AppStore.getRandomNullIndex(appState.boardState);
        }
        return cellIndex;
    }
    
    /**
     * AI strategy for the Intelligence Level "MASTER."
     * MASTER will actively block winning options for the Player
     * and actively play for winning its self
     * @param appState - The current application state.
     */
    private [IntelligenceLevel.MASTER](appState: AppState): number {
        
        let cellIndex: number;
        // check if AI can win
        cellIndex = this.isWinningNextMove(appState, appState.cpuSymbol);
        // if not, prevent human from winning
        if (!~cellIndex) {
            cellIndex = this.isWinningNextMove(appState, appState.playerSymbol);
        }
        // Choose a random next option
        // TODO Find the next best option, threaten to win
        if (!~cellIndex) {
            // cellIndex = this.calculateBestMove(appState);
            cellIndex = AppStore.getRandomNullIndex(appState.boardState);
        }
        
        return cellIndex;
    }

    /**
     * Updates the AI player's move based on the current application state.
     * @param appState - The current application state.
     * @returns A Promise that resolves to the selected index.
     */
    public async update(appState: AppState): Promise<number> {
        await delay(500);
        const index = this[appState.intelligenceLevel](appState) as number;
        return index;
    }
}
