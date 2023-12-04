import { StoryFn, type Meta } from '@storybook/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { withContainer, type ContainerProps } from '../../decorators';
import { SymbolChoice, type Props } from './symbol-choice';

const EnchantedSymbolChoice: React.FC<Props & ContainerProps> = withContainer(SymbolChoice, 320);
const Story: Meta<typeof SymbolChoice> = {
	component: EnchantedSymbolChoice,
	title: 'Components/SymbolChoice',
};
export default Story;

const Template: StoryFn<Props> = (args) => <EnchantedSymbolChoice {...args} />;

export const ChoosePlayerO = Template.bind({});
ChoosePlayerO.args = {
	playerSymbol: PlayerSymbol.O,
	handleAvatarChange: (): null => null,
};

export const ChoosePlayerX = Template.bind({});
ChoosePlayerX.args = {
	playerSymbol: PlayerSymbol.X,
	handleAvatarChange: (): null => null,
};
