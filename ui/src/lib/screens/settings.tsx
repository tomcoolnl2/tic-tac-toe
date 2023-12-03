import React from 'react';
import {
	AppScreenContent,
	IntelligenceLevel,
	PlayerSymbol,
} from '@tic-tac-toe/model';
import { Divider } from '../core';
import { Button, ChooseDifficulty, SymbolChoice } from '../components';
import { BaseScreen } from './base/base';

interface Props {
	content: AppScreenContent;
	playerSymbol: PlayerSymbol;
	selectedDifficultySetting: IntelligenceLevel;
	handleDifficultySettingsChange: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
	handleSymbolChoiceChange: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
	handleStartGame: () => void;
}

export const SettingsScreen: React.FC<Props> = ({
	content,
	playerSymbol,
	selectedDifficultySetting,
	handleDifficultySettingsChange,
	handleSymbolChoiceChange,
	handleStartGame,
}) => {
	return (
		<BaseScreen>
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
