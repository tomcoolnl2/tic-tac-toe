import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { act, render } from '@testing-library/react';
import { LoginScreen } from '../../../lib/screens';

fetchMock.enableMocks();

describe('LoginScreen screen component snapshot test', () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it('should match the snapshot', async () => {
		const mockResponse = { name: 'TestUser' };
		fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

		let container;
		await act(async () => {
			const { container: renderedContainer } = render(<LoginScreen />);
			container = renderedContainer;
		});
		expect(container).toMatchSnapshot();
	});
});
