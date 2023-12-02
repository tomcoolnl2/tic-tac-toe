import { render } from '@testing-library/react';
import { Spinner } from '../../../lib/components';

test('Spinner component snapshot test', () => {
	const { container } = render(<Spinner />);
	expect(container).toMatchSnapshot();
});
