import React from 'react';
import { useSaveGameManager } from '@tic-tac-toe/database';
import type { AppScreenContent } from '../../context/content/model';
import { Divider, Grid } from '../../core';
import { Button } from '../../components';
import { useInterfaceHandlers } from '../../hooks';

interface Props {
	content: AppScreenContent;
}

export const PausedModalScreen: React.FC<Props> = ({ content }) => {
	const { handleResumeGame } = useInterfaceHandlers();
	const { addSaveGame } = useSaveGameManager();
	return (
		<>
			<h1>{content.title}</h1>
			<Divider margin="vertical-l" />
			<Grid colGap="l">
				<Button variant="primary" onClick={handleResumeGame}>
					{content.cta2}
				</Button>
				<Button variant="secondary" onClick={handleResumeGame}>
					{content.cta1}
				</Button>
			</Grid>
		</>
	);
};
