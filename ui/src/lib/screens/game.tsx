import React from 'react';
import useSound from 'use-sound';
import { AppStore, useBehaviorSubjectState } from '@tic-tac-toe/core';
import { AppModalScreen, type AppState } from '@tic-tac-toe/model';
import { AppGameContent } from '@tic-tac-toe/content';
import { Divider, FlexBox, Grid, GridItem } from '../core';
import { AppLogo, Cell, Difficulty, Icon, ScoreBoardItem, Timer } from '../components';
import { useInterfaceHandlers } from '../hooks';
import turnSfx from '../sound/turn.wav';

interface Props {
	content: AppGameContent;
	landscape: boolean;
}

export const GameScreen: React.FC<Props> = React.memo(({ content, landscape }) => {
	//
	const [appState] = useBehaviorSubjectState<AppState>(AppStore.state$);
	const { handlePauseGame, forceGameOver } = useInterfaceHandlers();
	const [playTurnSfx] = useSound(turnSfx);

	const { scores, playerSymbol, cpuSymbol, solutionCells, intelligenceLevel, muted } = React.useMemo(
		() => appState,
		[appState]
	);

	const pauseGame = React.useCallback(() => {
		handlePauseGame(AppModalScreen.PAUSED);
	}, [handlePauseGame]);

	const openRestartModal = React.useCallback(() => {
		handlePauseGame(AppModalScreen.RESTART);
	}, [handlePauseGame]);

	return (
		<Grid cols={landscape ? 3 : 1} rowGap="l" colGap={landscape ? 'l' : 'm'}>
			<GridItem>
				<Grid colGap="m" rowGap="l" cols={landscape ? 1 : '1fr auto 1fr'}>
					<GridItem>
						<AppLogo />
					</GridItem>
					<GridItem>
						<Difficulty intelligenceLevel={intelligenceLevel} />
						<Divider margin="bottom" />
						<Timer forceGameOver={forceGameOver} />
					</GridItem>
					<GridItem>
						<FlexBox className="game-controls" justifyContent="flex-end">
							<Icon name="icon-pause" handleOnClick={pauseGame} testId="pause-icon" />
							<Icon name="icon-repeat" handleOnClick={openRestartModal} testId="restart-icon" />
						</FlexBox>
					</GridItem>
				</Grid>
			</GridItem>
			<GridItem>
				<Grid cols={3} colGap="m" rowGap="m" className="board">
					{appState.boardState.map((type, i) => (
						<Cell
							key={i}
							index={i}
							type={type}
							solutionCells={solutionCells}
							disabled={appState.currentPlayer === appState.cpuSymbol}
							muted={muted}
							playTurnSfx={playTurnSfx}
						/>
					))}
				</Grid>
			</GridItem>
			<GridItem>
				<Grid cols={landscape ? 1 : 3} colGap="m" rowGap="m">
					{scores.map((score, i) => {
						return (
							<ScoreBoardItem
								key={i}
								content={content.scoreBoard}
								score={score}
								index={i}
								playerSymbol={playerSymbol}
								cpuSymbol={cpuSymbol}
							/>
						);
					})}
				</Grid>
			</GridItem>
		</Grid>
	);
});
