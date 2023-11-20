import { render } from '@testing-library/react';
import { LoginScreen } from '../../../lib/screens';

describe('LoginScreen screen component snapshot test', () => {
	it('should match the snapshot', () => {
		const { asFragment } = render(<LoginScreen />);
		expect(asFragment()).toMatchSnapshot();
	});
});
