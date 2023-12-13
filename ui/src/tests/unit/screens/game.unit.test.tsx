import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { AppGameContent } from '../../../lib/context/content/model';
import { GameScreen } from '../../../lib/screens';

describe('GameScreen component', () => {
	const content: AppGameContent = {
		intelligenceLevel: ['Bieber', 'Novice', 'Master'],
		turnIndicator: ['Your turn', "CPU's Turn"],
		scoreBoard: ['You', 'Ties', 'CPU'],
	};

	it('should call handleReloadDialog when the reload icon is clicked', () => {
		const openRestartModal = jest.fn();
		const { container } = render(
			<GameScreen
				content={content}
				landscape={true}
				openRestartModal={openRestartModal}
				handlePauseGame={jest.fn()}
			/>
		);
		const reloadButton = container.querySelector('.icon-repeat');
		fireEvent.click(reloadButton!);
		expect(openRestartModal).toHaveBeenCalledTimes(1);
	});

	it('should call pauseGame when the pause icon is clicked', () => {
		const openPauseGameModal = jest.fn();
		const { container } = render(
			<GameScreen
				content={content}
				landscape={true}
				openRestartModal={jest.fn()}
				handlePauseGame={openPauseGameModal}
			/>
		);
		const reloadButton = container.querySelector('.icon-pause');
		fireEvent.click(reloadButton!);
		expect(openPauseGameModal).toHaveBeenCalledTimes(1);
	});
});
