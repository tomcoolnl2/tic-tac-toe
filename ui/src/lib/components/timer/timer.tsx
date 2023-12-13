import React from 'react';
import { GameDuration } from '@tic-tac-toe/model';

interface Props {
	duration: GameDuration;
}

export const Timer: React.FC<Props> = ({ duration }) => {
	return <span>{duration}</span>;
};
