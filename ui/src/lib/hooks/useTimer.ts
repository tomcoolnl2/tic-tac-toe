import React from 'react';
import { GameDuration, TimerStatus } from '@tic-tac-toe/model';

const MAX_TIME = 60; // secs
const DANGER_TIME = 10;

export const useTimer = () => {
	//
	const [time, setTime] = React.useState<GameDuration>('00:00');
	const [status, setStatus] = React.useState<TimerStatus>(TimerStatus.STOPPED);
	const [elapsedSeconds, setElapsedSeconds] = React.useState<number>(0);

	const formatTime = React.useCallback((totalSeconds: number): GameDuration => {
		const minutes = (totalSeconds / 60) << 0;
		const seconds = totalSeconds % 60;
		const formattedMinutes = `${(minutes / 10) << 0}${minutes % 10}`;
		const formattedSeconds = `${(seconds / 10) << 0}${seconds % 10}`;
		return `${formattedMinutes}:${formattedSeconds}` as GameDuration;
	}, []);

	const startTimer = React.useCallback(() => {
		setStatus(TimerStatus.RUNNING);
	}, []);

	const pauseTimer = React.useCallback(() => {
		setStatus(TimerStatus.STOPPED);
	}, []);

	const resetTimer = React.useCallback(() => {
		setStatus(TimerStatus.STOPPED);
		setElapsedSeconds(0);
		setTime('00:00');
	}, []);

	React.useEffect(() => {
		let interval = 0;
		if (status !== TimerStatus.STOPPED) {
			interval = window.setInterval(() => {
				setElapsedSeconds((prevElapsedSeconds) => prevElapsedSeconds + 1);
				if (elapsedSeconds === MAX_TIME - 1) {
					setStatus(TimerStatus.RUNOUT);
				}
				if (elapsedSeconds === MAX_TIME - DANGER_TIME - 1) {
					setStatus(TimerStatus.DANGER);
				}
			}, 1000);
		} else if (status === TimerStatus.STOPPED && elapsedSeconds !== 0) {
			window.clearInterval(interval);
		}

		setTime(formatTime(elapsedSeconds));

		return () => {
			window.clearInterval(interval);
		};
	}, [status, elapsedSeconds, formatTime]);

	return {
		time,
		status,
		startTimer,
		pauseTimer,
		resetTimer,
	};
};
