import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { ScoreBoardItem } from '../../../lib/components';

describe('ScoreBoardItem component unit test', () => {
	it('renders correctly with player symbol X', () => {
		const props = {
			score: 5,
			playerSymbol: PlayerSymbol.X,
			cpuSymbol: PlayerSymbol.O,
			index: 0,
			content: ['You', 'Ties', 'CPU'] as [string, string, string],
		};

		const { getByText } = render(<ScoreBoardItem {...props} />);

		const playerSymbolText = getByText(/\(You\)/i);
		expect(playerSymbolText).toBeInTheDocument();

		const scoreText = getByText(/5/i);
		expect(scoreText).toBeInTheDocument();
	});

	it('renders correctly for ties', () => {
		const props = {
			score: 3,
			playerSymbol: PlayerSymbol.X,
			cpuSymbol: PlayerSymbol.O,
			index: 1,
			content: ['You', 'Ties', 'CPU'] as [string, string, string],
		};

		const { getByText } = render(<ScoreBoardItem {...props} />);

		const tiesText = getByText(/ties/i);
		expect(tiesText).toBeInTheDocument();

		const scoreText = getByText(/3/i);
		expect(scoreText).toBeInTheDocument();
	});

	test('renders correctly with player symbol O', () => {
		const props = {
			score: 2,
			playerSymbol: PlayerSymbol.X,
			cpuSymbol: PlayerSymbol.O,
			index: 2,
			content: ['You', 'Ties', 'CPU'] as [string, string, string],
		};

		const { getByText } = render(<ScoreBoardItem {...props} />);

		const playerSymbolText = getByText(/\(cpu\)/i);
		expect(playerSymbolText).toBeInTheDocument();

		const scoreText = getByText(/2/i);
		expect(scoreText).toBeInTheDocument();
	});

	test('should have the correct class name for player symbol X', () => {
		const props = {
			score: 5,
			playerSymbol: PlayerSymbol.X,
			cpuSymbol: PlayerSymbol.O,
			index: 0,
			content: ['You', 'Ties', 'CPU'] as [string, string, string],
		};

		const { container } = render(<ScoreBoardItem {...props} />);
		expect(container.firstChild).toHaveClass('score-board-item-x');
		expect(container.firstChild).not.toHaveClass('score-board-item-o');
	});

	test('should have the correct class name for player symbol O', () => {
		const props = {
			score: 2,
			playerSymbol: PlayerSymbol.X,
			cpuSymbol: PlayerSymbol.O,
			index: 2,
			content: ['You', 'Ties', 'CPU'] as [string, string, string],
		};

		const { container } = render(<ScoreBoardItem {...props} />);
		expect(container.firstChild).toHaveClass('score-board-item-o');
		expect(container.firstChild).not.toHaveClass('score-board-item-x');
	});
});
