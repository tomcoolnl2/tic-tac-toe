import fetchMock from 'jest-fetch-mock';
import { render } from '@testing-library/react';
import { LoginScreen } from '../../../lib/screens';

describe('LoginScreen screen component snapshot test', () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it('should match the snapshot', () => {
		const { asFragment } = render(<LoginScreen />);
		expect(asFragment()).toMatchSnapshot();
	});
});
