import classNames from 'classnames';
import React from 'react';
import { signIn, signOut, getCurrentUser } from 'aws-amplify/auth';
import { AppStore } from '@tic-tac-toe/core';
import { isDevEnvironment } from '@tic-tac-toe/debug';
import * as TTTModel from '@tic-tac-toe/model';
import * as TTTUI from '@tic-tac-toe/ui';

export const App: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const theme = React.useMemo(() => (window as any)?.electron?.theme ?? 'web', []);

	const [isSignedIn, setIsSignedIn] = React.useState<boolean>(false);
	const [authError, setAuthError] = React.useState<Error | null>(null);

	const { useContentContext } = TTTUI.Context;
	const { useBehaviorSubjectState, useScreenOrientation, useInterfaceHandlers } = TTTUI.Hooks;

	const { appContent, isContentLoading, setLanguage } = useContentContext();
	const [appState] = useBehaviorSubjectState<TTTModel.AppState>(AppStore.state$);
	const { handlePauseGame, handleResumeGame, handleQuitGame, handleNextRound } =
		useInterfaceHandlers(appState);

	const orientation = useScreenOrientation();
	const landscape = React.useMemo(() => {
		return orientation?.startsWith('landscape') && 'ontouchstart' in window;
	}, [orientation]);

	React.useEffect(() => {
		(async () => {
			try {
				const currentUser = await getCurrentUser();
				console.log(`currentUser: `, currentUser);
				setIsSignedIn(true);
			} catch (err) {
				setIsSignedIn(false);
			}
		})();
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
			console.info('appState', appState);
		}
	}, [appState]);

	React.useEffect(() => {
		let appScreen: TTTModel.AppScreen;
		if (isContentLoading) {
			appScreen = TTTModel.AppScreen.LOADING;
		} else if (!isSignedIn) {
			appScreen = TTTModel.AppScreen.LOGIN;
		} else {
			appScreen = TTTModel.AppScreen.SETTINGS;
		}
		AppStore.nextState({
			...AppStore.initialState,
			appScreen,
			language: appState.language,
			gameState: TTTModel.GameState.PAUSED,
		});
	}, [isContentLoading, isSignedIn, appState.language]);

	const handleSignIn = React.useCallback(async (username: string, password: string) => {
		try {
			const { isSignedIn } = await signIn({ username, password });
			if (isSignedIn) {
				setIsSignedIn(isSignedIn);
			} else {
				throw new Error('Error signing in');
			}
		} catch (error: unknown) {
			const authError = error instanceof Error ? error : new Error('');
			setAuthError(authError);
			setIsSignedIn(false);
		}
	}, []);

	const handleSignOut = React.useCallback(async () => {
		try {
			await signOut();
		} catch (error) {
			const authError = error instanceof Error ? error : new Error('Error signing out');
			setAuthError(authError);
			console.log('Error signing out: ', error);
		}
		setIsSignedIn(false);
	}, []);

	return (
		<TTTUI.Theme theme={theme}>
			<div className={`screen ${appState.appScreen}`}>
				<div className={classNames('screen-inner', { landscape })}>
					<TTTUI.Error.ErrorBoundary fallback={<TTTUI.ErrorScreen />}>
						<div className="screen-front">
							{appState.appScreen === TTTModel.AppScreen.LOADING && (
								<TTTUI.LoadingScreen />
							)}
							{appContent && appState.appScreen === TTTModel.AppScreen.LOGIN && (
								<TTTUI.LoginScreen
									content={appContent.loginScreen}
									authError={authError}
									handleSubmit={handleSignIn}
									setAuthError={setAuthError}
								/>
							)}
							{appContent && appState.appScreen === TTTModel.AppScreen.SETTINGS && (
								<TTTUI.SettingsScreen
									content={appContent.settingsScreen}
									playerSymbol={appState.playerSymbol}
									selectedDifficultySetting={appState.intelligenceLevel}
									handleLogout={handleSignOut}
								/>
							)}
						</div>
						<div className="screen-back">
							{appContent && (
								<TTTUI.GameScreen
									content={appContent.gameScreen}
									landscape={landscape}
									handlePauseGame={() =>
										handlePauseGame(TTTModel.AppModalScreen.PAUSED)
									}
									openRestartModal={() =>
										handlePauseGame(TTTModel.AppModalScreen.RESTART)
									}
								/>
							)}
						</div>
					</TTTUI.Error.ErrorBoundary>
				</div>
			</div>
			{appContent && appState.appModalScreen !== null && (
				<TTTUI.Modal>
					{appState.appModalScreen === TTTModel.AppModalScreen.PAUSED && (
						<TTTUI.ResumeModalScreen
							content={appContent.resumeGameModal}
							handleResumeGame={handleResumeGame}
						/>
					)}
					{appState.appModalScreen === TTTModel.AppModalScreen.RESTART && (
						<TTTUI.RestartModalScreen
							content={appContent.restartModal}
							handleQuitGame={handleQuitGame}
							handleResumeGame={handleResumeGame}
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
