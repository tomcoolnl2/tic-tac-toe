import type { StoryFn, Meta } from '@storybook/react';
import { IntelligenceLevel } from '@tic-tac-toe/model';
import { type ContainerProps, withContainer } from '../../../../.storybook/decorators';
import { type Props, ChooseDifficulty } from './choose-difficulty';

const EnchantedChooseDifficulty: React.FC<Props & ContainerProps> = withContainer(
	ChooseDifficulty,
	300
);
const Story: Meta<typeof ChooseDifficulty> = {
	component: ChooseDifficulty,
	title: 'Components/ChooseDifficulty',
};
export default Story;

const Template: StoryFn<Props> = (args) => <EnchantedChooseDifficulty {...args} />;

export const ChooseDifficultyEasy = Template.bind({});
ChooseDifficultyEasy.args = {
	selectedDifficultySetting: IntelligenceLevel.EASY,
};

export const ChooseDifficultyNovice = Template.bind({});
ChooseDifficultyNovice.args = {
	selectedDifficultySetting: IntelligenceLevel.MEDIUM,
};

export const ChooseDifficultyMaster = Template.bind({});
ChooseDifficultyMaster.args = {
	selectedDifficultySetting: IntelligenceLevel.HARD,
};
