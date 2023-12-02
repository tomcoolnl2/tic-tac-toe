import React from 'react';
import { Divider } from '../core';
import { Spinner } from '../components';
import { BaseScreen } from './base/base';

export const LoadingScreen: React.FC = () => {
	return (
		<BaseScreen>
			<Divider invisible margin="vertical-l" />
			<Divider invisible margin="vertical-l" />
			<Divider invisible margin="vertical-l" />
			<Spinner />
		</BaseScreen>
	);
};
