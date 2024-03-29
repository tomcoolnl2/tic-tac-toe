import React from 'react';
import * as TTTModel from '@tic-tac-toe/model';
import { AppStore } from '@tic-tac-toe/core';
import { useContentContext } from '@tic-tac-toe/content';

interface UseSettingsHandlers {
	handleAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleDifficultyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleLanguageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useSettingsHandlers(appState: TTTModel.AppState): UseSettingsHandlers {
	//
	const { setLanguage } = useContentContext();

	const handleAvatarChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = +(event.target as HTMLInputElement).checked;
			AppStore.nextState({
				...appState,
				playerSymbol: value,
				cpuSymbol: value ^ 1,
			});
		},
		[appState]
	);

	const handleDifficultyChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			AppStore.nextState({
				...appState,
				intelligenceLevel: value as TTTModel.IntelligenceLevel,
			});
		},
		[appState]
	);

	const handleLanguageChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const language = event.target.value as TTTModel.Locale;
			setLanguage(language);
			AppStore.nextState({ ...appState, language });
		},
		[appState, setLanguage]
	);

	return {
		handleAvatarChange,
		handleDifficultyChange,
		handleLanguageChange,
	};
}
