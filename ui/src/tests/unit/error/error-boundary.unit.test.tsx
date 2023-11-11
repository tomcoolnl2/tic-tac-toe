import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ErrorBoundary } from '../../../lib/error/error-boundary';
import { ErrorScreen } from '../../../lib/screens';

describe('Error Boundary', () => {
	test('fallback component', () => {
		const ThrowError = () => {
			throw new Error('Test');
		};

		const { getByTestId } = render(
			<ErrorBoundary fallback={<ErrorScreen />}>
				<ThrowError />
			</ErrorBoundary>
		);

		expect(getByTestId('error-boundary')).toBeVisible();
	});
});
