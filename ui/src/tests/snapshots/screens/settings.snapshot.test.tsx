import { render } from '@testing-library/react';
import { IntelligenceLevel, PlayerSymbol } from '@tic-tac-toe/model';
import { SettingsScreen } from '../../../lib/screens';

describe('SettingsScreen screen component snapshot test', () => {
	const content = {
		cta1: 'Start game',
		title: "Pic Player 1's mark",
		subtitle: 'Remember, X goes first',
	};
	it('should match the snapshot', () => {
		const { asFragment } = render(
			<SettingsScreen
				content={content}
				playerSymbol={PlayerSymbol.X}
				handleStartGame={jest.fn()}
				handleSymbolChoiceChange={jest.fn()}
				selectedDifficultySetting={IntelligenceLevel.EASY}
				handleDifficultySettingsChange={jest.fn()}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
