import React from 'react';
import * as Rx from 'rxjs';
import { isDevEnvironment } from '@tic-tac-toe/debug';
import { AppStore } from '@tic-tac-toe/core';
import * as TTTModel from '@tic-tac-toe/model';
import * as TTTUI from '@tic-tac-toe/ui';
import { AuthError, fetchUserName, login } from '../api/auth';

export const App: React.FC = () => {
	const [userName, setUserName] = React.useState<string>('');
	const [authError, setAuthError] = React.useState<Error | null>(null);
	const theme = React.useMemo(() => (window as any)?.electron?.theme ?? 'web', []);

	const { useBehaviorSubjectState, useScreenOrientation, useGameHandlers, useUIHandlers } =
		TTTUI.Hooks;

	const [appState] = useBehaviorSubjectState<TTTModel.AppState>(AppStore.state$);
	const [userState] = useBehaviorSubjectState<TTTModel.User>(AppStore.user$);

	const orientation = useScreenOrientation();
	const { appContent, isContentLoading, setLanguage } = TTTUI.Context.useContentContext();
	const { handleQuitGame, handleNextRound } = useGameHandlers(appState, userState);
	const { openRestartModal, closeModalScreen, validateCloseModal } = useUIHandlers(appState);

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

	const handleLoginSuccess = React.useCallback(
		(user: TTTModel.User) => {
			AppStore.nextUserState(user);
			AppStore.nextState({
				...appState,
				appScreen: TTTModel.AppScreen.SETTINGS,
			});
		},
		[appState]
	);

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

	const handleLogout = React.useCallback(() => {
		AppStore.nextUserState({
			...userState,
			loggedIn: false,
		});
		AppStore.nextState({
			...appState,
			appScreen: TTTModel.AppScreen.SETTINGS,
		});
	}, [appState, userState]);

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
					<TTTUI.ErrorBoundary fallback={<TTTUI.ErrorScreen />}>
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
					</TTTUI.ErrorBoundary>
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
