import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { ResumeModalScreen } from '../../../lib/screens';

describe('RestartModalScreen component', () => {
	const content = {
		cta1: 'Resume',
		title: 'Game is Paused',
	};

	it('should call handleResumeGame when "Resume" button is clicked', () => {
		const closeModalScreen = jest.fn();
		const { getByText } = render(
			<ResumeModalScreen content={content} handleResumeGame={closeModalScreen} />
		);
		const cancelButton = getByText('Resume');
		fireEvent.click(cancelButton);
		expect(closeModalScreen).toHaveBeenCalledTimes(1);
	});
});
