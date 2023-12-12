export interface AppState {
	language: Locale;
	appScreen: AppScreen;
	appModalScreen: AppModalScreen | null;
	intelligenceLevel: IntelligenceLevel;
	bitBoards: [number, number];
	boardState: BoardState;
	currentPlayer: PlayerSymbol;
	playerSymbol: PlayerSymbol;
	cpuSymbol: PlayerSymbol;
	gameState: GameState;
	solutionCells: [number, number, number] | null;
	scores: [number, number, number];
}

export enum Locale {
	EN = 'en-US',
	中文 = 'zh-CN',
}
export enum AppScreen {
	LOADING = 'loading',
	LOGIN = 'login',
	SETTINGS = 'settings',
	GAME = 'game',
}

export enum AppModalScreen {
	PAUSED = 'paused',
	GAME_OVER = 'game-over',
	RESTART = 'restart',
}

export enum PlayerSymbol {
	X,
	O,
}

export enum IntelligenceLevel {
	EASY = 'EASY',
	MEDIUM = 'MEDIUM',
	HARD = 'HARD',
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
