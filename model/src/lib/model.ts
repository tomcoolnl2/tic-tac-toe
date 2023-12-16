export interface AppState {
	language: Locale;
	appScreen: AppScreen;
	appScreenSide: AppScreenAnimation | null;
	appModalScreen: AppModalScreen | null;
	muted: boolean;
	intelligenceLevel: IntelligenceLevel;
	bitBoards: [number, number];
	boardState: BoardState;
	currentPlayer: PlayerSymbol;
	playerSymbol: PlayerSymbol;
	cpuSymbol: PlayerSymbol;
	gameStatus: GameStatus;
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

export enum AppScreenAnimation {
	FORWARD = 'flipForward',
	BACKWARD = 'flipBackward',
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

export enum GameStatus {
	STOPPED = 'stopped',
	PLAYING = 'playing',
	PAUSED = 'paused',
	WIN = 'win',
	LOST = 'lost',
	DRAW = 'draw',
}

export type GameDuration = `${number}${number}:${number}${number}`;

export enum TimerStatus {
	RUNNING = 'running',
	STOPPED = 'stopped',
	DANGER = 'danger',
	RUNOUT = 'runout',
}

export type BoardState = Array<PlayerSymbol | null>;

export interface LoggerState {
	appState: AppState;
	dec: number[];
	hex: string[];
	bin: string[];
}
