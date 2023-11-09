import React from 'react';
import * as Rx from 'rxjs';
import * as ArenaUI from '@tic-tac-toe/ui';
import { isDevEnvironment } from '@tic-tac-toe/debug';
import { AppStore } from './core/store-manager';
import {
	ErrorScreen,
	GameScreen,
	SettingsScreen,
	ReloadModalScreen,
	GameOverModalScreen,
} from './screens';
import {
	AppModalScreen,
	AppScreen,
	AppState,
	GameState,
	IntelligenceLevel,
	PlayerSymbol,
} from './core/model';
import { Modal } from './components';

export const App: React.FC = () => {
	const [appState] = ArenaUI.Hooks.useBehaviorSubjectState<AppState>(
		AppStore.state$
	);
	const orientation = ArenaUI.Hooks.useScreenOrientation();

	React.useEffect(() => {
		isDevEnvironment() && console.log('appState', appState);
	}, [appState]);

	const handleStartGame = React.useCallback(() => {
		// when player chooses ) it means the CPU should make the first move
		// TODO move into GameEngine in it's own method
		let updatedAppState = {};
		if (appState.playerSymbol === PlayerSymbol.O) {
			updatedAppState = AppStore.gameEngine.takeFirstTurn({
				...appState,
			});
		}
		AppStore.nextState({
			...appState,
			...updatedAppState,
			appScreen: AppScreen.GAME,
			gameState: GameState.PLAYING,
		});
	}, [appState]);

	const handleRestartGame = React.useCallback(() => {
		AppStore.nextState(AppStore.initialState);
	}, []);

	const handleReloadDialog = React.useCallback(() => {
		AppStore.nextState({
			...appState,
			appModalScreen: AppModalScreen.RELOAD,
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
				intelligenceLevel: value as IntelligenceLevel,
			});
		},
		[appState]
	);

	const closeModalScreen = React.useCallback(() => {
		AppStore.nextState({ ...appState, appModalScreen: null });
	}, [appState]);

	const useLanscapeDesign = React.useMemo(() => {
		return orientation?.startsWith('landscape') && 'ontouchstart' in window;
	}, [orientation]);

	const closeModalValidator = React.useCallback(() => {
		if (appState.appModalScreen !== AppModalScreen.GAME_OVER) {
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
		<>
			<div className={`screen ${appState.appScreen}`}>
				<div
					className={`screen-inner ${
						useLanscapeDesign ? 'landscape' : ''
					}`}
				>
					<ArenaUI.ErrorBoundary fallback={<ErrorScreen />}>
						<div className="screen-front">
							<SettingsScreen
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
							<GameScreen
								handleReloadDialog={handleReloadDialog}
								useLanscapeDesign={useLanscapeDesign}
							/>
						</div>
					</ArenaUI.ErrorBoundary>
				</div>
			</div>
			{appState.appModalScreen !== null && (
				<Modal>
					{appState.appModalScreen === AppModalScreen.RELOAD && (
						<ReloadModalScreen
							handleRestartGame={handleRestartGame}
							closeModalScreen={closeModalScreen}
						/>
					)}
					{appState.appModalScreen === AppModalScreen.GAME_OVER && (
						<GameOverModalScreen
							gameState={appState.gameState}
							playerSymbol={appState.playerSymbol}
							cpuSymbol={appState.cpuSymbol}
							handleRestartGame={handleRestartGame}
							handleNextRound={handleNextRound}
						/>
					)}
				</Modal>
			)}
		</>
	);
};
