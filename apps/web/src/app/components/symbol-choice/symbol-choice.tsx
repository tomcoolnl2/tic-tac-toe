import React from 'react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import * as TTTUI from '@tic-tac-toe/ui';
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
			<TTTUI.Grid cols={2} className="choose-player-symbols">
				<TTTUI.GridItem placeSelf="center">
					<Avatar
						type={PlayerSymbol.X}
						size="m"
						variant={
							playerSymbol === PlayerSymbol.X ? 'dark' : 'light'
						}
					/>
				</TTTUI.GridItem>
				<TTTUI.GridItem placeSelf="center">
					<Avatar
						type={PlayerSymbol.O}
						size="m"
						variant={
							playerSymbol === PlayerSymbol.O ? 'dark' : 'light'
						}
					/>
				</TTTUI.GridItem>
			</TTTUI.Grid>
		</label>
	);
};
