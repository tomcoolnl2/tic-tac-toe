import React from 'react';
import * as ArenaUI from '@tic-tac-toe/ui';
import { PlayerSymbol } from '../../core/model';
import { Avatar } from '../avatar/avatar';
import './symbol-choice.scss';

export interface Props {
	playerSymbol: PlayerSymbol;
	handleSymbolChoiceChange: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
}

export const SymbolChoice: React.FC<Props> = ({
	playerSymbol,
	handleSymbolChoiceChange,
}) => {
	return (
		<label htmlFor="choose-player" className="choose-player">
			<input
				onChange={handleSymbolChoiceChange}
				checked={Boolean(playerSymbol)}
				id="choose-player"
				type="checkbox"
			/>
			<span className="choose-player-toggle"></span>
			<ArenaUI.Grid cols={2} className="choose-player-symbols">
				<ArenaUI.GridItem placeSelf="center">
					<Avatar
						type={PlayerSymbol.X}
						size="m"
						variant={
							playerSymbol === PlayerSymbol.X ? 'dark' : 'light'
						}
					/>
				</ArenaUI.GridItem>
				<ArenaUI.GridItem placeSelf="center">
					<Avatar
						type={PlayerSymbol.O}
						size="m"
						variant={
							playerSymbol === PlayerSymbol.O ? 'dark' : 'light'
						}
					/>
				</ArenaUI.GridItem>
			</ArenaUI.Grid>
		</label>
	);
};
