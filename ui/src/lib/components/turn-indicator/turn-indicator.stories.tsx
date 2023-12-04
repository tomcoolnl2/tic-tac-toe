import { StoryFn, type Meta } from '@storybook/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { withContainer, type ContainerProps } from '../../decorators';
import { TurnIndicator, Props } from './turn-indicator';

const EnchantedTurnIndicator: React.FC<Props & ContainerProps> = withContainer(TurnIndicator, 90);
const Story: Meta<typeof TurnIndicator> = {
	title: 'Components/TurnIndicator',
	component: TurnIndicator,
};
export default Story;

const Template: StoryFn<Props> = (args) => <EnchantedTurnIndicator {...args} />;
const content = ['Your turn', "CPU's Turn"] as [string, string];

export const TurnX = Template.bind({});
TurnX.args = {
	currentPlayer: PlayerSymbol.X,
	content,
};

export const TurnO = Template.bind({});
TurnO.args = {
	currentPlayer: PlayerSymbol.O,
	content,
};
