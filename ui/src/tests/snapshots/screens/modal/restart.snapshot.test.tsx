import { render } from '@testing-library/react';
import { RestartModalScreen } from '../../../../lib/screens';

describe('RestartModalScreen screen component snapshot test', () => {
	const content = {
		cta1: 'No, Cancel',
		cta2: 'Yes, Restart',
		title: 'Restart game?',
	};
	it('should match the snapshot', () => {
		const fn = jest.fn();
		const { asFragment } = render(
			<RestartModalScreen content={content} handleQuitGame={fn} handleResumeGame={fn} />
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
