import React from 'react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { Avatar, Button } from '..';
import './turn-indicator.scss';

export interface Props {
	content: [string, string];
	playerSymbol: PlayerSymbol;
	currentPlayer: PlayerSymbol;
}

export const TurnIndicator: React.FC<Props> = React.memo(
	({ content, playerSymbol, currentPlayer }) => {
		const className = ['x', 'o'][currentPlayer];
		return (
			<Button
				variant="dark"
				disabled
				className={`turn-indicator turn-indicator-${className}`}
			>
				<Avatar type={currentPlayer} size={'s'} variant="light" />
				{content[Number(currentPlayer !== playerSymbol)]}
			</Button>
		);
	}
);
