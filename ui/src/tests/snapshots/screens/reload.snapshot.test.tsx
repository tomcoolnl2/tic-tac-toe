import { render } from '@testing-library/react';
import { ReloadModalScreen } from '../../../lib/screens';

describe('ReloadModalScreen screen component snapshot test', () => {
	const content = {
		cta1: 'No, Cancel',
		cta2: 'Yes, Restart',
		title: 'Restart game?',
	};
	it('should match the snapshot', () => {
		const fn = jest.fn();
		const { asFragment } = render(
			<ReloadModalScreen content={content} handleQuitGame={fn} closeModalScreen={fn} />
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
