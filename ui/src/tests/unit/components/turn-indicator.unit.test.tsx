import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { TurnIndicator } from '../../../lib/components';

describe('TurnIndicator component', () => {
	it('should render the component correctly', () => {
		const { container } = render(
			<TurnIndicator
				content={['Your turn', "CPU's Turn"]}
				currentPlayer={PlayerSymbol.X}
				playerSymbol={PlayerSymbol.X}
			/>
		);
		const turnIndicator = container.querySelector('.turn-indicator');
		const avatar = container.querySelector('.avatar');

		expect(turnIndicator).toHaveClass('turn-indicator');
		expect(turnIndicator).toHaveClass('turn-indicator-x');

		expect(avatar!.classList).toContain('avatar-x');
		expect(avatar!.classList).toContain('avatar-size-s');
		expect(avatar!.classList).toContain('avatar-variant-light');
	});

	it('should render the components text correctly as Player X', () => {
		const { container } = render(
			<TurnIndicator
				content={['Your turn', "CPU's Turn"]}
				currentPlayer={PlayerSymbol.X}
				playerSymbol={PlayerSymbol.X}
			/>
		);
		expect(container.textContent).toContain('Your turn');
	});

	it('should render the components text correctly as Player O', () => {
		const { container } = render(
			<TurnIndicator
				content={['Your turn', "CPU's Turn"]}
				currentPlayer={PlayerSymbol.X}
				playerSymbol={PlayerSymbol.O}
			/>
		);
		expect(container.textContent).toContain("CPU's Turn");
	});
});
