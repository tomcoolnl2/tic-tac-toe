import { render, fireEvent } from '@testing-library/react';
import { IntelligenceLevel } from '@tic-tac-toe/model';
import {
	ChooseDifficulty,
	Props,
} from '../../../lib/components/choose-difficulty/choose-difficulty';

describe('ChooseDifficulty Component', () => {
	const handleDifficultySettingsChange = jest.fn();
	const selectedDifficultySetting = IntelligenceLevel.BIEBER;

	const props: Props = {
		selectedDifficultySetting,
		handleDifficultySettingsChange,
	};

	it('should render radio inputs with correct settings', () => {
		const { getByDisplayValue } = render(<ChooseDifficulty {...props} />);
		const radio1 = getByDisplayValue('bieber') as HTMLInputElement;
		expect(radio1.checked).toBe(true);
		const radio2 = getByDisplayValue('novice') as HTMLInputElement;
		expect(radio2.checked).toBe(false);
	});

	it('should call handleDifficultySettingsChange on radio input change', () => {
		// Prepare
		const { getByDisplayValue } = render(<ChooseDifficulty {...props} />);
		const radio = getByDisplayValue('master') as HTMLInputElement;
		// Act
		fireEvent.click(radio);
		// Assert
		expect(handleDifficultySettingsChange).toHaveBeenCalled();
		const eventValue =
			handleDifficultySettingsChange.mock.calls[0][0].target.value;
		expect(eventValue).toBe('master');
	});
});
