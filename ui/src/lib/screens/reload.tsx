import React from 'react';
import { AppScreenContent } from '@tic-tac-toe/model';
import { Divider, Grid } from '../core';
import { Button } from '../components';

interface Props {
	content: AppScreenContent;
	handleRestartGame: () => void;
	closeModalScreen: () => void;
}

export const ReloadModalScreen: React.FC<Props> = ({
	content,
	handleRestartGame,
	closeModalScreen,
}) => {
	return (
		<>
			<h1>{content.title}</h1>
			<Divider margin="vertical-l" />
			<Grid cols={2} colGap="l">
				<Button variant="light" onClick={closeModalScreen}>
					{content.cta1}
				</Button>
				<Button variant="secondary" onClick={handleRestartGame}>
					{content.cta2}
				</Button>
			</Grid>
		</>
	);
};
