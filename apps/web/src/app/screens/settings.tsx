import React from 'react';
import * as ArenaUI from '@tic-tac-toe/ui';
import { IntelligenceLevel, PlayerSymbol } from '../core/model';
import { AppLogo, Button, ChooseDifficulty, SymbolChoice } from '../components';

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
		<ArenaUI.FlexBox direction="column" alignItems="center">
			<AppLogo />
			<ArenaUI.Divider invisible margin="vertical-l" />
			<span>Pic Player 1's Mark</span>
			<SymbolChoice
				playerSymbol={playerSymbol}
				handleSymbolChoiceChange={handleSymbolChoiceChange}
			/>
			<sub>Remember, X goes first</sub>
			<ArenaUI.Divider invisible margin="vertical-l" />
			<ChooseDifficulty
				selectedDifficultySetting={selectedDifficultySetting}
				handleDifficultySettingsChange={handleDifficultySettingsChange}
			/>
			<ArenaUI.Divider invisible margin="vertical-l" />
			<Button variant="secondary" onClick={handleStartGame}>
				Start game <i className="icon-play-sign"></i>
			</Button>
		</ArenaUI.FlexBox>
	);
};
