import React from 'react';
import { generateClient } from 'aws-amplify/api';
import { AppStore, useBehaviorSubjectState } from '@tic-tac-toe/core';
import { PlayerSymbol as ModelPlayerSymbol } from '@tic-tac-toe/model';
import { saveNewGame as saveNewGameMutation } from '../graphql/mutations';
import { listSaveGames as listSaveGamesQuery } from '../graphql/queries';
import { type SaveGameInput, PlayerSymbol as GeneratedPlayerSymbol } from '../graphql/api';

export interface UseSaveGameManager {
	processing: boolean;
	saveGames: SaveGameInput[];
	listSaveGames: () => Promise<void>;
	addSaveGame: () => Promise<void>;
	deleteSaveGame: () => Promise<void>;
	snapshotSaveGame: () => void;
}

const client = generateClient();

export function useSaveGameManager(): UseSaveGameManager {
	//
	const [appState] = useBehaviorSubjectState(AppStore.state$);
	const [saveGames, setSaveGames] = React.useState<SaveGameInput[]>([]);
	const [processing, setProcessing] = React.useState<boolean>(false);

	const convertSaveGameFromAppState = (symbol: ModelPlayerSymbol): GeneratedPlayerSymbol => {
		switch (symbol) {
			case ModelPlayerSymbol.X:
				return GeneratedPlayerSymbol.X;
			case ModelPlayerSymbol.O:
				return GeneratedPlayerSymbol.O;
			default:
				return GeneratedPlayerSymbol.X;
		}
	};

	const snapshotSaveGame = React.useCallback(() => {
		//
		const { intelligenceLevel, boardState, bitBoards, scores, muted } = appState;
		let { playerSymbol, cpuSymbol } = appState;

		playerSymbol = convertSaveGameFromAppState(playerSymbol as ModelPlayerSymbol);
		cpuSymbol = convertSaveGameFromAppState(cpuSymbol as ModelPlayerSymbol);

		const convertedBoardState = boardState.map((symbol) =>
			symbol === null ? symbol : convertSaveGameFromAppState(symbol)
		);

		console.log({
			intelligenceLevel,
			bitBoards,
			boardState: convertedBoardState,
			playerSymbol,
			cpuSymbol,
			scores,
			muted,
		});
		return {
			intelligenceLevel,
			bitBoards,
			boardState: convertedBoardState,
			playerSymbol,
			cpuSymbol,
			scores,
			muted,
		};
	}, [appState]);

	const listSaveGames = React.useCallback(async () => {
		setProcessing(true);
		try {
			const listSaveGamesData = await client.graphql({
				query: listSaveGamesQuery,
			});
			console.log('listSaveGamesData', listSaveGamesData);
			const saves = listSaveGamesData.data.listSaveGames;
			setSaveGames(saves);
		} catch (err) {
			console.log('error fetching listSaveGamesData');
		} finally {
			setProcessing(false);
		}
	}, []);

	const addSaveGame = React.useCallback(async () => {
		setProcessing(true);
		try {
			const input = snapshotSaveGame();
			await client.graphql({
				query: saveNewGameMutation,
				variables: { input },
			});
			const saveGames = await listSaveGames();
			console.log('saveGames', saveGames);
		} catch (err) {
			console.log('error creating saveGame:', err);
		} finally {
			setProcessing(false);
		}
	}, [listSaveGames, snapshotSaveGame]);

	const deleteSaveGame = React.useCallback(async () => {
		setProcessing(true);
		console.log('TODO: delete a Save Game');
		setProcessing(false);
	}, []);

	return {
		processing,
		saveGames,
		snapshotSaveGame,
		listSaveGames,
		addSaveGame,
		deleteSaveGame,
	};
}
