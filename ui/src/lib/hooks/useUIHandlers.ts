import React from 'react';
import * as TTTModel from '@tic-tac-toe/model';
import { AppStore } from '@tic-tac-toe/core';

export function useUIHandlers(appState: TTTModel.AppState) {
	const openRestartModal = React.useCallback(() => {
		AppStore.nextState({
			...appState,
			appModalScreen: TTTModel.AppModalScreen.RESTART,
		});
	}, [appState]);

	const closeModalScreen = React.useCallback(() => {
		AppStore.nextState({
			...appState,
			appModalScreen: null,
		});
	}, [appState]);

	const validateCloseModal = React.useCallback(() => {
		if (appState.appModalScreen !== TTTModel.AppModalScreen.GAME_OVER) {
			closeModalScreen();
		}
	}, [appState, closeModalScreen]);

	return {
		openRestartModal,
		closeModalScreen,
		validateCloseModal,
	};
}
