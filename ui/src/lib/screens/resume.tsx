import React from 'react';
import type { AppScreenContent } from '../context/content/model';
import { Divider, Grid } from '../core';
import { Button } from '../components';

interface Props {
	content: AppScreenContent;
	handleResumeGame: () => void;
}

export const ResumeModalScreen: React.FC<Props> = ({ content, handleResumeGame }) => {
	return (
		<>
			<h1>{content.title}</h1>
			<Divider margin="vertical-l" />
			<Grid colGap="l">
				<Button variant="secondary" onClick={handleResumeGame}>
					{content.cta1}
				</Button>
			</Grid>
		</>
	);
};
