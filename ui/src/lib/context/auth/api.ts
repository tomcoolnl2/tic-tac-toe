import * as TTTModel from '@tic-tac-toe/model';
import { VITE_AUTH_API_URL } from '@tic-tac-toe/constants';
import { AuthError } from './error';

/**
 * Fetches the username asynchronously.
 * @returns {Promise<string | AuthError | null>} A promise resolving to either the username, an AuthError, or null.
 */
export async function fetchUserName(): Promise<string | AuthError | null> {
	const { signal } = new AbortController();
	const url = `${VITE_AUTH_API_URL}/username`;
	const response = await fetch(url, { signal });
	try {
		const data = await response.json();
		if (!response.ok) {
			return new AuthError(data.message, response.status);
		} else {
			const { name }: Partial<TTTModel.User> = data;
			return name ?? null;
		}
	} catch (error: unknown) {
		return new AuthError('Something went wrong...', response.status);
	}
}

/**
 * Performs a login operation asynchronously.
 * @param {string} pwd - The password for login.
 * @returns {Promise<TTTModel.User | AuthError>} A promise resolving to either anTTTModel.User or AuthError.
 */
export async function login(pwd: string): Promise<TTTModel.User | AuthError> {
	const { signal } = new AbortController();
	const url = `${VITE_AUTH_API_URL}/login`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ pwd }),
		signal,
	});

	const data = await response.json();

	if (!response.ok) {
		return new AuthError(data.message, response.status);
	} else {
		return data as TTTModel.User;
	}
}

export async function logout(): Promise<TTTModel.User> {
	const { signal } = new AbortController();
	const url = `${VITE_AUTH_API_URL}/logout`;
	const response = await fetch(url, { signal });
	return (await response.json()) as TTTModel.User;
}
