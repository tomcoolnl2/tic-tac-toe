import React from 'react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { Grid, GridItem } from '../../core';
import { Avatar } from '../avatar/avatar';
import './symbol-choice.scss';

export interface Props {
	playerSymbol: PlayerSymbol;
	handleAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SymbolChoice: React.FC<Props> = ({ playerSymbol, handleAvatarChange }) => {
	return (
		<label htmlFor="choose-player" className="choose-player">
			<input
				onChange={handleAvatarChange}
				checked={Boolean(playerSymbol)}
				id="choose-player"
				type="checkbox"
			/>
			<span className="choose-player-toggle"></span>
			<Grid cols={2} className="choose-player-symbols">
				<GridItem placeSelf="center">
					<Avatar
						type={PlayerSymbol.X}
						size="m"
						variant={playerSymbol === PlayerSymbol.X ? 'dark' : 'light'}
					/>
				</GridItem>
				<GridItem placeSelf="center">
					<Avatar
						type={PlayerSymbol.O}
						size="m"
						variant={playerSymbol === PlayerSymbol.O ? 'dark' : 'light'}
					/>
				</GridItem>
			</Grid>
		</label>
	);
};
