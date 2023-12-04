import { render, fireEvent } from '@testing-library/react';
import { IntelligenceLevel } from '@tic-tac-toe/model';
import {
	ChooseDifficulty,
	Props,
} from '../../../lib/components/choose-difficulty/choose-difficulty';

describe('ChooseDifficulty Component', () => {
	const handleDifficultyChange = jest.fn();
	const selectedDifficultySetting = IntelligenceLevel.EASY;

	const props: Props = {
		selectedDifficultySetting,
		handleDifficultyChange,
	};

	it('should render radio inputs with correct settings', () => {
		const { getByDisplayValue } = render(<ChooseDifficulty {...props} />);
		const radio1 = getByDisplayValue('EASY') as HTMLInputElement;
		expect(radio1.checked).toBe(true);
		const radio2 = getByDisplayValue('MEDIUM') as HTMLInputElement;
		expect(radio2.checked).toBe(false);
	});

	it('should call handleDifficultyChange on radio input change', () => {
		// Prepare
		const { getByDisplayValue } = render(<ChooseDifficulty {...props} />);
		const radio = getByDisplayValue('HARD') as HTMLInputElement;
		// Act
		fireEvent.click(radio);
		// Assert
		expect(handleDifficultyChange).toHaveBeenCalled();
		const eventValue = handleDifficultyChange.mock.calls[0][0].target.value;
		expect(eventValue).toBe('HARD');
	});
});
