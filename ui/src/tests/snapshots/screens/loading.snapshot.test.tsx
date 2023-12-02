import { render } from '@testing-library/react';
import { LoadingScreen } from '../../../lib/screens';

describe('LoadingScreen screen component snapshot test', () => {
	it('should match the snapshot', async () => {
		const { container } = render(<LoadingScreen />);
		expect(container).toMatchSnapshot();
	});
});
