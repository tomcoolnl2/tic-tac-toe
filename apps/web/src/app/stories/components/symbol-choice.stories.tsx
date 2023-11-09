import { StoryFn, type Meta } from '@storybook/react';
import { SymbolChoice, Props } from '../../components/symbol-choice/symbol-choice';
import { PlayerSymbol } from '../../core/model';
import { withContainer, type ContainerProps } from '../helpers';

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
    handleSymbolChoiceChange: (): null => null
};

export const ChoosePlayerX = Template.bind({});
ChoosePlayerX.args = {
    playerSymbol: PlayerSymbol.X,
    handleSymbolChoiceChange: (): null => null
};
  