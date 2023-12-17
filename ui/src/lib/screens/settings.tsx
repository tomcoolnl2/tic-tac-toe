import React from 'react';
import { AppStore } from '@tic-tac-toe/core';
import { type AppState, IntelligenceLevel, PlayerSymbol } from '@tic-tac-toe/model';
import type { AppScreenContent } from '../../../../content/src/lib/model';
import { BaseScreen } from './base/base';
import { Button, ChooseDifficulty, LanguageSelector, Logout, Mute, SymbolChoice } from '../components';
import { Divider } from '../core';
import { useBehaviorSubjectState, useInterfaceHandlers, useSettingsHandlers } from '../hooks';

interface Props {
	content: AppScreenContent;
	playerSymbol: PlayerSymbol;
	selectedDifficultySetting: IntelligenceLevel;
	handleLogout: () => void;
}

export const SettingsScreen: React.FC<Props> = React.memo(
	({ content, playerSymbol, selectedDifficultySetting, handleLogout }) => {
		//
		const [appState] = useBehaviorSubjectState<AppState>(AppStore.state$);
		const { handleStartGame, handleMuteSound } = useInterfaceHandlers(appState);
		const { handleAvatarChange, handleDifficultyChange } = useSettingsHandlers(appState);

		return (
			<BaseScreen>
				<Logout handleLogout={handleLogout} />
				<Mute muted={appState.muted} handleMuteSound={handleMuteSound} />
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
