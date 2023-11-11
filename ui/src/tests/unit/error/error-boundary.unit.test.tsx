import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ErrorBoundary } from '../../../lib/error/error-boundary';
import { ErrorScreen } from '../../../lib/screens';

describe('Error Boundary', () => {
	let consoleErrorSpy: jest.SpyInstance;

	beforeEach(() => {
		consoleErrorSpy = jest.spyOn(console, 'error');
		consoleErrorSpy.mockImplementation(jest.fn());
	});

	afterEach(() => {
		consoleErrorSpy.mockRestore();
	});

	test('fallback component', () => {
		const ThrowError = () => {
			throw new Error('Test');
		};

		const { getByTestId } = render(
			<ErrorBoundary
				fallback={<ErrorScreen />}
				data-testid="error-boundary"
			>
				<ThrowError />
			</ErrorBoundary>
		);

		expect(getByTestId('error-boundary')).toBeVisible();
	});
});
