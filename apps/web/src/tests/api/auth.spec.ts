import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { fetchUserName } from '../../api/auth';

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
});
