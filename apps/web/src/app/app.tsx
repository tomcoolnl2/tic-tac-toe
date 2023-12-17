import classNames from 'classnames';
import React from 'react';
import { AppStore, useBehaviorSubjectState } from '@tic-tac-toe/core';
import { isDevEnvironment } from '@tic-tac-toe/debug';
import { useAuthContext } from '@tic-tac-toe/auth';
import { useContentContext } from '@tic-tac-toe/content';
import * as TTTModel from '@tic-tac-toe/model';
import * as TTTUI from '@tic-tac-toe/ui';

export const App: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const theme = React.useMemo(() => (window as any)?.electron?.theme ?? 'web', []);

	const { useScreenOrientation, useInterfaceHandlers } = TTTUI.Hooks;
	const { signedIn, authError, handleSignIn, handleSignOut, setAuthError } = useAuthContext();
	const { appContent, isContentLoading, setLanguage } = useContentContext();
	const [appState] = useBehaviorSubjectState<TTTModel.AppState>(AppStore.state$);
	const { flipScreenSide, handleResumeGame, handleQuitGame, handleNextRound, handleNextScreen } =
		useInterfaceHandlers();

	const orientation = useScreenOrientation();
	const landscape = React.useMemo(() => {
		return orientation?.startsWith('landscape') && 'ontouchstart' in window;
	}, [orientation]);

	React.useEffect(() => {
		if (isDevEnvironment()) {
			console.info('appContent', appContent);
			console.info('appState', appState);
		}
		if (appContent) {
			document.title = appContent.appTitle;
		}
		if (appState.language) {
			setLanguage(appState.language);
		}
	}, [appContent, appState, setLanguage]);

	React.useEffect(() => {
		let appScreen: TTTModel.AppScreen;
		if (isContentLoading) {
			appScreen = TTTModel.AppScreen.LOADING;
		} else if (!signedIn) {
			appScreen = TTTModel.AppScreen.LOGIN;
		} else {
			appScreen = TTTModel.AppScreen.SETTINGS;
		}
		handleNextScreen(appScreen);
	}, [isContentLoading, signedIn]);

	return (
		<TTTUI.Theme theme={theme}>
			<div className={`screen ${appState.appScreen}`}>
				{/* <TTTUI.Button onClick={handleAddSaveGame}>Save Game</TTTUI.Button> */}
				<div className={classNames('screen-inner', { landscape })} onAnimationEnd={flipScreenSide}>
					<TTTUI.Error.ErrorBoundary fallback={<TTTUI.ErrorScreen />}>
						<div className="screen-front">
							{appState.appScreen === TTTModel.AppScreen.LOADING && <TTTUI.LoadingScreen />}
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
							{appContent && <TTTUI.GameScreen content={appContent.gameScreen} landscape={landscape} />}
						</div>
					</TTTUI.Error.ErrorBoundary>
				</div>
			</div>
			{appContent && appState.appModalScreen !== null && (
				<TTTUI.Modal>
					{appState.appModalScreen === TTTModel.AppModalScreen.PAUSED && (
						<TTTUI.PausedModalScreen content={appContent.resumeGameModal} />
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
							gameStatus={appState.gameStatus}
							playerSymbol={appState.playerSymbol}
							cpuSymbol={appState.cpuSymbol}
							muted={appState.muted}
							handleQuitGame={handleQuitGame}
							handleNextRound={handleNextRound}
						/>
					)}
				</TTTUI.Modal>
			)}
		</TTTUI.Theme>
	);
};
