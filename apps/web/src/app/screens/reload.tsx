import React from 'react';
import * as ArenaUI from '@tic-tac-toe/ui';
import { Button } from '../components';

interface Props {
	handleRestartGame: () => void;
	closeModalScreen: () => void;
}

export const ReloadModalScreen: React.FC<Props> = ({
	handleRestartGame,
	closeModalScreen,
}) => {
	return (
		<>
			<h1>Restart Game?</h1>
			<ArenaUI.Divider margin="vertical-l" />
			<ArenaUI.Grid cols={2} colGap="l">
				<Button variant="light" onClick={closeModalScreen}>
					No, Cancel
				</Button>
				<Button variant="secondary" onClick={handleRestartGame}>
					Yes, Restart
				</Button>
			</ArenaUI.Grid>
		</>
	);
};
