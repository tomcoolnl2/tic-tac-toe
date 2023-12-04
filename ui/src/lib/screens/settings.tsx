import React from 'react';
import { AppScreenContent, IntelligenceLevel, Locale, PlayerSymbol } from '@tic-tac-toe/model';
import { Button, ChooseDifficulty, LanguageSelector, Logout, SymbolChoice } from '../components';
import { BaseScreen } from './base/base';
import { Divider } from '../core';

interface Props {
	language: Locale;
	content: AppScreenContent;
	playerSymbol: PlayerSymbol;
	selectedDifficultySetting: IntelligenceLevel;
	handleDifficultyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleLanguageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleStartGame: () => void;
	handleLogout: () => void;
}

export const SettingsScreen: React.FC<Props> = ({
	language,
	content,
	playerSymbol,
	selectedDifficultySetting,
	handleDifficultyChange,
	handleAvatarChange,
	handleLanguageChange,
	handleStartGame,
	handleLogout,
}) => {
	return (
		<BaseScreen>
			<Logout handleLogout={handleLogout} />
			<LanguageSelector
				selectedLanguage={language}
				setSelectedLanguage={handleLanguageChange}
			/>
			<Divider invisible margin="vertical-l" />
			<span>{content.title}</span>
			<SymbolChoice playerSymbol={playerSymbol} handleAvatarChange={handleAvatarChange} />
			<sub>{content.subtitle}</sub>
			<Divider invisible margin="vertical-l" />
			<ChooseDifficulty
				selectedDifficultySetting={selectedDifficultySetting}
				handleDifficultyChange={handleDifficultyChange}
			/>
			<Divider invisible margin="vertical-l" />
			<Button variant="secondary" onClick={handleStartGame}>
				{content.cta1} <i className="icon-play-sign"></i>
			</Button>
		</BaseScreen>
	);
};
