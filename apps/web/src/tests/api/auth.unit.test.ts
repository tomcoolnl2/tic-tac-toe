import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { AuthError, fetchUserName, login } from '../../api/auth';

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
	it('handles successful login', async () => {
		const successHandler = jest.fn();
		const mockResponse = {
			/* Your mock response for a successful login */
		};
		fetchMock.mockResponse(JSON.stringify(mockResponse), { status: 200 });

		await login('validPassword', successHandler);

		expect(successHandler).toHaveBeenCalledWith(
			expect.objectContaining({ status: 200 })
		);
	});

	it('handles unsuccessful login with non-200 status', async () => {
		const mockErrorResponse = { message: 'Unauthorized' };
		const status = 401;
		fetchMock.mockResponse(JSON.stringify(mockErrorResponse), { status });

		const error = (await login('invalidPassword', jest.fn())) as AuthError;

		expect(error).toBeInstanceOf(AuthError);
		expect(error.message).toBe(`${status}: Unauthorized`);
		expect(error.status).toBe(status);
	});
});
