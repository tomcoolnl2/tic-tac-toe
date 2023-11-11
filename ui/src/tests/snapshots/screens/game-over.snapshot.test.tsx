import { render } from '@testing-library/react';
import { GameState, PlayerSymbol } from '@tic-tac-toe/model';
import { GameOverModalScreen } from '../../../lib/screens';

describe('GameOverModalScreen screen component snapshot test', () => {
	it('should match the snapshot', () => {
		const fn = jest.fn();
		const { asFragment } = render(
			<GameOverModalScreen
				gameState={GameState.WIN}
				playerSymbol={PlayerSymbol.X}
				cpuSymbol={PlayerSymbol.O}
				handleRestartGame={fn}
				handleNextRound={fn}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
