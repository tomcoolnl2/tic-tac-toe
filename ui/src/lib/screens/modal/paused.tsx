import React from 'react';
import { useSaveGameManager } from '@tic-tac-toe/database';
import type { AppScreenContent } from '../../context/content/model';
import { Divider, Grid } from '../../core';
import { Button, Icon } from '../../components';
import { useInterfaceHandlers } from '../../hooks';

interface Props {
	content: AppScreenContent;
}

export const PausedModalScreen: React.FC<Props> = React.memo(({ content }) => {
	//
	const { handleResumeGame } = useInterfaceHandlers();
	const { addSaveGame } = useSaveGameManager();

	return (
		<>
			<h1>{content.title}</h1>
			<Divider margin="vertical-l" />
			<Grid cols={2} colGap="l">
				<Button variant="primary" onClick={addSaveGame}>
					{content.cta2}
					<Icon name="icon-save" />
				</Button>
				<Button variant="secondary" onClick={handleResumeGame}>
					{content.cta1}
					<Icon name="icon-play-sign" />
				</Button>
			</Grid>
		</>
	);
});
