import React from 'react';
import useSound from 'use-sound';
import { type PlayerSymbol, GameStatus } from '@tic-tac-toe/model';
import type { AppScreenContent } from '../../context/content/model';
import { Divider, Grid } from '../../core';
import { GameOver, Button } from '../../components';

import drawSfx from '../../sound/draw.wav';
import looseSfx from '../../sound/loose.wav';
import winSfx from '../../sound/win.wav';

interface Props {
	content: AppScreenContent;
	gameStatus: GameStatus;
	playerSymbol: PlayerSymbol;
	cpuSymbol: PlayerSymbol;
	handleQuitGame: () => void;
	handleNextRound: () => void;
}

export const GameOverModalScreen: React.FC<Props> = ({
	content,
	playerSymbol,
	cpuSymbol,
	gameStatus,
	handleQuitGame,
	handleNextRound,
}) => {
	//
	const [playDrawSfx] = useSound(drawSfx, { volume: 0.75 });
	const [playLooseSfx] = useSound(looseSfx, { volume: 0.75 });
	const [playWinSfx] = useSound(winSfx, { volume: 0.5 });

	let title = content.title[0];
	let subtitle = '';
	let avatar: PlayerSymbol | null = null;
	let className = '';

	switch (gameStatus) {
		case GameStatus.WIN:
			subtitle = content.subtitle?.[0] || '';
			avatar = playerSymbol;
			className = ['x', 'o'][playerSymbol];
			playWinSfx();
			break;
		case GameStatus.LOST:
			subtitle = content.subtitle?.[1] || '';
			avatar = cpuSymbol;
			className = ['x', 'o'][cpuSymbol];
			playLooseSfx();
			break;
		case GameStatus.DRAW:
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
