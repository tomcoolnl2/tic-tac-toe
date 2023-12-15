import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { IntelligenceLevel } from '@tic-tac-toe/model';
import { Difficulty, type Props } from '../../../lib/components/difficulty/difficulty';

describe('Difficulty Component', () => {
	test('renders Difficulty component with correct intelligence level class', () => {
		const props: Props = {
			intelligenceLevel: IntelligenceLevel.EASY,
		};

		const { container } = render(<Difficulty {...props} />);

		// Check if the component renders
		const difficultyComponent = container.querySelector('.difficulty');
		expect(difficultyComponent).toBeInTheDocument();

		// Check if the correct intelligence level class is applied
		const intelligenceLevelClass = `difficulty-${props.intelligenceLevel.toLowerCase()}`;
		expect(difficultyComponent).toHaveClass(intelligenceLevelClass);

		// Check if three stars are rendered
		const stars = container.querySelectorAll('.star');
		expect(stars.length).toBe(3); // Assuming the component should always render three stars
	});
});
