import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { ReloadModalScreen } from '../../../lib/screens';

describe('ReloadModalScreen component', () => {
	const content = {
		cta1: 'No, Cancel',
		cta2: 'Yes, Restart',
		title: 'Restart game?',
	};
	it('should render the component correctly', () => {
		const handleRestartGame = jest.fn();
		const closeModalScreen = jest.fn();

		const { getByText } = render(
			<ReloadModalScreen
				content={content}
				handleRestartGame={handleRestartGame}
				closeModalScreen={closeModalScreen}
			/>
		);

		expect(getByText('Restart game?')).toBeInTheDocument();
		expect(getByText('No, Cancel')).toBeInTheDocument();
		expect(getByText('Yes, Restart')).toBeInTheDocument();
	});

	it('should call closeModalScreen when "No, Cancel" button is clicked', () => {
		const handleRestartGame = jest.fn();
		const closeModalScreen = jest.fn();

		const { getByText } = render(
			<ReloadModalScreen
				content={content}
				handleRestartGame={handleRestartGame}
				closeModalScreen={closeModalScreen}
			/>
		);

		const cancelButton = getByText('No, Cancel');
		fireEvent.click(cancelButton);

		expect(closeModalScreen).toHaveBeenCalledTimes(1);
		expect(handleRestartGame).not.toHaveBeenCalled();
	});

	it('should call handleRestartGame when "Yes, Restart" button is clicked', () => {
		const handleRestartGame = jest.fn();
		const closeModalScreen = jest.fn();

		const { getByText } = render(
			<ReloadModalScreen
				content={content}
				handleRestartGame={handleRestartGame}
				closeModalScreen={closeModalScreen}
			/>
		);

		const restartButton = getByText('Yes, Restart');
		fireEvent.click(restartButton);

		expect(handleRestartGame).toHaveBeenCalledTimes(1);
		expect(closeModalScreen).not.toHaveBeenCalled();
	});
});
