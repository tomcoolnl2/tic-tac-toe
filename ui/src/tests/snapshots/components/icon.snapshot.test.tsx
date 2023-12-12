import { render } from '@testing-library/react';
import { Icon } from '../../../lib/components/icon/icon';

describe('Icon component', () => {
	it('matches snapshot', () => {
		const { container } = render(<Icon name="icon-pause" handleOnClick={() => ({})} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
