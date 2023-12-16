import { render } from '@testing-library/react';
import { Mute } from '../../../lib/components';

test('Logout component snapshot test', () => {
	const { container } = render(<Mute muted={false} handleMuteSound={jest.fn()} />);
	expect(container).toMatchSnapshot();
});
