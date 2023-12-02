import React from 'react';
import { Divider, FlexBox } from '../../core';
import { AppLogo } from '../../components';

interface Props {
	children: React.ReactNode;
}

export const BaseScreen: React.FC<Props> = ({ children }) => (
	<FlexBox direction="column" alignItems="center">
		<AppLogo />
		<Divider invisible margin="vertical" />
		{children}
	</FlexBox>
);
