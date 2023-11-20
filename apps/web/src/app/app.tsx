import React from 'react';
import * as Rx from 'rxjs';
import { AppStore } from '@tic-tac-toe/core';
import * as TTTModel from '@tic-tac-toe/model';

import * as TTTUI from '@tic-tac-toe/ui';

import { isDevEnvironment } from '@tic-tac-toe/debug';

export const App: React.FC = () => {
	const [appState] = TTTUI.Hooks.useBehaviorSubjectState<TTTModel.AppState>(
		AppStore.state$
	);
	const orientation = TTTUI.Hooks.useScreenOrientation();

	React.useEffect(() => {
		isDevEnvironment() && console.log('appState', appState);
	}, [appState]);

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
		AppStore.nextState(AppStore.initialState);
	}, []);

	const handleReloadDialog = React.useCallback(() => {
		AppStore.nextState({
			...appState,
			appModalScreen: TTTModel.AppModalScreen.RELOAD,
		});
	}, [appState]);

	const handleNextRound = React.useCallback(() => {
		const nextState = AppStore.getNextGameState(appState);
		AppStore.nextState(nextState);
	}, [appState]);

	const handleSymbolChoiceChange = React.useCallback(
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

	const handleDifficultySettingsChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = (event.target as HTMLInputElement).value;
			AppStore.nextState({
				...appState,
				intelligenceLevel: value as TTTModel.IntelligenceLevel,
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

	const useLanscapeDesign = React.useMemo(() => {
		return orientation?.startsWith('landscape') && 'ontouchstart' in window;
	}, [orientation]);

	const closeModalValidator = React.useCallback(() => {
		if (appState.appModalScreen !== TTTModel.AppModalScreen.GAME_OVER) {
			closeModalScreen();
		}
	}, [appState, closeModalScreen]);

	React.useEffect(() => {
		const keyDownHandler = Rx.fromEvent<KeyboardEvent>(
			document,
			'keydown'
		).pipe(Rx.filter((event) => event.key === 'Escape'));

		const subscription = keyDownHandler.subscribe(closeModalValidator);

		return () => {
			subscription.unsubscribe();
		};
	}, [closeModalValidator]);

	return (
		<TTTUI.Theme>
			<div className={`screen ${appState.appScreen}`}>
				<div
					className={`screen-inner ${
						useLanscapeDesign ? 'landscape' : ''
					}`}
				>
					<TTTUI.ErrorBoundary fallback={<TTTUI.ErrorScreen />}>
						<div className="screen-front">
							<TTTUI.SettingsScreen
								playerSymbol={appState.playerSymbol}
								selectedDifficultySetting={
									appState.intelligenceLevel
								}
								handleDifficultySettingsChange={
									handleDifficultySettingsChange
								}
								handleSymbolChoiceChange={
									handleSymbolChoiceChange
								}
								handleStartGame={handleStartGame}
							/>
						</div>
						<div className="screen-back">
							<TTTUI.GameScreen
								handleReloadDialog={handleReloadDialog}
								useLanscapeDesign={useLanscapeDesign}
							/>
						</div>
					</TTTUI.ErrorBoundary>
				</div>
			</div>
			{appState.appModalScreen !== null && (
				<TTTUI.Modal>
					{appState.appModalScreen ===
						TTTModel.AppModalScreen.RELOAD && (
						<TTTUI.ReloadModalScreen
							handleRestartGame={handleRestartGame}
							closeModalScreen={closeModalScreen}
						/>
					)}
					{appState.appModalScreen ===
						TTTModel.AppModalScreen.GAME_OVER && (
						<TTTUI.GameOverModalScreen
							gameState={appState.gameState}
							playerSymbol={appState.playerSymbol}
							cpuSymbol={appState.cpuSymbol}
							handleRestartGame={handleRestartGame}
							handleNextRound={handleNextRound}
						/>
					)}
				</TTTUI.Modal>
			)}
		</TTTUI.Theme>
	);
};
