import React from 'react';
import * as ArenaUI from '@tic-tac-toe/ui';
import { PlayerSymbol } from '../../core/model';
import { Avatar } from '../';
import './game-over.scss';

interface Props {
	title: string;
	subtitle: string;
	avatar: PlayerSymbol | null;
	className: string;
}

export const GameOver: React.FC<Props> = ({
	title,
	subtitle,
	avatar,
	className,
}) => {
	return (
		<ArenaUI.FlexBox
			className="game-over"
			direction="column"
			alignItems="center"
		>
			<sub>{subtitle}</sub>
			<ArenaUI.Divider margin="vertical" />
			{avatar !== null ? <Avatar type={avatar} size="l" /> : null}
			<h2 className={`text-player-${className}`}>{title}</h2>
		</ArenaUI.FlexBox>
	);
};
