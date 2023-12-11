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
		const closeModalScreen = jest.fn();

		const { getByText } = render(
			<RestartModalScreen
				content={content}
				handleQuitGame={handleQuitGame}
				closeModalScreen={closeModalScreen}
			/>
		);

		expect(getByText('Restart game?')).toBeInTheDocument();
		expect(getByText('No, Cancel')).toBeInTheDocument();
		expect(getByText('Yes, Restart')).toBeInTheDocument();
	});

	it('should call closeModalScreen when "No, Cancel" button is clicked', () => {
		const handleQuitGame = jest.fn();
		const closeModalScreen = jest.fn();

		const { getByText } = render(
			<RestartModalScreen
				content={content}
				handleQuitGame={handleQuitGame}
				closeModalScreen={closeModalScreen}
			/>
		);

		const cancelButton = getByText('No, Cancel');
		fireEvent.click(cancelButton);

		expect(closeModalScreen).toHaveBeenCalledTimes(1);
		expect(handleQuitGame).not.toHaveBeenCalled();
	});

	it('should call handleQuitGame when "Yes, Restart" button is clicked', () => {
		const handleQuitGame = jest.fn();
		const closeModalScreen = jest.fn();

		const { getByText } = render(
			<RestartModalScreen
				content={content}
				handleQuitGame={handleQuitGame}
				closeModalScreen={closeModalScreen}
			/>
		);

		const restartButton = getByText('Yes, Restart');
		fireEvent.click(restartButton);

		expect(handleQuitGame).toHaveBeenCalledTimes(1);
		expect(closeModalScreen).not.toHaveBeenCalled();
	});
});
