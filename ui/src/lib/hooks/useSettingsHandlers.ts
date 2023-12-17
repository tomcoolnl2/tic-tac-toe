import React from 'react';
import * as TTTModel from '@tic-tac-toe/model';
import { AppStore, useBehaviorSubjectState } from '@tic-tac-toe/core';
import { useContentContext } from '../context';

interface UseSettingsHandlers {
	handleAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleDifficultyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleLanguageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Custom hook for managing settings-related event handlers and state changes.
 * @returns Object containing handlers for avatar, difficulty, and language changes.
 */
export function useSettingsHandlers(): UseSettingsHandlers {
	// Get application state and content context
	const [appState] = useBehaviorSubjectState(AppStore.state$);
	const { setLanguage } = useContentContext();

	/**
	 * Handles the change event for the avatar selection.
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input element.
	 */
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

	/**
	 * Handles the change event for the difficulty selection.
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input element.
	 */
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

	/**
	 * Handles the change event for the language selection.
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input element.
	 */
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
