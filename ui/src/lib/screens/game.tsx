import React from 'react';
import { AppStore } from '@tic-tac-toe/core';
import type { AppState } from '@tic-tac-toe/model';
import type { AppGameContent } from '../context/content/model';
import { Divider, Grid, GridItem } from '../core';
import { AppLogo, Cell, Difficulty, Icon, ScoreBoardItem, Timer } from '../components';
import { useBehaviorSubjectState } from '../hooks';

interface Props {
	content: AppGameContent;
	landscape: boolean;
	handlePauseGame: () => void;
	openRestartModal: () => void;
}

export const GameScreen: React.FC<Props> = ({
	content,
	landscape,
	handlePauseGame,
	openRestartModal,
}) => {
	const [appState] = useBehaviorSubjectState<AppState>(AppStore.state$);
	const { scores, playerSymbol, cpuSymbol, solutionCells, intelligenceLevel } = appState;

	return (
		<Grid cols={landscape ? 3 : 1} rowGap="l" colGap={landscape ? 'l' : 'm'}>
			<GridItem>
				<Grid colGap="m" rowGap="l" cols={landscape ? 1 : '1fr auto 1fr'}>
					<GridItem>
						<AppLogo />
					</GridItem>
					<GridItem>
						<Difficulty intelligenceLevel={intelligenceLevel} />
						<Divider margin="bottom-s" />
						<Timer />
					</GridItem>
					<GridItem placeSelf="flex-end">
						<div className="game-controls">
							<Icon name="icon-pause" handleOnClick={handlePauseGame} />
							<Icon name="icon-repeat" handleOnClick={openRestartModal} />
						</div>
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
};
