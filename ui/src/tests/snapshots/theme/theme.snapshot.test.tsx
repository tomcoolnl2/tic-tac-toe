import { render } from '@testing-library/react';
import { Theme } from '../../../lib/theme/theme';

describe('Theme screen component snapshot test', () => {
	it('should match the snapshot', () => {
		const { asFragment } = render(
			<Theme>
				<div />
			</Theme>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
