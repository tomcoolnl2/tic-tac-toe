import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AppGameContent } from '../../../lib/context/content/model';
import { GameScreen } from '../../../lib/screens';

describe('GameScreen Component', () => {
	const mockContent = {
		intelligenceLevel: ['easy', 'medium', 'hard'],
		turnIndicator: ['test1', 'test2'],
		scoreBoard: ['You', 'Ties', 'CPU'],
	} as AppGameContent;

	it('renders GameScreen component properly', () => {
		const { getByText } = render(<GameScreen content={mockContent} landscape={true} />);
		expect(getByText('00:00')).toBeInTheDocument();
		expect(getByText('Ties')).toBeInTheDocument();
	});
});
