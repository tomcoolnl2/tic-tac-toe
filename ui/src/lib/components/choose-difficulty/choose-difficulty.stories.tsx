import { StoryFn, type Meta } from '@storybook/react';
import { ChooseDifficulty, Props } from './choose-difficulty';
import { withContainer, type ContainerProps } from '../../decorators';
import { IntelligenceLevel } from '@tic-tac-toe/model';

const EnchantedChooseDifficulty: React.FC<Props & ContainerProps> =
	withContainer(ChooseDifficulty, 320);
const Story: Meta<typeof ChooseDifficulty> = {
	component: ChooseDifficulty,
	title: 'Components/ChooseDifficulty',
};
export default Story;

const Template: StoryFn<Props> = (args) => (
	<EnchantedChooseDifficulty {...args} />
);

export const ChooseDifficultyEasy = Template.bind({});
ChooseDifficultyEasy.args = {
	selectedDifficultySetting: IntelligenceLevel.BIEBER,
};

export const ChooseDifficultyNovice = Template.bind({});
ChooseDifficultyNovice.args = {
	selectedDifficultySetting: IntelligenceLevel.NOVICE,
};

export const ChooseDifficultyMaster = Template.bind({});
ChooseDifficultyMaster.args = {
	selectedDifficultySetting: IntelligenceLevel.MASTER,
};
