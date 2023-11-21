import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Theme } from '../../../lib/theme/theme';

describe('Theme component', () => {
	it('renders children within a main tag', () => {
		const ChildComponent = () => <h1>Child component</h1>;

		const { getByRole, getByText } = render(
			<Theme>
				<ChildComponent />
			</Theme>
		);

		const mainElement = getByRole('main');
		expect(mainElement).toBeInTheDocument();

		const childComponentElement = getByText('Child component');
		expect(childComponentElement).toBeInTheDocument();
	});
});
