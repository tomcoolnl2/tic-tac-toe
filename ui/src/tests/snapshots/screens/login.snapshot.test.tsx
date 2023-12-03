import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { act, render } from '@testing-library/react';
import { LoginScreen } from '../../../lib/screens';

fetchMock.enableMocks();

describe('LoginScreen screen component snapshot test', () => {
	const content = {
		cta1: 'Login',
		title: 'Login',
		errors: {
			emptyPwd: 'Please provide a password...',
		},
	};
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it('should match the snapshot', async () => {
		const mockResponse = { name: 'TestUser' };
		fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

		let container;
		await act(async () => {
			const { container: renderedContainer } = render(
				<LoginScreen
					content={content}
					userName="TestUser"
					authError={null}
					setAuthError={jest.fn()}
					handleSubmit={jest.fn()}
				/>
			);
			container = renderedContainer;
		});
		expect(container).toMatchSnapshot();
	});
});
