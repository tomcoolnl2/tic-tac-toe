import { render } from '@testing-library/react';
import { ResumeModalScreen } from '../../../../lib/screens/modal/resume';

describe('ResumeModalScreen component', () => {
	const content = {
		cta1: 'Resume',
		title: 'Game is Paused',
	};

	it('matches snapshot', () => {
		const { container } = render(
			<ResumeModalScreen content={content} handleResumeGame={jest.fn()} />
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
