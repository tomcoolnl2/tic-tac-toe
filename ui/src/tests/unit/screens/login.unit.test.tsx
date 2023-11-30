import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { LoginScreen } from '../../../lib/screens';

fetchMock.enableMocks();

describe('LoginScreen component', () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it('has correct initial states', () => {
		const { getByTestId } = render(<LoginScreen />);
		const usernameInput = getByTestId('username');
		const passwordInput = getByTestId('password');

		expect(usernameInput).toBeDisabled();
		expect(passwordInput).toHaveValue('');
	});

	// it('fetches username and sets state', async () => {
	// 	const mockUserName = 'TestUser';

	// 	fetchMock.mockResponse(JSON.stringify({ name: mockUserName }));
	// 	const { getByTestId } = render(<LoginScreen />);

	// 	// Wait for the fetch call to be made
	// 	await waitFor(() => {
	// 		expect(fetchMock).toHaveBeenCalledWith(
	// 			'http://localhost:3000/api-login/username',
	// 			expect.anything()
	// 		);
	// 	});

	// 	// Wait for the component to update after fetching
	// 	await waitFor(() => {
	// 		const usernameElement = getByTestId('username');
	// 		expect(usernameElement).toHaveValue(mockUserName);
	// 	});
	// });

	it('handles password change', () => {
		const { getByTestId } = render(<LoginScreen />);
		const passwordInput = getByTestId('password');

		fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
		expect(passwordInput).toHaveValue('testPassword');
	});

	// it('handles login submit - successful', async () => {
	// 	fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });
	// 	const { getByTestId } = render(<LoginScreen />);
	// 	const loginButton = getByTestId('submit');
	// 	const passwordInput = getByTestId('password');

	// 	fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
	// 	fireEvent.click(loginButton);

	// 	await waitFor(() => {
	// 		expect(fetchMock).toHaveBeenCalledWith(
	// 			'http://localhost:3000/api-login/login',
	// 			{
	// 				method: 'POST',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 				},
	// 				body: JSON.stringify({ pwd: 'testPassword' }),
	// 			}
	// 		);
	// 	});
	// });

	// it('handles login submit - error', async () => {
	// 	fetchMock.mockResponseOnce(
	// 		JSON.stringify({ message: 'Invalid password' }),
	// 		{ status: 400 }
	// 	);
	// 	const { getByTestId } = render(<LoginScreen />);
	// 	const loginButton = getByTestId('submit');
	// 	const passwordInput = getByTestId('password');

	// 	fireEvent.click(loginButton);

	// 	await waitFor(() => {
	// 		expect(fetchMock).toHaveBeenCalledWith(
	// 			'http://localhost:3000/api-login/login',
	// 			expect.anything()
	// 		);
	// 	});
	// });
});
