import React from 'react';
import { IntelligenceLevel } from '@tic-tac-toe/model';
import { Divider, FlexBox } from '../../core';
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
		<FlexBox
			direction="column"
			alignItems="center"
			className="choose-difficulty"
		>
			<FlexBox>
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
			</FlexBox>
			<Divider invisible margin="vertical-s" />
			<sup>{selectedDifficultySetting}</sup>
		</FlexBox>
	);
};
