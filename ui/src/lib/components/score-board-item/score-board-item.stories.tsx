import { StoryFn, type Meta } from '@storybook/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { withContainer, type ContainerProps } from '../../decorators';
import { ScoreBoardItem, type Props } from './score-board-item';

const EnchantedScoreBoardItem: React.FC<Props & ContainerProps> = withContainer(
	ScoreBoardItem,
	130
);

const Story: Meta<typeof ScoreBoardItem> = {
	component: EnchantedScoreBoardItem,
	title: 'Components/ScoreBoardItem',
};
export default Story;

const Template: StoryFn<Props> = (args) => <EnchantedScoreBoardItem {...args} />;
const content = ['You', 'Ties', 'CPU'] as [string, string, string];

export const PlayerScore = Template.bind({});
PlayerScore.args = {
	score: 5,
	playerSymbol: PlayerSymbol.X,
	cpuSymbol: PlayerSymbol.O,
	index: 0,
	content,
};

export const TieScore = Template.bind({});
TieScore.args = {
	score: 3,
	playerSymbol: PlayerSymbol.X,
	cpuSymbol: PlayerSymbol.O,
	index: 1,
	content,
};

export const CpuScore = Template.bind({});
CpuScore.args = {
	score: 2,
	playerSymbol: PlayerSymbol.X,
	cpuSymbol: PlayerSymbol.O,
	index: 2,
	content,
};
