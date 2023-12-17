import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { Locale } from '@tic-tac-toe/model';
import { fetchContentfulData } from '../lib/api';
import { ContentfulError } from '../lib/error';

describe('fetchContentfulData function', () => {
	beforeEach(() => {
		fetchMock.enableMocks();
	});

	afterEach(() => {
		fetchMock.resetMocks();
	});

	it('fetches data from Contentful API with correct parameters', async () => {
		const mockLocale = Locale.EN;
		const mockData = {
			data: {
				localizedProperties: {
					appTitle: 'App Title',
				},
			},
		};

		fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

		const result = await fetchContentfulData(mockLocale);

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fetchMock).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				method: 'POST',
				headers: expect.objectContaining({
					'Content-Type': 'application/json',
					Authorization: expect.stringContaining('Bearer'),
				}),
				body: expect.any(String),
			})
		);

		expect(result).toEqual(mockData.data.localizedProperties);
	});

	it('throws ContentfulError on fetch error', async () => {
		const mockLocale = Locale.EN;
		const mockError = new ContentfulError('Fetch error: Something went wrong');

		fetchMock.mockRejectOnce(mockError);

		await expect(fetchContentfulData(mockLocale)).rejects.toThrowError(
			'Contentful: 500: Fetch error: Something went wrong'
		);
	});
});
