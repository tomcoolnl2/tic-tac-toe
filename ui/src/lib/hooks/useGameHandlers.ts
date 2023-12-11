import React from 'react';
import * as TTTModel from '@tic-tac-toe/model';
import { AppStore } from '@tic-tac-toe/core';

export function useGameHandlers(appState: TTTModel.AppState, userState: TTTModel.User) {
	const validateFirstTurn = React.useCallback((appState: TTTModel.AppState) => {
		let nextState = {};
		if (appState.playerSymbol === TTTModel.PlayerSymbol.O) {
			nextState = AppStore.gameEngine!.takeFirstTurn({
				...appState,
			});
		}
		return nextState;
	}, []);

	const handleStartGame = React.useCallback(() => {
		// when player chooses O it means the CPU should make the first move
		const nextState = validateFirstTurn(appState);
		AppStore.nextState({
			...appState,
			...nextState,
			appScreen: TTTModel.AppScreen.GAME,
			gameState: TTTModel.GameState.PLAYING,
		});
	}, [appState, validateFirstTurn]);

	const handleQuitGame = React.useCallback(() => {
		const appScreen = userState.loggedIn
			? TTTModel.AppScreen.SETTINGS
			: TTTModel.AppScreen.LOGIN;
		AppStore.nextState({
			...AppStore.initialState,
			language: appState.language,
			appScreen,
		});
	}, [appState.language, userState]);

	const handleNextRound = React.useCallback(() => {
		const nextState = AppStore.getNextRoundGameState(appState);
		const updatedState = validateFirstTurn(nextState);
		AppStore.nextState({ ...nextState, ...updatedState });
	}, [appState, validateFirstTurn]);

	return {
		handleStartGame,
		handleQuitGame,
		handleNextRound,
	};
}
