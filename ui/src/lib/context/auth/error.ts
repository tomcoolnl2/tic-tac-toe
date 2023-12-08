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
