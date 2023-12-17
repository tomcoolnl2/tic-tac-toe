import React from 'react';
import { AppState, Locale } from '@tic-tac-toe/model';
import './language-selector.scss';
import { useBehaviorSubjectState, useSettingsHandlers } from '../../hooks';
import { AppStore } from '@tic-tac-toe/core';

export const LanguageSelector: React.FC = React.memo(() => {
	const [appState] = useBehaviorSubjectState<AppState>(AppStore.state$);
	const { handleLanguageChange } = useSettingsHandlers();
	const { language } = appState;
	return (
		<div className="language-selector">
			{Object.entries(Locale).map(([lang, locale]) => (
				<React.Fragment key={locale}>
					<input
						id={lang}
						type="radio"
						name="language-selector"
						value={locale}
						defaultChecked={language === locale}
						onChange={handleLanguageChange}
					/>
					<label
						htmlFor={lang}
						title={locale}
						className={language === locale ? 'selected-language' : undefined}
					>
						{lang}
					</label>
				</React.Fragment>
			))}
		</div>
	);
});
