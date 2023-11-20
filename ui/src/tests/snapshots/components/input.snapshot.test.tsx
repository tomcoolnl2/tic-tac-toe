import { render } from '@testing-library/react';
import { Input } from '../../../lib/components';

test('Input component snapshot test', () => {
	const { container } = render(
		<Input id="username" value={'test'} onChange={jest.fn()} />
	);
	expect(container).toMatchSnapshot();
});

test('Input component password snapshot test', () => {
	const { container } = render(
		<Input
			id="password"
			type="password"
			value={'pwd'}
			onChange={jest.fn()}
		/>
	);
	expect(container).toMatchSnapshot();
});
