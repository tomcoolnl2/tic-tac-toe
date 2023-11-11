import { render } from '@testing-library/react';
import { IntelligenceLevel, PlayerSymbol } from '@tic-tac-toe/model';
import { SettingsScreen } from '../../../lib/screens';
import { ChangeEvent } from 'react';

describe('SettingsScreen screen component snapshot test', () => {
	it('should match the snapshot', () => {
		const { asFragment } = render(
			<SettingsScreen
				playerSymbol={PlayerSymbol.X}
				handleStartGame={jest.fn()}
				handleSymbolChoiceChange={jest.fn()}
				selectedDifficultySetting={IntelligenceLevel.BIEBER}
				handleDifficultySettingsChange={jest.fn()}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
