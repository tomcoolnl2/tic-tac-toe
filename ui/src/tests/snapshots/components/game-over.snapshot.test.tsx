import { render } from '@testing-library/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { GameOver } from '../../../lib/components';

test('GameOver component snapshot test', () => {
	const { container } = render(
		<GameOver
			title="test title"
			subtitle="subtitle"
			avatar={PlayerSymbol.X}
			className="x"
		/>
	);
	expect(container).toMatchSnapshot();
});
