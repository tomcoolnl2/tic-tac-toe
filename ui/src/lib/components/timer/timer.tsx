import React from 'react';
import { AppStore } from '@tic-tac-toe/core';
import { AppState, GameStatus, TimerStatus } from '@tic-tac-toe/model';
import { useBehaviorSubjectState, useTimer } from '../../hooks';
import { Button } from '../button/button';
import './timer.scss';

export interface Props {
	forceGameOver: () => void;
}

export const Timer: React.FC<Props> = ({ forceGameOver }) => {
	//
	const [appState] = useBehaviorSubjectState<AppState>(AppStore.state$);
	const { time, status, startTimer, pauseTimer, resetTimer } = useTimer();

	React.useEffect(() => {
		if (status === TimerStatus.RUNOUT) {
			forceGameOver();
		}
		console.log('status', status);
	}, [appState.gameStatus, status, forceGameOver]);

	React.useEffect(() => {
		switch (appState.gameStatus) {
			case GameStatus.PLAYING:
				startTimer();
				break;
			case GameStatus.PAUSED:
			case GameStatus.WIN:
			case GameStatus.DRAW:
			case GameStatus.LOST:
				pauseTimer();
				break;
			default:
				resetTimer();
				break;
		}
	}, [appState.gameStatus, pauseTimer, startTimer, resetTimer]);

	return (
		<Button variant="dark" disabled className={`timer timer-${status}`}>
			{time}
		</Button>
	);
};
