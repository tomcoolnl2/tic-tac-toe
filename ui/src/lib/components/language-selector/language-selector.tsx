import React from 'react';
import { Locale } from '@tic-tac-toe/model';
import './language-selector.scss';

export interface Props {
	selectedLanguage: Locale;
	setSelectedLanguage: React.ChangeEventHandler<HTMLInputElement>;
}

export const LanguageSelector: React.FC<Props> = ({ selectedLanguage, setSelectedLanguage }) => {
	return (
		<div className="language-selector">
			{Object.entries(Locale).map(([lang, locale]) => (
				<React.Fragment key={locale}>
					<input
						id={lang}
						type="radio"
						name="level"
						value={locale}
						defaultChecked={selectedLanguage === locale}
						onChange={setSelectedLanguage}
					/>
					<label
						htmlFor={lang}
						title={locale}
						className={selectedLanguage === locale ? 'selected-language' : undefined}
					>
						{lang}
					</label>
				</React.Fragment>
			))}
		</div>
	);
};
