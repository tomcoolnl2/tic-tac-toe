import React from 'react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { Divider, FlexBox } from '../../core';
import { Avatar } from '..';
import './game-over.scss';

interface Props {
	title: string;
	subtitle: string;
	avatar: PlayerSymbol | null;
	className: string;
}

export const GameOver: React.FC<Props> = React.memo(({ title, subtitle, avatar, className }) => {
	return (
		<FlexBox className="game-over" direction="column" alignItems="center">
			<sub>{subtitle}</sub>
			<Divider margin="vertical" />
			{avatar !== null ? <Avatar type={avatar} size="l" /> : null}
			<h2 className={`text-player-${className}`}>{title}</h2>
		</FlexBox>
	);
});
