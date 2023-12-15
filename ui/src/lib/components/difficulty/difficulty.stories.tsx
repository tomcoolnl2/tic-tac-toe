import type { StoryFn, Meta } from '@storybook/react';
import { IntelligenceLevel } from '@tic-tac-toe/model';
import { type ContainerProps, withContainer } from '../../../../.storybook/decorators';
import { type Props, Difficulty } from './difficulty';

const EnchantedDifficulty: React.FC<Props & ContainerProps> = withContainer(Difficulty, 300);
const Story: Meta<typeof Difficulty> = {
	component: Difficulty,
	title: 'Components/Difficulty',
};
export default Story;

const Template: StoryFn<Props> = (args) => <EnchantedDifficulty {...args} />;

export const DefaultDifficulty = Template.bind({});
DefaultDifficulty.args = {
	intelligenceLevel: IntelligenceLevel.EASY,
};
