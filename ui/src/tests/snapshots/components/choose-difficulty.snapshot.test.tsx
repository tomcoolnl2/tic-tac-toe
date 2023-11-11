import { render } from '@testing-library/react';
import { IntelligenceLevel } from '@tic-tac-toe/model';
import { ChooseDifficulty } from '../../../lib/components';

describe('ChooseDifficulty component snapshot test', () => {
	it('should match the snapshot', () => {
		const { asFragment } = render(
			<ChooseDifficulty
				selectedDifficultySetting={IntelligenceLevel.BIEBER}
				handleDifficultySettingsChange={jest.fn()}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});