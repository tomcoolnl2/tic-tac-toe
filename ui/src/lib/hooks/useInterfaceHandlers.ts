import React from 'react';
import * as Rx from 'rxjs';
import * as TTTModel from '@tic-tac-toe/model';
import { AppStore } from '@tic-tac-toe/core';
import useSound from 'use-sound';
import startGameSfx from '../sound/start.wav';
import { sleep } from '../utils';

export function useInterfaceHandlers(appState: TTTModel.AppState) {
	//
	const [playStartGameSfx] = useSound(startGameSfx);

	const openModalScreen = React.useCallback(
		(appModalScreen: TTTModel.AppModalScreen) => {
			AppStore.nextState({
				...appState,
				appModalScreen,
			});
		},
		[appState]
	);

	const closeModalScreen = React.useCallback(() => {
		AppStore.nextState({
			...appState,
			appModalScreen: null,
		});
	}, [appState]);

	const handleResetTimer = React.useCallback(async () => {
		AppStore.nextState({
			...appState,
			gameState: TTTModel.GameState.STOPPED,
		});
		// allow React to process these state changes
		await sleep(1);
	}, [appState]);

	const validateFirstTurn = React.useCallback((appState: TTTModel.AppState) => {
		let nextState = {};
		if (appState.playerSymbol === TTTModel.PlayerSymbol.O) {
			nextState = AppStore.gameEngine!.takeFirstTurn(appState);
		}
		return nextState;
	}, []);

	const handleStartGame = React.useCallback(() => {
		const nextState = validateFirstTurn(appState);
		AppStore.nextState({
			...appState,
			...nextState,
			appModalScreen: null,
			appScreen: TTTModel.AppScreen.GAME,
			gameState: TTTModel.GameState.PLAYING,
		});
		playStartGameSfx();
	}, [appState, playStartGameSfx, validateFirstTurn]);

	const handleResumeGame = React.useCallback(() => {
		AppStore.nextState({
			...appState,
			appModalScreen: null,
			gameState: TTTModel.GameState.PLAYING,
		});
	}, [appState]);

	const handlePauseGame = React.useCallback(
		(appModalScreen: TTTModel.AppModalScreen | null = null) => {
			AppStore.nextState({
				...appState,
				appModalScreen,
				gameState: TTTModel.GameState.PAUSED,
			});
		},
		[appState]
	);

	const handleQuitGame = React.useCallback(() => {
		AppStore.nextState({
			...AppStore.initialState,
			language: appState.language,
			appScreen: TTTModel.AppScreen.SETTINGS,
			gameState: TTTModel.GameState.STOPPED,
		});
	}, [appState.language]);

	const handleNextRound = React.useCallback(async () => {
		await handleResetTimer();
		const nextState = AppStore.getNextRoundGameState(appState);
		const updatedState = validateFirstTurn(nextState);
		AppStore.nextState({
			...nextState,
			...updatedState,
			gameState: TTTModel.GameState.PLAYING,
		});
	}, [appState, validateFirstTurn, handleResetTimer]);

	React.useEffect(() => {
		const keyDownHandler = Rx.fromEvent<KeyboardEvent>(document, 'keydown').pipe(
			Rx.filter((event) => event.key === 'Escape')
		);
		function closeModal() {
			const skip = [TTTModel.AppModalScreen.GAME_OVER, TTTModel.AppModalScreen.PAUSED];
			if (appState.appModalScreen && !skip.includes(appState.appModalScreen)) {
				closeModalScreen();
			}
		}
		const subscription = keyDownHandler.subscribe(closeModal);
		return () => {
			subscription.unsubscribe();
		};
	}, [appState.appModalScreen, closeModalScreen]);

	return {
		openModalScreen,
		closeModalScreen,
		handleStartGame,
		handlePauseGame,
		handleResumeGame,
		handleQuitGame,
		handleNextRound,
	};
}
