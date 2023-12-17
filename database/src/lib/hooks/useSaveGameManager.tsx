import React from 'react';
import { generateClient } from 'aws-amplify/api';
import { AppStore, useBehaviorSubjectState } from '@tic-tac-toe/core';
import { saveNewGame as saveNewGameMutation } from '../graphql/mutations';
import { listSaveGames as listSaveGamesQuery } from '../graphql/queries';
import type { SaveGame, SaveGameInput } from '../graphql/api';

export interface UseSaveGameManager {
	processing: boolean;
	listSaveGames: () => Promise<void>;
	addSaveGame: () => Promise<void>;
	deleteSaveGame: () => Promise<void>;
	formatSaveGameFromAppState: () => void;
}

const initialState = AppStore.initialSaveGameState as SaveGameInput;
const client = generateClient();

export function useSaveGameManager(): UseSaveGameManager {
	//
	const [appState] = useBehaviorSubjectState(AppStore.state$);
	const [saveGame, setSaveGame] = React.useState<SaveGameInput>(initialState);
	const [saveGames, setSaveGames] = React.useState<SaveGame[] | SaveGameInput[]>([]);
	const [processing, setProcessing] = React.useState<boolean>(false);

	const listSaveGames = React.useCallback(async () => {
		setProcessing(true);
		try {
			const listSaveGamesData = await client.graphql({
				query: listSaveGamesQuery,
			});
			console.log('listSaveGamesData', listSaveGamesData);
			// const saves = listSaveGamesData.data.listSaveGames;
			// setSaveGames(saves);
		} catch (err) {
			console.log('error fetching todos');
		} finally {
			setProcessing(false);
		}
	}, []);

	const addSaveGame = React.useCallback(async () => {
		setProcessing(true);
		try {
			const input = { ...saveGame };
			setSaveGames([...saveGames, input]);
			setSaveGame(initialState);
			await client.graphql({
				query: saveNewGameMutation,
				variables: { input },
			});
		} catch (err) {
			console.log('error creating saveGame:', err);
		} finally {
			setProcessing(false);
		}
	}, [saveGame, saveGames]);

	const deleteSaveGame = React.useCallback(async () => {
		setProcessing(true);
		console.log('TODO: delete a Save Game');
		setProcessing(false);
	}, []);

	const formatSaveGameFromAppState = React.useCallback(() => {
		const {
			gameStatus,
			intelligenceLevel,
			bitBoards,
			boardState,
			currentPlayer,
			playerSymbol,
			cpuSymbol,
			scores,
			solutionCells,
			muted,
		} = appState;

		return {
			gameStatus,
			intelligenceLevel,
			bitBoards,
			boardState,
			currentPlayer,
			playerSymbol,
			cpuSymbol,
			scores,
			solutionCells,
			muted,
		} as SaveGameInput;
	}, [appState]);

	return {
		processing,
		listSaveGames,
		addSaveGame,
		deleteSaveGame,
		formatSaveGameFromAppState,
	};
}
