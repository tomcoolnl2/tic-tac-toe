import { render } from '@testing-library/react';
import { Difficulty } from '../../../lib/components';
import { IntelligenceLevel } from '@tic-tac-toe/model';

test('Difficulty component snapshot test', () => {
	const { container } = render(<Difficulty intelligenceLevel={IntelligenceLevel.MEDIUM} />);
	expect(container).toMatchSnapshot();
});
