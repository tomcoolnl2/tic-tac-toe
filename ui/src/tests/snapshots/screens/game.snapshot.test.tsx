import { render } from '@testing-library/react';
import { AppGameContent } from '@tic-tac-toe/model';
import { GameScreen } from '../../../lib/screens';

describe('GameScreen screen component snapshot test', () => {
	const content = {
		intelligenceLevel: ['Bieber', 'Novice', 'Master'],
		turnIndicator: ['Your turn', "CPU's Turn"],
		scoreBoard: ['You', 'Ties', 'CPU'],
	};
	it('should match the snapshot', () => {
		const handleReloadDialog = jest.fn();
		const { asFragment } = render(
			<GameScreen
				content={content as AppGameContent}
				landscape={false}
				handleReloadDialog={handleReloadDialog}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
