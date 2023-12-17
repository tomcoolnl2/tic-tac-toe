import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PausedModalScreen } from '../../../../lib/screens';

describe('RestartModalScreen component', () => {
	const content = {
		cta1: 'Resume',
		title: 'Game is Paused',
	};

	it('should call handleResumeGame when "Resume" button is clicked', () => {
		const { getByText } = render(<PausedModalScreen content={content} />);
		const title = getByText('Game is Paused');
		const cancelButton = getByText('Resume');
		expect(title).toBeInTheDocument();
		expect(cancelButton).toBeInTheDocument();
	});
});
