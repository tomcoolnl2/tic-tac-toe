import { ChangeEvent } from 'react';
import { render } from '@testing-library/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { SymbolChoice } from '../../../lib/components';

describe('SymbolChoice component snapshot test', () => {
	it('should match the snapshot', () => {
		const { asFragment } = render(
			<SymbolChoice
				playerSymbol={PlayerSymbol.X}
				handleSymbolChoiceChange={jest.fn()}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
