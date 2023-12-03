import React from 'react';
import { AppStore } from '@tic-tac-toe/core';
import { AppGameContent, AppState } from '@tic-tac-toe/model';
import { Grid, GridItem } from '../core';
import * as Hooks from '../hooks';
import {
	AppLogo,
	Cell,
	ReloadButton,
	ScoreBoardItem,
	TurnIndicator,
} from '../components';

interface Props {
	content: AppGameContent;
	useLandscapeDesign: boolean;
	handleReloadDialog: () => void;
}

export const GameScreen: React.FC<Props> = ({
	content,
	useLandscapeDesign,
	handleReloadDialog,
}) => {
	const [appState] = Hooks.useBehaviorSubjectState<AppState>(AppStore.state$);
	const { scores, playerSymbol, cpuSymbol, currentPlayer, solutionCells } =
		appState;

	return (
		<Grid
			cols={useLandscapeDesign ? 3 : 1}
			rowGap="l"
			colGap={useLandscapeDesign ? 'l' : 'm'}
		>
			<GridItem>
				<Grid
					colGap="m"
					rowGap="l"
					cols={useLandscapeDesign ? 1 : '1fr auto 1fr'}
				>
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
						<ReloadButton handleReloadDialog={handleReloadDialog} />
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
							disabled={
								appState.currentPlayer === appState.cpuSymbol
							}
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
