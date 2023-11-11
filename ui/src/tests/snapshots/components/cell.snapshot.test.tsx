import { render } from '@testing-library/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { Cell } from '../../../lib/components';

describe('Cell component snapshot test', () => {
	it('should match the snapshot', () => {
		const { asFragment } = render(
			<Cell
				type={PlayerSymbol.X}
				index={0}
				solutionCells={[0, 0, 0]}
				disabled={false}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
