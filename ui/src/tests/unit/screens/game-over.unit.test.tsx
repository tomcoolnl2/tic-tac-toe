import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { GameState, PlayerSymbol } from '@tic-tac-toe/model';
import { GameOverModalScreen } from '../../../lib/screens';

describe('GameOverModalScreen component', () => {
	it('should render the component correctly when gameState is WIN', () => {
		const playerSymbol = PlayerSymbol.X;
		const cpuSymbol = PlayerSymbol.O;
		const gameState = GameState.WIN;
		const handleRestartGame = jest.fn();
		const handleNextRound = jest.fn();

		const { getByText } = render(
			<GameOverModalScreen
				playerSymbol={playerSymbol}
				cpuSymbol={cpuSymbol}
				gameState={gameState}
				handleRestartGame={handleRestartGame}
				handleNextRound={handleNextRound}
			/>
		);

		expect(getByText('Takes the round')).toBeInTheDocument();
		expect(getByText("You've won!")).toBeInTheDocument();
		expect(getByText('Quit')).toBeInTheDocument();
		expect(getByText('Next Round')).toBeInTheDocument();
	});

	it('should render the component correctly when gameState is LOST', () => {
		const playerSymbol = PlayerSymbol.X;
		const cpuSymbol = PlayerSymbol.O;
		const gameState = GameState.LOST;
		const handleRestartGame = jest.fn();
		const handleNextRound = jest.fn();

		const { getByText } = render(
			<GameOverModalScreen
				playerSymbol={playerSymbol}
				cpuSymbol={cpuSymbol}
				gameState={gameState}
				handleRestartGame={handleRestartGame}
				handleNextRound={handleNextRound}
			/>
		);

		expect(getByText('Takes the round')).toBeInTheDocument();
		expect(getByText("You've lost!")).toBeInTheDocument();
		expect(getByText('Quit')).toBeInTheDocument();
		expect(getByText('Next Round')).toBeInTheDocument();
	});

	it('should render the component correctly when gameState is DRAW', () => {
		const playerSymbol = PlayerSymbol.X;
		const cpuSymbol = PlayerSymbol.O;
		const gameState = GameState.DRAW;
		const handleRestartGame = jest.fn();
		const handleNextRound = jest.fn();

		const { getByText } = render(
			<GameOverModalScreen
				playerSymbol={playerSymbol}
				cpuSymbol={cpuSymbol}
				gameState={gameState}
				handleRestartGame={handleRestartGame}
				handleNextRound={handleNextRound}
			/>
		);

		expect(getByText('No one wins...')).toBeInTheDocument();
		expect(getByText("It's a draw!")).toBeInTheDocument();
		expect(getByText('Quit')).toBeInTheDocument();
		expect(getByText('Next Round')).toBeInTheDocument();
	});

	it('should call handleRestartGame when "Quit" button is clicked', () => {
		const playerSymbol = PlayerSymbol.X;
		const cpuSymbol = PlayerSymbol.O;
		const gameState = GameState.WIN;
		const handleRestartGame = jest.fn();
		const handleNextRound = jest.fn();

		const { getByText } = render(
			<GameOverModalScreen
				playerSymbol={playerSymbol}
				cpuSymbol={cpuSymbol}
				gameState={gameState}
				handleRestartGame={handleRestartGame}
				handleNextRound={handleNextRound}
			/>
		);

		const quitButton = getByText('Quit');
		fireEvent.click(quitButton);

		expect(handleRestartGame).toHaveBeenCalledTimes(1);
		expect(handleNextRound).not.toHaveBeenCalled();
	});

	it('should call handleNextRound when "Next Round" button is clicked', () => {
		const playerSymbol = PlayerSymbol.X;
		const cpuSymbol = PlayerSymbol.O;
		const gameState = GameState.WIN;
		const handleRestartGame = jest.fn();
		const handleNextRound = jest.fn();

		const { getByText } = render(
			<GameOverModalScreen
				playerSymbol={playerSymbol}
				cpuSymbol={cpuSymbol}
				gameState={gameState}
				handleRestartGame={handleRestartGame}
				handleNextRound={handleNextRound}
			/>
		);

		const nextRoundButton = getByText('Next Round');
		fireEvent.click(nextRoundButton);

		expect(handleNextRound).toHaveBeenCalledTimes(1);
		expect(handleRestartGame).not.toHaveBeenCalled();
	});
});
