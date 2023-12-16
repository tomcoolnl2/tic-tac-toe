import React from 'react';
import * as Rx from 'rxjs';
import * as TTTModel from '@tic-tac-toe/model';
import { AppStore } from '@tic-tac-toe/core';
import useSound from 'use-sound';
import startGameSfx from '../sound/start.wav';
import { sleep } from '../utils';

export interface UseInterfaceHandlers {
	flipScreenSide: React.AnimationEventHandler;
	openModalScreen: (appModalScreen: TTTModel.AppModalScreen) => void;
	closeModalScreen: () => void;
	handleNextScreen: (appScreen: TTTModel.AppScreen) => void;
	handleStartGame: () => void;
	handlePauseGame: (appModalScreen: TTTModel.AppModalScreen | null) => void;
	handleResumeGame: () => void;
	handleQuitGame: () => void;
	handleNextRound: () => void;
}

/**
 * Event handlers for interface interactions
 *
 * @param {TTTModel.AppState} appState - The current application state
 * @returns {UseInterfaceHandlers} - Returns a set of event handlers for use in React components
 */
export function useInterfaceHandlers(appState: TTTModel.AppState): UseInterfaceHandlers {
	//
	const [playStartGameSfx] = useSound(startGameSfx);

	/**
	 * Tests the animationName, and when the Settings Screen is set,
	 * the Game State is reset to defaults
	 * @param {React.AnimationEvent} event - The animation event
	 */
	const flipScreenSide = React.useCallback(
		({ animationName }: React.AnimationEvent) => {
			if (animationName === TTTModel.AppScreenAnimation.BACKWARD) {
				const { language, appScreen } = appState;
				AppStore.nextState({
					...AppStore.initialState,
					appScreenSide: animationName,
					gameState: TTTModel.GameState.STOPPED,
					language,
					appScreen,
				});
			}
		},
		[appState]
	);

	/**
	 * Opens a modal screen.
	 * @param {TTTModel.AppModalScreen} appModalScreen - The modal screen to open
	 */
	const openModalScreen = React.useCallback(
		(appModalScreen: TTTModel.AppModalScreen) => {
			AppStore.nextState({
				...appState,
				appModalScreen,
			});
		},
		[appState]
	);

	/**
	 * Closes the modal screen.
	 */
	const closeModalScreen = React.useCallback(() => {
		AppStore.nextState({
			...appState,
			appModalScreen: null,
		});
	}, [appState]);

	/**
	 * Handles transitioning to the next screen.
	 * @param {TTTModel.AppScreen} appScreen - The next app screen to transition to
	 */
	const handleNextScreen = React.useCallback(
		(appScreen: TTTModel.AppScreen) => {
			AppStore.nextState({
				...AppStore.initialState,
				appScreen,
				language: appState.language,
				gameState: TTTModel.GameState.PAUSED,
			});
		},
		[appState.language]
	);

	/**
	 * Resets the timer by changeing the gameState to STOPPED
	 */
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

	/**
	 * Starts the game.
	 */
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

	/**
	 * Resumes the game.
	 */
	const handleResumeGame = React.useCallback(() => {
		AppStore.nextState({
			...appState,
			appModalScreen: null,
			gameState: TTTModel.GameState.PLAYING,
		});
	}, [appState]);

	/**
	 * Pauses the game.
	 * @param {TTTModel.AppModalScreen | null} appModalScreen - The modal screen to open (optional)
	 */
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

	/**
	 * Quits the game.
	 * Initiates the transition by setting the app screen to 'settings'.
	 * With the animationEnd event being monitored, the board will remain in the
	 * 'playing' state until it completely disappears, rather than instantly resetting.
	 */
	const handleQuitGame = React.useCallback(() => {
		AppStore.nextState({
			...appState,
			appModalScreen: null,
			appScreen: TTTModel.AppScreen.SETTINGS,
		});
	}, [appState]);

	/**
	 * Handles transitioning to the next round.
	 */
	const handleNextRound = React.useCallback(async () => {
		await handleResetTimer();
		playStartGameSfx();
		const nextState = AppStore.getNextRoundGameState(appState);
		const updatedState = validateFirstTurn(nextState);
		AppStore.nextState({
			...nextState,
			...updatedState,
			gameState: TTTModel.GameState.PLAYING,
		});
	}, [handleResetTimer, playStartGameSfx, appState, validateFirstTurn]);

	/**
	 * Handles the 'Escape' key event to close modals.
	 */
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
		flipScreenSide,
		openModalScreen,
		closeModalScreen,
		handleNextScreen,
		handleStartGame,
		handlePauseGame,
		handleResumeGame,
		handleQuitGame,
		handleNextRound,
	};
}
