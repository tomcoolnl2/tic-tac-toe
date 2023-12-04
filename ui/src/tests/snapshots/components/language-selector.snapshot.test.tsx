import { render } from '@testing-library/react';
import {
	LanguageSelector,
	Props,
} from '../../../lib/components/language-selector/language-selector';
import { Locale } from '@tic-tac-toe/model';

const mockProps: Props = {
	selectedLanguage: Locale.中文,
	setSelectedLanguage: jest.fn(),
};

describe('LanguageSelector component', () => {
	it('renders correctly', () => {
		const tree = render(<LanguageSelector {...mockProps} />);
		expect(tree).toMatchSnapshot();
	});
});
