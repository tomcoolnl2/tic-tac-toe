import React from 'react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { FlexBox } from '../../core';
import { Avatar } from '../';

export const AppLogo: React.FC = React.memo(() => {
	return (
		<FlexBox className="logo" spacing="s">
			<Avatar size="m" type={PlayerSymbol.X} />
			<Avatar size="m" type={PlayerSymbol.O} />
		</FlexBox>
	);
});
