import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { IntelligenceLevel, PlayerSymbol } from '@tic-tac-toe/model';
import { SettingsScreen } from '../../../lib/screens';

describe('SettingsScreen component', () => {
	const content = {
		cta1: 'Start game',
		title: "Pick Player 1's mark",
		subtitle: 'Remember, X goes first',
	};

	it('should render the component correctly', () => {
		const { getByText, container } = render(
			<SettingsScreen
				content={content}
				playerSymbol={PlayerSymbol.X}
				selectedDifficultySetting={IntelligenceLevel.EASY}
				handleLogout={jest.fn()}
			/>
		);
		expect(getByText("Pick Player 1's mark")).toBeInTheDocument();
		expect(container.querySelector('.choose-player')).toBeInTheDocument();
		expect(getByText('Remember, X goes first')).toBeInTheDocument();
		expect(getByText('Start game')).toBeInTheDocument();
	});
});
