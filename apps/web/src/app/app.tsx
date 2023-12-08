import React from 'react';
import * as Rx from 'rxjs';
import { AppStore } from '@tic-tac-toe/core';
import { isDevEnvironment } from '@tic-tac-toe/debug';
import * as TTTModel from '@tic-tac-toe/model';
import * as TTTUI from '@tic-tac-toe/ui';

export const App: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const theme = React.useMemo(() => (window as any)?.electron?.theme ?? 'desktop', []);

	const [userName, setUserName] = React.useState<string>('');
	const [authError, setAuthError] = React.useState<Error | null>(null);

	const { useAuthContext, useContentContext } = TTTUI.Context;
	const { useBehaviorSubjectState, useScreenOrientation, useGameHandlers, useUIHandlers } =
		TTTUI.Hooks;

	const [appState] = useBehaviorSubjectState<TTTModel.AppState>(AppStore.state$);
	const [userState] = useBehaviorSubjectState<TTTModel.User>(AppStore.user$);

	const orientation = useScreenOrientation();
	const { fetchUserName, login, logout } = useAuthContext();
	const { appContent, isContentLoading, setLanguage } = useContentContext();
	const { handleQuitGame, handleNextRound } = useGameHandlers(appState, userState);
	const { openRestartModal, closeModalScreen, validateCloseModal } = useUIHandlers(appState);

	React.useEffect(() => {
		fetchUserName().then((name) => {
			name instanceof TTTUI.Error.AuthError
				? setAuthError(name)
				: setUserName(name as string);
		});
	}, [fetchUserName]);

	React.useEffect(() => {
		if (isDevEnvironment()) {
			console.info('appContent', appContent);
		}
		if (appContent) {
			document.title = appContent.appTitle;
		}
		if (appState.language) {
			setLanguage(appState.language);
		}
	}, [appContent, appState.language, setLanguage]);

	React.useEffect(() => {
		if (isDevEnvironment()) {
			console.info('userState', userState);
			console.info('appState', appState);
		}
	}, [appState, userState, setLanguage]);

	// First we check if content is loaded,
	// Then we check if a user is not logged in
	React.useEffect(() => {
		let appScreen: TTTModel.AppScreen;
		if (isContentLoading) {
			appScreen = TTTModel.AppScreen.LOADING;
		} else if (!userState.loggedIn) {
			appScreen = TTTModel.AppScreen.LOGIN;
		} else {
			appScreen = TTTModel.AppScreen.SETTINGS;
		}

		AppStore.nextState({
			...AppStore.initialState,
			appScreen,
			language: appState.language,
			gameState: TTTModel.GameState.PREPLAY,
		});
	}, [isContentLoading, userState, appState.language]);

	const handleLogin = React.useCallback(
		async (pwd: string) => {
			const data = await login(pwd);
			if (data instanceof TTTUI.Error.AuthError) {
				setAuthError(data);
			} else {
				AppStore.nextUserState(data);
				AppStore.nextState({
					...appState,
					appScreen: TTTModel.AppScreen.SETTINGS,
				});
			}
		},
		[appState, login]
	);

	const handleLogout = React.useCallback(async () => {
		const data = await logout();
		AppStore.nextUserState(data);
		AppStore.nextState({
			...appState,
			appScreen: TTTModel.AppScreen.SETTINGS,
		});
	}, [appState, logout]);

	const useLandscapeDesign = React.useMemo(() => {
		return orientation?.startsWith('landscape') && 'ontouchstart' in window;
	}, [orientation]);

	React.useEffect(() => {
		const keyDownHandler = Rx.fromEvent<KeyboardEvent>(document, 'keydown').pipe(
			Rx.filter((event) => event.key === 'Escape')
		);

		const subscription = keyDownHandler.subscribe(validateCloseModal);

		return () => {
			subscription.unsubscribe();
		};
	}, [validateCloseModal]);

	return (
		<TTTUI.Theme theme={theme}>
			<div className={`screen ${appState.appScreen}`}>
				<div className={`screen-inner ${useLandscapeDesign ? 'landscape' : ''}`}>
					<TTTUI.Error.ErrorBoundary fallback={<TTTUI.ErrorScreen />}>
						<div className="screen-front">
							{appState.appScreen === TTTModel.AppScreen.LOADING && (
								<TTTUI.LoadingScreen />
							)}
							{appContent && appState.appScreen === TTTModel.AppScreen.LOGIN && (
								<TTTUI.LoginScreen
									content={appContent.loginScreen}
									userName={userName}
									authError={authError}
									handleSubmit={handleLogin}
									setAuthError={setAuthError}
								/>
							)}
							{appContent && appState.appScreen === TTTModel.AppScreen.SETTINGS && (
								<TTTUI.SettingsScreen
									content={appContent.settingsScreen}
									playerSymbol={appState.playerSymbol}
									selectedDifficultySetting={appState.intelligenceLevel}
									handleLogout={handleLogout}
								/>
							)}
						</div>
						<div className="screen-back">
							{appContent && (
								<TTTUI.GameScreen
									content={appContent.gameScreen}
									openRestartModal={openRestartModal}
									useLandscapeDesign={useLandscapeDesign}
								/>
							)}
						</div>
					</TTTUI.Error.ErrorBoundary>
				</div>
			</div>
			{appContent && appState.appModalScreen !== null && (
				<TTTUI.Modal>
					{appState.appModalScreen === TTTModel.AppModalScreen.RELOAD && (
						<TTTUI.ReloadModalScreen
							content={appContent.restartModal}
							handleQuitGame={handleQuitGame}
							closeModalScreen={closeModalScreen}
						/>
					)}
					{appState.appModalScreen === TTTModel.AppModalScreen.GAME_OVER && (
						<TTTUI.GameOverModalScreen
							content={appContent.gameOverModal}
							gameState={appState.gameState}
							playerSymbol={appState.playerSymbol}
							cpuSymbol={appState.cpuSymbol}
							handleQuitGame={handleQuitGame}
							handleNextRound={handleNextRound}
						/>
					)}
				</TTTUI.Modal>
			)}
		</TTTUI.Theme>
	);
};
