import React from 'react';
import { AppStore } from '@tic-tac-toe/core';
import {
	AppScreenContent,
	AppState,
	IntelligenceLevel,
	PlayerSymbol,
	User,
} from '@tic-tac-toe/model';
import { BaseScreen } from './base/base';
import { Button, ChooseDifficulty, LanguageSelector, Logout, SymbolChoice } from '../components';
import { Divider } from '../core';
import { useBehaviorSubjectState, useGameHandlers, useSettingsHandlers } from '../hooks';

interface Props {
	content: AppScreenContent;
	playerSymbol: PlayerSymbol;
	selectedDifficultySetting: IntelligenceLevel;
	handleLogout: () => void;
}

export const SettingsScreen: React.FC<Props> = ({
	content,
	playerSymbol,
	selectedDifficultySetting,
	handleLogout,
}) => {
	const [appState] = useBehaviorSubjectState<AppState>(AppStore.state$);
	const [userState] = useBehaviorSubjectState<User>(AppStore.user$);
	const { handleStartGame } = useGameHandlers(appState, userState);
	const { handleAvatarChange, handleDifficultyChange } = useSettingsHandlers(appState);

	return (
		<BaseScreen>
			<Logout handleLogout={handleLogout} />
			<LanguageSelector />
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
				{content.cta1} <i className="icon-play-sign" />
			</Button>
		</BaseScreen>
	);
};
