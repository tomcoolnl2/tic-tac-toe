import { render } from '@testing-library/react';
import { Timer } from '../../../lib/components';

test('Timer component snapshot test', () => {
	const { container } = render(<Timer />);
	expect(container).toMatchSnapshot();
});
