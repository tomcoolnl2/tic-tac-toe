import { render } from '@testing-library/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { ScoreBoardItem } from '../../../lib/components';

test('ScoreBoardItem component snapshot test', () => {
	const { container } = render(
		<ScoreBoardItem
			index={1}
			score={1}
			content={['You', 'Ties', 'CPU']}
			playerSymbol={PlayerSymbol.O}
			cpuSymbol={PlayerSymbol.X}
		/>
	);
	expect(container).toMatchSnapshot();
});
