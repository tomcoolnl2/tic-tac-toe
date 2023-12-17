import React from 'react';
import { IntelligenceLevel } from '@tic-tac-toe/model';
import { useContentContext } from '@tic-tac-toe/content';
import { Divider, FlexBox } from '../../core';
import './choose-difficulty.scss';

export interface Props {
	selectedDifficultySetting: IntelligenceLevel;
	handleDifficultyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ChooseDifficulty: React.FC<Props> = React.memo(({ selectedDifficultySetting, handleDifficultyChange }) => {
	const { appContent, isContentLoading } = useContentContext();

	const options = React.useMemo(() => Object.keys(IntelligenceLevel), []);

	const text = React.useMemo(() => {
		return appContent?.gameScreen.intelligenceLevel[options.indexOf(selectedDifficultySetting.toUpperCase())] ?? '';
	}, [appContent?.gameScreen.intelligenceLevel, options, selectedDifficultySetting]);

	return (
		!isContentLoading && (
			<FlexBox direction="column" alignItems="center" className="choose-difficulty">
				<Divider invisible margin="vertical-s" />
				<FlexBox>
					{options.reverse().map((level, i) => (
						<React.Fragment key={level}>
							<input
								id={level}
								type="radio"
								name="level"
								value={level}
								defaultChecked={selectedDifficultySetting === level}
								onChange={handleDifficultyChange}
							/>
							<label htmlFor={level} title={level} />
						</React.Fragment>
					))}
				</FlexBox>
				<Divider invisible margin="vertical-s" />
				<sup>{text}</sup>
			</FlexBox>
		)
	);
});
