import React from 'react';
import { FlexBox, Divider } from '../core';
import { AppLogo, Button } from '../components';

export const ErrorScreen: React.FC = () => {
	return (
		<div className="screen-error" data-testid="error-boundary">
			<FlexBox direction="column" alignItems="center">
				<AppLogo />
				<Divider invisible margin="vertical-l" />
				<span>Something went wrong!</span>
				<Divider invisible margin="vertical-s" />
				<sub>Please, try again later...</sub>
				<Divider invisible margin="vertical-l" />
				<Button onClick={() => window.location.reload()}>
					Try again
				</Button>
			</FlexBox>
		</div>
	);
};
