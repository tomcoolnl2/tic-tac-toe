import { render } from '@testing-library/react';
import { Modal } from '../../../lib/components';

test('Modal component snapshot test', () => {
	const { container } = render(
		<Modal>
			<div />
		</Modal>
	);
	expect(container).toMatchSnapshot();
});
