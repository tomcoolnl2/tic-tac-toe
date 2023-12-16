import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { GameStatus, PlayerSymbol } from '@tic-tac-toe/model';
import { GameOverModalScreen } from '../../../../lib/screens';

describe('GameOverModalScreen component', () => {
	const content = {
		title: ['Takes the round', 'No one wins...'],
		subtitle: ["You've won!", "You've lost!", "It's a draw!"],
		cta1: 'Quit',
		cta2: 'Next round',
	};

	it('should render the component correctly when gameStatus is WIN', () => {
		const playerSymbol = PlayerSymbol.X;
		const cpuSymbol = PlayerSymbol.O;
		const gameStatus = GameStatus.WIN;
		const handleQuitGame = jest.fn();
		const handleNextRound = jest.fn();

		const { getByText } = render(
			<GameOverModalScreen
				content={content}
				playerSymbol={playerSymbol}
				cpuSymbol={cpuSymbol}
				gameStatus={gameStatus}
				handleQuitGame={handleQuitGame}
				handleNextRound={handleNextRound}
			/>
		);

		expect(getByText('Takes the round')).toBeInTheDocument();
		expect(getByText("You've won!")).toBeInTheDocument();
		expect(getByText('Quit')).toBeInTheDocument();
		expect(getByText('Next round')).toBeInTheDocument();
	});

	it('should render the component correctly when gameStatus is LOST', () => {
		const playerSymbol = PlayerSymbol.X;
		const cpuSymbol = PlayerSymbol.O;
		const gameStatus = GameStatus.LOST;
		const handleQuitGame = jest.fn();
		const handleNextRound = jest.fn();

		const { getByText } = render(
			<GameOverModalScreen
				content={content}
				playerSymbol={playerSymbol}
				cpuSymbol={cpuSymbol}
				gameStatus={gameStatus}
				handleQuitGame={handleQuitGame}
				handleNextRound={handleNextRound}
			/>
		);

		expect(getByText('Takes the round')).toBeInTheDocument();
		expect(getByText("You've lost!")).toBeInTheDocument();
		expect(getByText('Quit')).toBeInTheDocument();
		expect(getByText('Next round')).toBeInTheDocument();
	});

	it('should render the component correctly when gameStatus is DRAW', () => {
		const playerSymbol = PlayerSymbol.X;
		const cpuSymbol = PlayerSymbol.O;
		const gameStatus = GameStatus.DRAW;
		const handleQuitGame = jest.fn();
		const handleNextRound = jest.fn();

		const { getByText } = render(
			<GameOverModalScreen
				content={content}
				playerSymbol={playerSymbol}
				cpuSymbol={cpuSymbol}
				gameStatus={gameStatus}
				handleQuitGame={handleQuitGame}
				handleNextRound={handleNextRound}
			/>
		);

		expect(getByText('No one wins...')).toBeInTheDocument();
		expect(getByText("It's a draw!")).toBeInTheDocument();
		expect(getByText('Quit')).toBeInTheDocument();
		expect(getByText('Next round')).toBeInTheDocument();
	});

	it('should call handleQuitGame when "Quit" button is clicked', () => {
		const playerSymbol = PlayerSymbol.X;
		const cpuSymbol = PlayerSymbol.O;
		const gameStatus = GameStatus.WIN;
		const handleQuitGame = jest.fn();
		const handleNextRound = jest.fn();

		const { getByText } = render(
			<GameOverModalScreen
				content={content}
				playerSymbol={playerSymbol}
				cpuSymbol={cpuSymbol}
				gameStatus={gameStatus}
				handleQuitGame={handleQuitGame}
				handleNextRound={handleNextRound}
			/>
		);

		const quitButton = getByText('Quit');
		fireEvent.click(quitButton);

		expect(handleQuitGame).toHaveBeenCalledTimes(1);
		expect(handleNextRound).not.toHaveBeenCalled();
	});

	it('should call handleNextRound when "Next round" button is clicked', () => {
		const playerSymbol = PlayerSymbol.X;
		const cpuSymbol = PlayerSymbol.O;
		const gameStatus = GameStatus.WIN;
		const handleQuitGame = jest.fn();
		const handleNextRound = jest.fn();

		const { getByText } = render(
			<GameOverModalScreen
				content={content}
				playerSymbol={playerSymbol}
				cpuSymbol={cpuSymbol}
				gameStatus={gameStatus}
				handleQuitGame={handleQuitGame}
				handleNextRound={handleNextRound}
			/>
		);

		const nextRoundButton = getByText('Next round');
		fireEvent.click(nextRoundButton);

		expect(handleNextRound).toHaveBeenCalledTimes(1);
		expect(handleQuitGame).not.toHaveBeenCalled();
	});
});
