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
				<LoginScreen />
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
				<LoginScreen />
			);
			getByTestId = renderedGetByTestId;
		});
		const passwordInput = getByTestId!('password');
		fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

		expect(passwordInput).toHaveValue('testPassword');
	});

	it('fetches username and sets state', async () => {
		const mockResponse = { name: 'TestUser' };
		fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

		let getByTestId;
		await act(async () => {
			const { getByTestId: renderedGetByTestId } = render(
				<LoginScreen />
			);
			getByTestId = renderedGetByTestId;
		});

		// Wait for the fetch call to be made
		await waitFor(() => {
			expect(fetchMock).toHaveBeenCalledWith(
				'http://localhost:3000/api-login/username',
				expect.anything()
			);
		});

		// Wait for the component to update after fetching
		await waitFor(() => {
			const usernameElement = getByTestId!('username');
			expect(usernameElement).toHaveValue('TestUser');
		});
	});
});
