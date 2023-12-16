import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { render, fireEvent, act } from '@testing-library/react';
import { LoginScreen } from '../../../lib/screens';

fetchMock.enableMocks();

describe('LoginScreen component', () => {
	const content = {
		username: 'testUserName',
		password: 'testPassword',
		cta1: 'Login',
		title: 'Login',
		errors: {
			emptyPwd: 'Please provide a password...',
		},
	};

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
					content={content}
					authError={null}
					handleSubmit={jest.fn()}
					setAuthError={jest.fn()}
				/>
			);
			getByTestId = renderedGetByTestId;
		});

		const passwordInput = getByTestId!('password');

		expect(passwordInput).toHaveValue('');
	});

	it('handles password change', async () => {
		const mockResponse = { name: 'TestUser' };
		fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

		let getByTestId;
		await act(async () => {
			const { getByTestId: renderedGetByTestId } = render(
				<LoginScreen
					content={content}
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
