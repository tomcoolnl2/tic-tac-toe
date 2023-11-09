import { StoryFn, type Meta } from '@storybook/react';
import { TurnIndicator, Props } from '../../components/turn-indicator/turn-indicator';
import { PlayerSymbol } from '../../core/model';
import { withContainer, type ContainerProps } from '../helpers';


const EnchantedTurnIndicator: React.FC<Props & ContainerProps> = withContainer(TurnIndicator, 90);
const Story: Meta<typeof TurnIndicator> = {
    title: 'Components/TurnIndicator',
    component: TurnIndicator,
};
export default Story;


const Template: StoryFn<Props> = (args) => <EnchantedTurnIndicator {...args} />;

export const TurnX = Template.bind({});
TurnX.args = {
    currentPlayer: PlayerSymbol.X,
};
  
export const TurnO = Template.bind({});
TurnO.args = {
    currentPlayer: PlayerSymbol.O,
};
