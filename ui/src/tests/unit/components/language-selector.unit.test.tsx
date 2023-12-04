import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Locale } from '@tic-tac-toe/model';
import {
	LanguageSelector,
	type Props,
} from '../../../lib/components/language-selector/language-selector';

const mockProps: Props = {
	selectedLanguage: Locale.EN,
	setSelectedLanguage: jest.fn() as React.ChangeEventHandler<HTMLInputElement>,
};

describe('LanguageSelector component', () => {
	it('renders language options correctly', () => {
		const { getByLabelText } = render(<LanguageSelector {...mockProps} />);

		const englishLanguageInput = getByLabelText('EN');
		expect(englishLanguageInput).toBeInTheDocument();
		expect(englishLanguageInput).toHaveAttribute('value', 'en-US');
		expect(englishLanguageInput).toBeChecked();
	});
});
