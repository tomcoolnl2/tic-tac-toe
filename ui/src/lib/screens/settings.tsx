import React from 'react';
import { IntelligenceLevel, PlayerSymbol } from '@tic-tac-toe/model';
import { Divider } from '../core';
import { Button, ChooseDifficulty, SymbolChoice } from '../components';
import { BaseScreen } from './base/base';

interface Props {
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
	playerSymbol,
	selectedDifficultySetting,
	handleDifficultySettingsChange,
	handleSymbolChoiceChange,
	handleStartGame,
}) => {
	return (
		<BaseScreen>
			<Divider invisible margin="vertical-l" />
			<span>Loading</span>
			<Divider invisible margin="vertical" />
			<span>Pic Player 1's Mark</span>
			<SymbolChoice
				playerSymbol={playerSymbol}
				handleSymbolChoiceChange={handleSymbolChoiceChange}
			/>
			<sub>Remember, X goes first</sub>
			<Divider invisible margin="vertical-l" />
			<ChooseDifficulty
				selectedDifficultySetting={selectedDifficultySetting}
				handleDifficultySettingsChange={handleDifficultySettingsChange}
			/>
			<Divider invisible margin="vertical-l" />
			<Button variant="secondary" onClick={handleStartGame}>
				Start game <i className="icon-play-sign"></i>
			</Button>
		</BaseScreen>
	);
};
