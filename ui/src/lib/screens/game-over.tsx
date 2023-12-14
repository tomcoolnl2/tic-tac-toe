import React from 'react';
import useSound from 'use-sound';
import { type PlayerSymbol, GameState } from '@tic-tac-toe/model';
import type { AppScreenContent } from '../context/content/model';
import { Divider, Grid } from '../core';
import { GameOver, Button } from '../components';

import drawSfx from '../theme/sound/draw.wav';
import looseSfx from '../theme/sound/loose.wav';
import winSfx from '../theme/sound/win.wav';

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
	//
	const [playDrawSfx] = useSound(drawSfx);
	const [playLooseSfx] = useSound(looseSfx);
	const [playWinSfx] = useSound(winSfx);

	let title = content.title[0];
	let subtitle = '';
	let avatar: PlayerSymbol | null = null;
	let className = '';

	switch (gameState) {
		case GameState.WIN:
			subtitle = content.subtitle?.[0] || '';
			avatar = playerSymbol;
			className = ['x', 'o'][playerSymbol];
			playWinSfx();
			break;
		case GameState.LOST:
			subtitle = content.subtitle?.[1] || '';
			avatar = cpuSymbol;
			className = ['x', 'o'][cpuSymbol];
			playLooseSfx();
			break;
		case GameState.DRAW:
			title = content.title[1];
			subtitle = content.subtitle?.[2] || '';
			className = 'text-light';
			playDrawSfx();
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
