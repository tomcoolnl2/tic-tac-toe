import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { RestartModalScreen } from '../../../lib/screens';

describe('RestartModalScreen component', () => {
	const content = {
		cta1: 'No, Cancel',
		cta2: 'Yes, Restart',
		title: 'Restart game?',
	};

	it('should render the component correctly', () => {
		const handleQuitGame = jest.fn();
		const handleResumeGame = jest.fn();

		const { getByText } = render(
			<RestartModalScreen
				content={content}
				handleQuitGame={handleQuitGame}
				handleResumeGame={handleResumeGame}
			/>
		);

		expect(getByText('Restart game?')).toBeInTheDocument();
		expect(getByText('No, Cancel')).toBeInTheDocument();
		expect(getByText('Yes, Restart')).toBeInTheDocument();
	});

	it('should call closeModalScreen when "No, Cancel" button is clicked', () => {
		const handleQuitGame = jest.fn();
		const handleResumeGame = jest.fn();

		const { getByText } = render(
			<RestartModalScreen
				content={content}
				handleQuitGame={handleQuitGame}
				handleResumeGame={handleResumeGame}
			/>
		);

		const cancelButton = getByText('No, Cancel');
		fireEvent.click(cancelButton);

		expect(handleResumeGame).toHaveBeenCalledTimes(1);
		expect(handleQuitGame).not.toHaveBeenCalled();
	});

	it('should call handleQuitGame when "Yes, Restart" button is clicked', () => {
		const handleQuitGame = jest.fn();
		const handleResumeGame = jest.fn();

		const { getByText } = render(
			<RestartModalScreen
				content={content}
				handleQuitGame={handleQuitGame}
				handleResumeGame={handleResumeGame}
			/>
		);

		const restartButton = getByText('Yes, Restart');
		fireEvent.click(restartButton);

		expect(handleQuitGame).toHaveBeenCalledTimes(1);
		expect(handleResumeGame).not.toHaveBeenCalled();
	});
});
