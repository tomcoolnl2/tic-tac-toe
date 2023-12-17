import React from 'react';
import type { AppScreenContent } from '../../../../../content/src/lib/model';
import { Divider, Grid } from '../../core';
import { Button } from '../../components';

interface Props {
	content: AppScreenContent;
	handleQuitGame: () => void;
	handleResumeGame: () => void;
}

export const RestartModalScreen: React.FC<Props> = ({ content, handleQuitGame, handleResumeGame }) => {
	return (
		<>
			<h1>{content.title}</h1>
			<Divider margin="vertical-l" />
			<Grid cols={2} colGap="l">
				<Button variant="light" onClick={handleResumeGame}>
					{content.cta1}
				</Button>
				<Button variant="secondary" onClick={handleQuitGame}>
					{content.cta2}
				</Button>
			</Grid>
		</>
	);
};
