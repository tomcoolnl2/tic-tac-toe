import React from 'react';
import { GameDuration } from '@tic-tac-toe/model';
import { Button } from '../button/button';
import './timer.scss';

interface Props {
	duration: GameDuration;
}

export const Timer: React.FC<Props> = ({ duration }) => {
	return (
		<Button variant="dark" disabled className="timer">
			{duration}
		</Button>
	);
};
