import React from 'react';
import { IntelligenceLevel } from '@tic-tac-toe/model';
import * as TTTUI from '@tic-tac-toe/ui';
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
		<TTTUI.FlexBox
			direction="column"
			alignItems="center"
			className="choose-difficulty"
		>
			<TTTUI.FlexBox>
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
			</TTTUI.FlexBox>
			<TTTUI.Divider invisible margin="vertical-s" />
			<sup>{selectedDifficultySetting}</sup>
		</TTTUI.FlexBox>
	);
};
