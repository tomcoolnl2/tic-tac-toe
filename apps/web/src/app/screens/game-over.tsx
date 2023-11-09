import React from 'react';
import * as ArenaUI from '@tic-tac-toe/ui';
import { GameState, PlayerSymbol } from '../core/model';
import { GameOver, Button } from '../components';

interface Props {
	gameState: GameState;
	playerSymbol: PlayerSymbol;
	cpuSymbol: PlayerSymbol;
	handleRestartGame: () => void;
	handleNextRound: () => void;
}

export const GameOverModalScreen: React.FC<Props> = ({
	playerSymbol,
	cpuSymbol,
	gameState,
	handleRestartGame,
	handleNextRound,
}) => {
	let title = 'Takes the round';
	let subtitle = '';
	let avatar: PlayerSymbol = null;
	let className = '';

	switch (gameState) {
		case GameState.WIN:
			subtitle = "You've won!";
			avatar = playerSymbol;
			className = ['x', 'o'][playerSymbol];
			break;
		case GameState.LOST:
			subtitle = "You've lost!";
			avatar = cpuSymbol;
			className = ['x', 'o'][cpuSymbol];
			break;
		case GameState.DRAW:
			title = 'No one wins...';
			subtitle = "It's a draw!";
			className = 'text-light';
			break;
	}

	return (
		<>
			<GameOver
				title={title}
				subtitle={subtitle}
				avatar={avatar}
				className={className}
			/>
			<ArenaUI.Divider margin="vertical-l" />
			<ArenaUI.Grid cols={2} colGap="l">
				<Button variant="light" onClick={handleRestartGame}>
					Quit
				</Button>
				<Button variant="secondary" onClick={handleNextRound}>
					Next Round
				</Button>
			</ArenaUI.Grid>
		</>
	);
};
