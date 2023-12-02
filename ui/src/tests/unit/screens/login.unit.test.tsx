import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { LoginScreen } from '../../../lib/screens';

fetchMock.enableMocks();

describe('LoginScreen component', () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it('has correct initial states', async () => {
		const mockResponse = { name: 'TestUser' };
		fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

		let getByTestId;
		await act(async () => {
			const { getByTestId: renderedGetByTestId } = render(
				<LoginScreen
					userName={'testUserName'}
					authError={null}
					handleSubmit={jest.fn()}
					setAuthError={jest.fn()}
				/>
			);
			getByTestId = renderedGetByTestId;
		});
		const usernameInput = getByTestId!('username');
		const passwordInput = getByTestId!('password');

		expect(usernameInput).toBeDisabled();
		expect(passwordInput).toHaveValue('');
	});

	it('handles password change', async () => {
		const mockResponse = { name: 'TestUser' };
		fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

		let getByTestId;
		await act(async () => {
			const { getByTestId: renderedGetByTestId } = render(
				<LoginScreen
					userName={'testUserName'}
					authError={null}
					handleSubmit={jest.fn()}
					setAuthError={jest.fn()}
				/>
			);
			getByTestId = renderedGetByTestId;
		});
		const passwordInput = getByTestId!('password');
		fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

		expect(passwordInput).toHaveValue('testPassword');
	});
});
