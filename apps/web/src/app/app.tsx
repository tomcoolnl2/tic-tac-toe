import React from 'react';
import * as Rx from 'rxjs';
import {
	VITE_CF_SPACE_ID,
	VITE_CF_CONTENT_DELIVERY_API_ACCESS_TOKEN,
	VITE_CF_LOCALIZED_PROPERTIES_ID,
} from '@tic-tac-toe/constants';
import { isDevEnvironment } from '@tic-tac-toe/debug';
import { AppStore } from '@tic-tac-toe/core';
import * as TTTModel from '@tic-tac-toe/model';
import * as TTTUI from '@tic-tac-toe/ui';
import { AuthError, fetchUserName, login } from '../api/auth';

export const App: React.FC = () => {
	const [appContent, setAppContent] = React.useState<unknown>(null);
	const [userName, setUserName] = React.useState<string>('');
	const [authError, setAuthError] = React.useState<Error | null>(null);
	const orientation = TTTUI.Hooks.useScreenOrientation();

	const [appState] = TTTUI.Hooks.useBehaviorSubjectState<TTTModel.AppState>(
		AppStore.state$
	);

	const [userState] = TTTUI.Hooks.useBehaviorSubjectState<TTTModel.User>(
		AppStore.user$
	);

	React.useEffect(() => {
		fetchUserName().then((name) => {
			if (name instanceof AuthError) {
				setAuthError(name);
			}
			if (typeof name === 'string') {
				setUserName(name);
			}
		});
	}, []);

	React.useEffect(() => {
		if (isDevEnvironment()) {
			console.info('userState', userState);
			console.info('appState', appState);
		}
	}, [appState, userState]);

	// First we check if content is loaded,
	// Then we check if a user is not logged in
	React.useEffect(() => {
		let appScreen: TTTModel.AppScreen;
		if (appContent === null) {
			appScreen = TTTModel.AppScreen.LOADING;
		} else if (!userState.loggedIn) {
			appScreen = TTTModel.AppScreen.LOGIN;
		} else {
			appScreen = TTTModel.AppScreen.SETTINGS;
		}

		AppStore.nextState({
			...AppStore.initialState,
			appScreen,
			gameState: TTTModel.GameState.PREPLAY,
		});
	}, [appContent, userState]);

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

	const handleLoginSuccess = React.useCallback(() => {
		AppStore.nextState({
			...appState,
			appScreen: TTTModel.AppScreen.SETTINGS,
		});
	}, [appState]);

	const handleLogin = React.useCallback(
		(pwd: string) => {
			login(pwd, handleLoginSuccess).then((data) => {
				if (data instanceof AuthError) {
					setAuthError(data);
				}
			});
		},
		[handleLoginSuccess]
	);

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

	const useLandscapeDesign = React.useMemo(() => {
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

	React.useEffect(() => {
		const query = `
			query {
				localizedProperties(id: "${VITE_CF_LOCALIZED_PROPERTIES_ID}") {
					appTitle
				}
			}
		`;

		fetch(
			`https://graphql.contentful.com/content/v1/spaces/${VITE_CF_SPACE_ID}/`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${VITE_CF_CONTENT_DELIVERY_API_ACCESS_TOKEN}`,
				},
				body: JSON.stringify({ query }),
			}
		)
			.then((response) => response.json())
			.then(({ data, errors }) => {
				if (errors) {
					console.error(errors);
				} else {
					const { localizedProperties } = data;
					setAppContent(localizedProperties);
					document.title = localizedProperties.appTitle;
				}
			});
	}, []);

	return (
		<TTTUI.Theme>
			<div className={`screen ${appState.appScreen}`}>
				<div
					className={`screen-inner ${
						useLandscapeDesign ? 'landscape' : ''
					}`}
				>
					<TTTUI.ErrorBoundary fallback={<TTTUI.ErrorScreen />}>
						<div className="screen-front">
							{appState.appScreen ===
								TTTModel.AppScreen.LOADING && (
								<TTTUI.LoadingScreen />
							)}
							{appState.appScreen ===
								TTTModel.AppScreen.LOGIN && (
								<TTTUI.LoginScreen
									userName={userName}
									authError={authError}
									handleSubmit={handleLogin}
									setAuthError={setAuthError}
								/>
							)}
							{appState.appScreen ===
								TTTModel.AppScreen.SETTINGS && (
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
							)}
						</div>
						<div className="screen-back">
							<TTTUI.GameScreen
								handleReloadDialog={handleReloadDialog}
								useLandscapeDesign={useLandscapeDesign}
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
