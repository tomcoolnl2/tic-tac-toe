import type { StoryFn, Meta } from '@storybook/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { Avatar, Props } from './avatar';

const Story: Meta<typeof Avatar> = {
	title: 'Components/Avatar',
	component: Avatar,
};
export default Story;

const Template: StoryFn<Props> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
	type: PlayerSymbol.X,
	size: 'm',
};

export const LargeAvatar = Template.bind({});
LargeAvatar.args = {
	type: PlayerSymbol.O,
	size: 'xl',
};

export const DarkVariant = Template.bind({});
DarkVariant.args = {
	type: PlayerSymbol.X,
	size: 's',
	variant: 'dark',
};

export const LightVariant = Template.bind({});
LightVariant.args = {
	type: PlayerSymbol.O,
	size: 'l',
	variant: 'light',
};
