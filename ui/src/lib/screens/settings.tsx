import React from 'react';
import { AppScreenContent, IntelligenceLevel, Locale, PlayerSymbol } from '@tic-tac-toe/model';
import { Button, ChooseDifficulty, LanguageSelector, SymbolChoice } from '../components';
import { BaseScreen } from './base/base';
import { Divider } from '../core';

interface Props {
	locale: Locale;
	content: AppScreenContent;
	playerSymbol: PlayerSymbol;
	selectedDifficultySetting: IntelligenceLevel;
	handleDifficultySettingsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSymbolChoiceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleLanguageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleStartGame: () => void;
}

export const SettingsScreen: React.FC<Props> = ({
	locale,
	content,
	playerSymbol,
	selectedDifficultySetting,
	handleDifficultySettingsChange,
	handleSymbolChoiceChange,
	handleLanguageChange,
	handleStartGame,
}) => {
	return (
		<BaseScreen>
			<LanguageSelector
				selectedLanguage={locale}
				setSelectedLanguage={handleLanguageChange}
			/>
			<Divider invisible margin="vertical-l" />
			<span>{content.title}</span>
			<SymbolChoice
				playerSymbol={playerSymbol}
				handleSymbolChoiceChange={handleSymbolChoiceChange}
			/>
			<sub>{content.subtitle}</sub>
			<Divider invisible margin="vertical-l" />
			<ChooseDifficulty
				selectedDifficultySetting={selectedDifficultySetting}
				handleDifficultySettingsChange={handleDifficultySettingsChange}
			/>
			<Divider invisible margin="vertical-l" />
			<Button variant="secondary" onClick={handleStartGame}>
				{content.cta1} <i className="icon-play-sign"></i>
			</Button>
		</BaseScreen>
	);
};
