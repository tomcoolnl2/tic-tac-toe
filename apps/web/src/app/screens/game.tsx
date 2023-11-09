import React from 'react';
import * as ArenaUI from '@tic-tac-toe/ui';
import { AppState } from '../core/model';
import { AppStore } from '../core/store-manager';
import {
	AppLogo,
	Cell,
	ReloadButton,
	ScoreBoardItem,
	TurnIndicator,
} from '../components';

interface Props {
	useLanscapeDesign: boolean;
	handleReloadDialog: () => void;
}

export const GameScreen: React.FC<Props> = ({
	useLanscapeDesign,
	handleReloadDialog,
}) => {
	const [appState] = ArenaUI.Hooks.useBehaviorSubjectState<AppState>(
		AppStore.state$
	);
	const { scores, playerSymbol, cpuSymbol, currentPlayer, solutionCells } =
		appState;

	return (
		<ArenaUI.Grid
			cols={useLanscapeDesign ? 3 : 1}
			rowGap="l"
			colGap={useLanscapeDesign ? 'l' : 'm'}
		>
			<ArenaUI.GridItem>
				<ArenaUI.Grid
					colGap="m"
					rowGap="l"
					cols={useLanscapeDesign ? 1 : '1fr auto 1fr'}
				>
					<ArenaUI.GridItem>
						<AppLogo />
					</ArenaUI.GridItem>
					<ArenaUI.GridItem>
						<TurnIndicator
							playerSymbol={playerSymbol}
							currentPlayer={currentPlayer}
						/>
					</ArenaUI.GridItem>
					<ArenaUI.GridItem placeSelf="flex-end">
						<ReloadButton handleReloadDialog={handleReloadDialog} />
					</ArenaUI.GridItem>
				</ArenaUI.Grid>
			</ArenaUI.GridItem>
			<ArenaUI.GridItem>
				<ArenaUI.Grid cols={3} colGap="m" rowGap="m" className="board">
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
				</ArenaUI.Grid>
			</ArenaUI.GridItem>
			<ArenaUI.GridItem>
				<ArenaUI.Grid
					cols={useLanscapeDesign ? 1 : 3}
					colGap="m"
					rowGap="m"
				>
					{scores.map((score, i) => {
						return (
							<ScoreBoardItem
								key={i}
								score={score}
								index={i}
								playerSymbol={playerSymbol}
								cpuSymbol={cpuSymbol}
							/>
						);
					})}
				</ArenaUI.Grid>
			</ArenaUI.GridItem>
		</ArenaUI.Grid>
	);
};
