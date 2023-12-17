import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AuthProvider, useAuthContext } from '../lib/auth';

jest.mock('aws-amplify/auth', () => ({
	signIn: jest.fn(),
	signOut: jest.fn(),
	getCurrentUser: jest.fn(),
}));

describe('AuthProvider', () => {
	it('renders without crashing', () => {
		render(
			<AuthProvider>
				<div>Test Children</div>
			</AuthProvider>
		);
	});

	it('provides the correct context values', () => {
		const TestComponent = () => {
			const context = useAuthContext();
			return (
				<div>
					<span data-testid="signedIn">{context.signedIn.toString()}</span>
					<span data-testid="authError">{context.authError ? context.authError.message : ''}</span>
				</div>
			);
		};

		const { getByTestId } = render(
			<AuthProvider>
				<TestComponent />
			</AuthProvider>
		);

		// Ensure the default values are provided
		expect(getByTestId('signedIn')).toHaveTextContent('false');
		expect(getByTestId('authError')).toHaveTextContent('');
	});
});
