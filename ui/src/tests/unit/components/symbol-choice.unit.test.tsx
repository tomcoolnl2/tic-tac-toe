import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { SymbolChoice } from '../../../lib/components';

describe('SymbolChoice component', () => {
	it('should render the component correctly', () => {
		const { container } = render(
			<SymbolChoice
				playerSymbol={PlayerSymbol.X}
				handleSymbolChoiceChange={jest.fn()}
			/>
		);
		const checkbox = container.querySelector('#choose-player');
		expect(checkbox).toBeInTheDocument();
	});

	it('should call handleSymbolChoiceChange when the checkbox is clicked', () => {
		const handleSymbolChoiceChangeMock = jest.fn();
		const { container } = render(
			<SymbolChoice
				playerSymbol={PlayerSymbol.X}
				handleSymbolChoiceChange={handleSymbolChoiceChangeMock}
			/>
		);
		const checkbox = container.querySelector('#choose-player');

		fireEvent.click(checkbox!);
		expect(handleSymbolChoiceChangeMock).toHaveBeenCalledTimes(1);
	});

	it('should check the checkbox when playerSymbol is X', () => {
		const { container } = render(
			<SymbolChoice
				playerSymbol={PlayerSymbol.X}
				handleSymbolChoiceChange={jest.fn()}
			/>
		);
		const checkbox = container.querySelector(
			'#choose-player'
		) as HTMLInputElement;

		expect(checkbox.checked).toBe(false); // checkbox is disabled by default
	});

	it('should not check the checkbox when playerSymbol is O', () => {
		const { container } = render(
			<SymbolChoice
				playerSymbol={PlayerSymbol.O}
				handleSymbolChoiceChange={jest.fn()}
			/>
		);
		const checkbox = container.querySelector(
			'#choose-player'
		) as HTMLInputElement;

		expect(checkbox.checked).toBe(true);
	});
});
