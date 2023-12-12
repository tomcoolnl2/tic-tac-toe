import React from 'react';
import { AppStore } from '@tic-tac-toe/core';
import type { AppState } from '@tic-tac-toe/model';
import type { AppGameContent } from '../context/content/model';
import { Grid, GridItem } from '../core';
import { AppLogo, Cell, Icon, ScoreBoardItem, TurnIndicator } from '../components';
import { useBehaviorSubjectState } from '../hooks';

interface Props {
	content: AppGameContent;
	useLandscapeDesign: boolean;
	openRestartModal: () => void;
}

export const GameScreen: React.FC<Props> = ({ content, useLandscapeDesign, openRestartModal }) => {
	const [appState] = useBehaviorSubjectState<AppState>(AppStore.state$);
	const { scores, playerSymbol, cpuSymbol, currentPlayer, solutionCells } = appState;

	return (
		<Grid cols={useLandscapeDesign ? 3 : 1} rowGap="l" colGap={useLandscapeDesign ? 'l' : 'm'}>
			<GridItem>
				<Grid colGap="m" rowGap="l" cols={useLandscapeDesign ? 1 : '1fr auto 1fr'}>
					<GridItem>
						<AppLogo />
					</GridItem>
					<GridItem>
						<TurnIndicator
							content={content.turnIndicator}
							playerSymbol={playerSymbol}
							currentPlayer={currentPlayer}
						/>
					</GridItem>
					<GridItem placeSelf="flex-end">
						<div className="game-controls">
							{/* <Icon name="icon-pause" /> */}
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
				<Grid cols={useLandscapeDesign ? 1 : 3} colGap="m" rowGap="m">
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
