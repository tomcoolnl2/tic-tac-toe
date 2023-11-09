import React from 'react';
import { IntelligenceLevel, PlayerSymbol } from '@tic-tac-toe/model';
import { Divider, FlexBox } from '@tic-tac-toe/ui';
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
		<FlexBox direction="column" alignItems="center">
			<AppLogo />
			<Divider invisible margin="vertical-l" />
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
		</FlexBox>
	);
};
