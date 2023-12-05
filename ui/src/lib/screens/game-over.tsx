import React from 'react';
import { AppScreenContent, GameState, PlayerSymbol } from '@tic-tac-toe/model';
import { Divider, Grid } from '../core';
import { GameOver, Button } from '../components';

interface Props {
	content: AppScreenContent;
	gameState: GameState;
	playerSymbol: PlayerSymbol;
	cpuSymbol: PlayerSymbol;
	handleQuitGame: () => void;
	handleNextRound: () => void;
}

export const GameOverModalScreen: React.FC<Props> = ({
	content,
	playerSymbol,
	cpuSymbol,
	gameState,
	handleQuitGame,
	handleNextRound,
}) => {
	let title = content.title[0];
	let subtitle = '';
	let avatar: PlayerSymbol | null = null;
	let className = '';

	switch (gameState) {
		case GameState.WIN:
			subtitle = content.subtitle?.[0] || '';
			avatar = playerSymbol;
			className = ['x', 'o'][playerSymbol];
			break;
		case GameState.LOST:
			subtitle = content.subtitle?.[1] || '';
			avatar = cpuSymbol;
			className = ['x', 'o'][cpuSymbol];
			break;
		case GameState.DRAW:
			title = content.title[1];
			subtitle = content.subtitle?.[2] || '';
			className = 'text-light';
			break;
	}

	return (
		<>
			<GameOver title={title} subtitle={subtitle} avatar={avatar} className={className} />
			<Divider margin="vertical-l" />
			<Grid cols={2} colGap="l">
				<Button variant="light" onClick={handleQuitGame}>
					{content.cta1}
				</Button>
				<Button variant="secondary" onClick={handleNextRound}>
					{content.cta2}
				</Button>
			</Grid>
		</>
	);
};
