/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type SaveGameInput = {
	intelligenceLevel: IntelligenceLevel;
	bitBoards: Array<number>;
	boardState: Array<PlayerSymbol | null>;
	currentPlayer: PlayerSymbol;
	playerSymbol: PlayerSymbol;
	cpuSymbol: PlayerSymbol;
	scores: Array<number>;
	muted: boolean;
};

export enum IntelligenceLevel {
	EASY = 'EASY',
	MEDIUM = 'MEDIUM',
	HARD = 'HARD',
}

export enum PlayerSymbol {
	X = 'X',
	O = 'O',
}

export type SaveGame = {
	__typename: 'SaveGame';
	id: string;
	intelligenceLevel: IntelligenceLevel;
	bitBoards: Array<number>;
	boardState: Array<PlayerSymbol | null>;
	currentPlayer: PlayerSymbol;
	playerSymbol: PlayerSymbol;
	cpuSymbol: PlayerSymbol;
	scores: Array<number>;
	muted: boolean;
};

export type SaveNewGameMutationVariables = {
	input: SaveGameInput;
};

export type SaveNewGameMutation = {
	saveNewGame?: {
		__typename: 'SaveGame';
		id: string;
		intelligenceLevel: IntelligenceLevel;
		bitBoards: Array<number>;
		boardState: Array<PlayerSymbol | null>;
		currentPlayer: PlayerSymbol;
		playerSymbol: PlayerSymbol;
		cpuSymbol: PlayerSymbol;
		scores: Array<number>;
		muted: boolean;
	} | null;
};

export type GetSaveGameQueryVariables = {
	id: string;
};

export type GetSaveGameQuery = {
	getSaveGame?: {
		__typename: 'SaveGame';
		id: string;
		intelligenceLevel: IntelligenceLevel;
		bitBoards: Array<number>;
		boardState: Array<PlayerSymbol | null>;
		currentPlayer: PlayerSymbol;
		playerSymbol: PlayerSymbol;
		cpuSymbol: PlayerSymbol;
		scores: Array<number>;
		muted: boolean;
	} | null;
};

export type ListSaveGamesQueryVariables = {};

export type ListSaveGamesQuery = {
	listSaveGames: Array<{
		__typename: 'SaveGame';
		id: string;
		intelligenceLevel: IntelligenceLevel;
		bitBoards: Array<number>;
		boardState: Array<PlayerSymbol | null>;
		currentPlayer: PlayerSymbol;
		playerSymbol: PlayerSymbol;
		cpuSymbol: PlayerSymbol;
		scores: Array<number>;
		muted: boolean;
	}>;
};
