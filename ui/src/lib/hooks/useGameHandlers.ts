import React from 'react';
import * as TTTModel from '@tic-tac-toe/model';
import { AppStore } from '@tic-tac-toe/core';

export function useGameHandlers(appState: TTTModel.AppState) {
	const handleStartGame = React.useCallback(() => {
		// when player chooses O it means the CPU should make the first move
		let updatedAppState = {};
		if (appState.playerSymbol === TTTModel.PlayerSymbol.O) {
			updatedAppState = AppStore.gameEngine!.takeFirstTurn({
				...appState,
			});
		}
		AppStore.nextState({
			...appState,
			...updatedAppState,
			appScreen: TTTModel.AppScreen.GAME,
			gameState: TTTModel.GameState.PLAYING,
		});
	}, [appState]);

	const handleRestartGame = React.useCallback(() => {
		AppStore.nextState({
			...AppStore.initialState,
			language: appState.language,
			appScreen: TTTModel.AppScreen.SETTINGS,
		});
	}, [appState.language]);

	const handleNextRound = React.useCallback(() => {
		const nextState = AppStore.getNextGameState(appState);
		AppStore.nextState(nextState);
	}, [appState]);

	return {
		handleStartGame,
		handleRestartGame,
		handleNextRound,
	};
}
