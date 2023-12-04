import * as TTTModel from '@tic-tac-toe/model';
import { VITE_AUTH_API_URL } from '@tic-tac-toe/constants';

/**
 * Represents an authentication error.
 * @class
 * @extends Error
 */
export class AuthError extends Error {
	/**
	 * Creates an instance of AuthError.
	 * @param {string} message - The error message.
	 * @param {number} status - The status code associated with the error.
	 */
	constructor(message: string, public status: number = 500) {
		super(message);
		this.name = this.constructor.name;
		this.message = `${this.status}: ${message}`;
		Object.setPrototypeOf(this, AuthError.prototype);
	}
}

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
 * @param {Function} successHandler - The function to handle a successful response.
 * @returns {Promise<AuthError | void>} A promise resolving to either an AuthError or void.
 */
export async function login(
	pwd: string,
	successHandler: (user: TTTModel.User) => void
): Promise<AuthError | void> {
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
		successHandler(data);
	}
}
