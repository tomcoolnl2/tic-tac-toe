import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
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
				handleSymbolChoiceChange={jest.fn()}
				handleStartGame={jest.fn()}
				selectedDifficultySetting={IntelligenceLevel.EASY}
				handleDifficultySettingsChange={jest.fn()}
			/>
		);
		expect(getByText("Pick Player 1's mark")).toBeInTheDocument();
		expect(container.querySelector('.choose-player')).toBeInTheDocument();
		expect(getByText('Remember, X goes first')).toBeInTheDocument();
		expect(getByText('Start game')).toBeInTheDocument();
	});

	it('should call handleSymbolChoiceChange when symbol choice is changed', () => {
		const handleSymbolChoiceChange = jest.fn();

		const { container } = render(
			<SettingsScreen
				content={content}
				playerSymbol={PlayerSymbol.X}
				handleSymbolChoiceChange={handleSymbolChoiceChange}
				handleStartGame={jest.fn()}
				selectedDifficultySetting={IntelligenceLevel.EASY}
				handleDifficultySettingsChange={jest.fn()}
			/>
		);

		const checkbox = container.querySelector('.choose-player');
		fireEvent.click(checkbox!);

		expect(handleSymbolChoiceChange).toHaveBeenCalledTimes(1);
	});

	it('should call handleStartGame when "Start game" button is clicked', () => {
		const handleStartGame = jest.fn();
		const { getByText } = render(
			<SettingsScreen
				content={content}
				playerSymbol={PlayerSymbol.X}
				handleSymbolChoiceChange={jest.fn()}
				handleStartGame={handleStartGame}
				selectedDifficultySetting={IntelligenceLevel.EASY}
				handleDifficultySettingsChange={jest.fn()}
			/>
		);

		const startButton = getByText('Start game');
		fireEvent.click(startButton);

		expect(handleStartGame).toHaveBeenCalledTimes(1);
	});
});
