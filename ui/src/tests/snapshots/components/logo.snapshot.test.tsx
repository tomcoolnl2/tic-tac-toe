import { render } from '@testing-library/react';
import { AppLogo } from '../../../lib/components';

test('AppLogo component snapshot test', () => {
	const { container } = render(<AppLogo />);
	expect(container).toMatchSnapshot();
});
