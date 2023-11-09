import React from 'react';
import * as ArenaUI from '@tic-tac-toe/ui';
import { AppLogo, Button } from '../components';

export const ErrorScreen: React.FC = () => {
	return (
		<div className="screen-error" data-testid="error-boundary">
			<ArenaUI.FlexBox direction="column" alignItems="center">
				<AppLogo />
				<ArenaUI.Divider invisible margin="vertical-l" />
				<span>Something went wrong!</span>
				<ArenaUI.Divider invisible margin="vertical-s" />
				<sub>Please, try again later...</sub>
				<ArenaUI.Divider invisible margin="vertical-l" />
				<Button onClick={() => window.location.reload()}>
					Try again
				</Button>
			</ArenaUI.FlexBox>
		</div>
	);
};
