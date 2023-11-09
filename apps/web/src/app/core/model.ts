
export interface AppState {
    appScreen: AppScreen
    appModalScreen: AppModalScreen | null
    intelligenceLevel: IntelligenceLevel
    bitBoards: [number, number]
    boardState: BoardState
    currentPlayer: PlayerSymbol
    playerSymbol: PlayerSymbol
    cpuSymbol: PlayerSymbol
    gameState: GameState
    solutionCells: [number, number, number] | null
    scores: [number, number, number]
}

export enum AppScreen {
    SETTINGS = 'settings',
    GAME = 'game',
}

export enum AppModalScreen {
    GAME_OVER = 'game-over',
    RELOAD = 'reload',
}

export interface User {
    name: string;
    avatar: PlayerSymbol;
}

export enum PlayerSymbol { X, O }   

export enum IntelligenceLevel {
    BIEBER = 'bieber',
    NOVICE = 'novice',
    MASTER = 'master',
}

export enum GameState {
    PREPLAY,
    PLAYING,
    WIN,
    LOST,
    DRAW,
}

export type BoardState = Array<PlayerSymbol | null>;

export interface LoggerState {
    appState: AppState;
    dec: number[];
    hex: string[];
    bin: string[];
}