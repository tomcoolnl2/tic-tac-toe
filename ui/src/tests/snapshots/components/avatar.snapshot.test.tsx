import { render } from '@testing-library/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { Avatar } from '../../../lib/components';

test('Avatar component snapshot test', () => {
	const { container } = render(
		<Avatar
			type={PlayerSymbol.X}
			size="m"
			variant="dark"
			className="custom-avatar"
		/>
	);
	expect(container).toMatchSnapshot();
});
