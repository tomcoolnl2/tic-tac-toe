import { render } from '@testing-library/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { TurnIndicator } from '../../../lib/components';

describe('TurnIndicator component snapshot test', () => {
	it('should match the snapshot', () => {
		const { asFragment } = render(
			<TurnIndicator
				content={['Your turn', "CPU's Turn"]}
				playerSymbol={PlayerSymbol.X}
				currentPlayer={PlayerSymbol.X}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
