import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { VITE_AUTH_API_URL } from '@tic-tac-toe/constants';
import { fetchUserName, login, logout } from '../../../../lib/context/auth/api';
import { AuthError } from '../../../../lib/context/auth/error';

describe('fetchUserName function', () => {
	beforeEach(() => {
		fetchMock.enableMocks();
	});

	afterEach(() => {
		fetchMock.resetMocks();
	});

	it('returns the username on successful response', async () => {
		const mockUsername = 'TestUser';
		const mockResponse = { name: mockUsername };
		fetchMock.mockResponse(JSON.stringify(mockResponse), { status: 200 });

		const username = await fetchUserName();

		expect(username).toBe(mockUsername);
		expect(fetchMock).toHaveBeenCalledWith(expect.any(String), {
			signal: expect.any(AbortSignal),
		});
	});

	it('returns AuthError on unsuccessful 404 response', async () => {
		const mockErrorResponse = { message: 'Not found' };
		const status = 404;
		fetchMock.mockResponse(JSON.stringify(mockErrorResponse), { status });

		const error = (await fetchUserName()) as AuthError;

		expect(error).toBeInstanceOf(AuthError);
		expect(error.message).toBe(`${status}: Not found`);
		expect(error.status).toBe(status);
		expect(fetchMock).toHaveBeenCalledWith(expect.any(String), {
			signal: expect.any(AbortSignal),
		});
	});

	it('returns AuthError on 500 error response', async () => {
		const mockErrorResponse = { message: 'Internal Server Error' };
		const status = 500;
		fetchMock.mockResponse(JSON.stringify(mockErrorResponse), { status });

		const error = (await fetchUserName()) as AuthError;

		expect(error).toBeInstanceOf(AuthError);
		expect(error.message).toBe(`${status}: Internal Server Error`);
		expect(error.status).toBe(status);
		expect(fetchMock).toHaveBeenCalledWith(expect.any(String), {
			signal: expect.any(AbortSignal),
		});
	});
});

describe('login function', () => {
	it('handles unsuccessful login with non-200 status', async () => {
		const mockErrorResponse = { message: 'Unauthorized' };
		const status = 401;
		fetchMock.mockResponse(JSON.stringify(mockErrorResponse), { status });

		const error = (await login('invalidPassword')) as AuthError;

		expect(error).toBeInstanceOf(AuthError);
		expect(error.message).toBe(`${status}: Unauthorized`);
		expect(error.status).toBe(status);
	});
});

describe('logout function', () => {
	it('handles successful logout', async () => {
		const mockUserResponse = {
			name: null,
			avatar: null,
			loggedIn: false,
		};
		const status = 200;
		fetchMock.mockResponse(JSON.stringify(mockUserResponse), { status });

		const result = await logout();

		expect(result).toEqual(mockUserResponse);
		expect(fetchMock).toHaveBeenCalledWith(`${VITE_AUTH_API_URL}/logout`, {
			signal: expect.any(AbortSignal),
		});
	});
});
