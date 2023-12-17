import { render } from '@testing-library/react';
import { PausedModalScreen } from '../../../../lib/screens/modal/paused';

describe('PausedModalScreen component', () => {
	const content = {
		cta1: 'Resume',
		title: 'Game is Paused',
	};

	it('matches snapshot', () => {
		const { container } = render(<PausedModalScreen content={content} handleResumeGame={jest.fn()} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
