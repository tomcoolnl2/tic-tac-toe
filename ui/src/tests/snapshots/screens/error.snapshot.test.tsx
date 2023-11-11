import { render } from '@testing-library/react';
import { ErrorScreen } from '../../../lib/screens';

describe('ErrorScreen screen component snapshot test', () => {
	it('should match the snapshot', () => {
		const { asFragment } = render(<ErrorScreen />);
		expect(asFragment()).toMatchSnapshot();
	});
});
