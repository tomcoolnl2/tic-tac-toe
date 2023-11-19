import { StoryFn, type Meta } from '@storybook/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { withContainer, type ContainerProps } from '../../decorators';
import { ScoreBoardItem, type Props } from './score-board-item';

const EnchantedScoreBoardItem: React.FC<Props & ContainerProps> = withContainer(
	ScoreBoardItem,
	100
);

const Story: Meta<typeof ScoreBoardItem> = {
	component: EnchantedScoreBoardItem,
	title: 'Components/ScoreBoardItem',
};
export default Story;

const Template: StoryFn<Props> = (args) => (
	<EnchantedScoreBoardItem {...args} />
);

export const PlayerScore = Template.bind({});
PlayerScore.args = {
	score: 5,
	playerSymbol: PlayerSymbol.X,
	cpuSymbol: PlayerSymbol.O,
	index: 0,
};

export const TieScore = Template.bind({});
TieScore.args = {
	score: 3,
	playerSymbol: PlayerSymbol.X,
	cpuSymbol: PlayerSymbol.O,
	index: 1,
};

export const CpuScore = Template.bind({});
CpuScore.args = {
	score: 2,
	playerSymbol: PlayerSymbol.X,
	cpuSymbol: PlayerSymbol.O,
	index: 2,
};
