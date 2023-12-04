import { render } from '@testing-library/react';
import { Logout } from '../../../lib/components';

test('Logout component snapshot test', () => {
	const { container } = render(<Logout handleLogout={jest.fn()} />);
	expect(container).toMatchSnapshot();
});
