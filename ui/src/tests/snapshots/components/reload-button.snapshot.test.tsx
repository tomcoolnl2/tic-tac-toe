import { render } from '@testing-library/react';
import { ReloadButton } from '../../../lib/components';

describe('ReloadButton component snapshot test', () => {
	it('should match the snapshot', () => {
		const handleReloadDialog = jest.fn();
		const { asFragment } = render(
			<ReloadButton handleReloadDialog={handleReloadDialog} />
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
