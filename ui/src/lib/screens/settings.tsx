import React from 'react';
import { AppStore } from '@tic-tac-toe/core';
import { type AppState, type User, IntelligenceLevel, PlayerSymbol } from '@tic-tac-toe/model';
import type { AppScreenContent } from '../context/content/model';
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

export const SettingsScreen: React.FC<Props> = React.memo(
	({ content, playerSymbol, selectedDifficultySetting, handleLogout }) => {
		const [appState] = useBehaviorSubjectState<AppState>(AppStore.state$);
		const [userState] = useBehaviorSubjectState<User>(AppStore.user$);
		const { handleStartGame } = useGameHandlers(appState, userState);
		const { handleAvatarChange, handleDifficultyChange } = useSettingsHandlers(appState);

		return (
			<BaseScreen>
				<Logout handleLogout={handleLogout} />
				<LanguageSelector />
				<Divider invisible margin="vertical-l" className="landscape-hidden" />
				<span>{content.title}</span>
				<SymbolChoice playerSymbol={playerSymbol} handleAvatarChange={handleAvatarChange} />
				<sub>{content.subtitle}</sub>
				<Divider invisible margin="bottom" />
				<Divider invisible margin="vertical" className="landscape-hidden" />
				<ChooseDifficulty
					selectedDifficultySetting={selectedDifficultySetting}
					handleDifficultyChange={handleDifficultyChange}
				/>
				<Divider invisible margin="vertical" />
				<Divider invisible margin="bottom" className="landscape-hidden" />
				<Button variant="secondary" onClick={handleStartGame}>
					{content.cta1} <i className="icon-play-sign" />
				</Button>
			</BaseScreen>
		);
	}
);
