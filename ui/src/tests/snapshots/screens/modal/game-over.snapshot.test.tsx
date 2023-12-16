import { render } from '@testing-library/react';
import { GameStatus, PlayerSymbol } from '@tic-tac-toe/model';
import { GameOverModalScreen } from '../../../../lib/screens';

describe('GameOverModalScreen screen component snapshot test', () => {
	const content = {
		title: ['Takes the round', 'No one wins...'],
		subtitle: ["You've won!", "You've lost!", "It's a draw!"],
		cta1: 'Quit',
		cta2: 'Next round',
	};
	it('should match the snapshot', () => {
		const fn = jest.fn();
		const { asFragment } = render(
			<GameOverModalScreen
				content={content}
				gameStatus={GameStatus.WIN}
				playerSymbol={PlayerSymbol.X}
				cpuSymbol={PlayerSymbol.O}
				handleQuitGame={fn}
				handleNextRound={fn}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
