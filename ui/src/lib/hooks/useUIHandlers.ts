import React from 'react';
import * as TTTModel from '@tic-tac-toe/model';
import { AppStore } from '@tic-tac-toe/core';

export function useUIHandlers(appState: TTTModel.AppState) {
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

	const validateCloseModal = React.useCallback(() => {
		const skip = [TTTModel.AppModalScreen.GAME_OVER, TTTModel.AppModalScreen.PAUSED];
		if (appState.appModalScreen && !skip.includes(appState.appModalScreen)) {
			closeModalScreen();
		}
	}, [appState, closeModalScreen]);

	return {
		openModalScreen,
		closeModalScreen,
		validateCloseModal,
	};
}
