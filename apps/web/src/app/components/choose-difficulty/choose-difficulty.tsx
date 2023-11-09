import React from 'react';
import * as ArenaUI from '@tic-tac-toe/ui';
import { IntelligenceLevel } from '../../core/model';
import './choose-difficulty.scss';

export interface Props {
	selectedDifficultySetting: IntelligenceLevel;
	handleDifficultySettingsChange: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
}

export const ChooseDifficulty: React.FC<Props> = ({
	selectedDifficultySetting,
	handleDifficultySettingsChange,
}) => {
	return (
		<ArenaUI.FlexBox
			direction="column"
			alignItems="center"
			className="choose-difficulty"
		>
			<ArenaUI.FlexBox>
				{Object.values(IntelligenceLevel)
					.reverse()
					.map((level) => (
						<React.Fragment key={level}>
							<input
								id={level}
								type="radio"
								name="level"
								value={level}
								checked={selectedDifficultySetting === level}
								onChange={handleDifficultySettingsChange}
							/>
							<label htmlFor={level} title={level} />
						</React.Fragment>
					))}
			</ArenaUI.FlexBox>
			<ArenaUI.Divider invisible margin="vertical-s" />
			<sup>{selectedDifficultySetting}</sup>
		</ArenaUI.FlexBox>
	);
};
