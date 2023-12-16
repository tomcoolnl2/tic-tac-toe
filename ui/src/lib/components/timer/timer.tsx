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
		switch (appState.gameStatus) {
			case TTTModel.GameStatus.PLAYING:
				startTimer();
				break;
			case TTTModel.GameStatus.PAUSED:
			case TTTModel.GameStatus.WIN:
			case TTTModel.GameStatus.DRAW:
			case TTTModel.GameStatus.LOST:
				pauseTimer();
				break;
			default:
				resetTimer();
				break;
		}
	}, [appState.gameStatus, pauseTimer, startTimer, resetTimer]);

	return (
		<Button variant="dark" disabled className="timer">
			{time}
		</Button>
	);
};
