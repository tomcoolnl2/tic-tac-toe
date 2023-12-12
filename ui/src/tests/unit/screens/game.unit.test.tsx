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

	it('should render the component correctly', () => {
		const useLandscapeDesign = true;
		const openRestartModal = jest.fn();

		const { container } = render(
			<GameScreen
				content={content}
				useLandscapeDesign={useLandscapeDesign}
				openRestartModal={openRestartModal}
			/>
		);

		expect(container.querySelector('.logo')).toBeInTheDocument();
		expect(container.querySelector('.turn-indicator')).toBeInTheDocument();
		expect(container.querySelector('.icon-repeat')).toBeInTheDocument();
		expect(container.querySelector('.board')).toBeInTheDocument();
		expect(container.querySelector('.score-board-item')).toBeInTheDocument();
	});

	it('should call handleReloadDialog when reload icon is clicked', () => {
		const useLandscapeDesign = true;
		const openRestartModal = jest.fn();

		const { container } = render(
			<GameScreen
				content={content}
				useLandscapeDesign={useLandscapeDesign}
				openRestartModal={openRestartModal}
			/>
		);

		const reloadButton = container.querySelector('.icon-repeat');
		fireEvent.click(reloadButton!);

		expect(openRestartModal).toHaveBeenCalledTimes(1);
	});
});
