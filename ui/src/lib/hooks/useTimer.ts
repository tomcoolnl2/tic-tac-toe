import React from 'react';
import { GameDuration } from '@tic-tac-toe/model';

export const useTimer = () => {
	//
	const [time, setTime] = React.useState<GameDuration>('00:00');
	const [isActive, setIsActive] = React.useState<boolean>(false);
	const [elapsedSeconds, setElapsedSeconds] = React.useState<number>(0);

	const formatTime = (totalSeconds: number): GameDuration => {
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;

		const formattedMinutes = `${Math.floor(minutes / 10)}${minutes % 10}`;
		const formattedSeconds = `${Math.floor(seconds / 10)}${seconds % 10}`;

		return `${formattedMinutes}:${formattedSeconds}` as GameDuration;
	};

	const startTimer = React.useCallback(() => {
		setIsActive(true);
	}, []);

	const pauseTimer = React.useCallback(() => {
		setIsActive(false);
	}, []);

	const resetTimer = React.useCallback(() => {
		setIsActive(false);
		setElapsedSeconds(0);
		setTime('00:00');
	}, []);

	React.useEffect(() => {
		let interval = 0;
		if (isActive) {
			interval = window.setInterval(() => {
				setElapsedSeconds((prevElapsedSeconds) => prevElapsedSeconds + 1);
			}, 1000);
		} else if (!isActive && elapsedSeconds !== 0) {
			window.clearInterval(interval);
		}

		setTime(formatTime(elapsedSeconds));

		return () => {
			window.clearInterval(interval);
		};
	}, [isActive, elapsedSeconds]);

	return {
		time,
		isActive,
		startTimer,
		pauseTimer,
		resetTimer,
	};
};
