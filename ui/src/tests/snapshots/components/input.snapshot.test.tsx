import { render } from '@testing-library/react';
import { Input } from '../../../lib/components';

test('Input component snapshot test', () => {
	const { container } = render(<Input id="username" value={'test'} />);
	expect(container).toMatchSnapshot();
});

test('Input component password snapshot test', () => {
	const { container } = render(
		<Input id="password" type="password" value={'pwd'} />
	);
	expect(container).toMatchSnapshot();
});
