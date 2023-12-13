import React from 'react';
import { AppStore } from '@tic-tac-toe/core';
import * as TTTModel from '@tic-tac-toe/model';
import { useBehaviorSubjectState, useTimer } from '../../hooks';
import { Button } from '../button/button';
import './timer.scss';

export const Timer: React.FC = () => {
	//
	const [appState] = useBehaviorSubjectState<TTTModel.AppState>(AppStore.state$);
	const { time, startTimer, pauseTimer, resetTimer } = useTimer();

	React.useEffect(() => {
		switch (appState.gameState) {
			case TTTModel.GameState.PLAYING:
				startTimer();
				break;
			case TTTModel.GameState.PAUSED:
			case TTTModel.GameState.WIN:
			case TTTModel.GameState.DRAW:
			case TTTModel.GameState.LOST:
				pauseTimer();
				break;
			default:
				resetTimer();
				break;
		}
	}, [appState.gameState, pauseTimer, startTimer, resetTimer]);

	return (
		<Button variant="dark" disabled className="timer">
			{time}
		</Button>
	);
};
