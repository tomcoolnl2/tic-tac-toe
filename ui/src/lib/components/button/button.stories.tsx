import type { StoryFn, Meta } from '@storybook/react';
import { withContainer, type ContainerProps } from '../../decorators';
import { Button, Props } from './button';

const EnchantedButton: React.FC<Props & ContainerProps> = withContainer(
	Button,
	175
);

const Story: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
};

export default Story;

const PrimaryButtonTemplate: StoryFn<Props> = (args) => (
	<EnchantedButton {...args}>Primary Button</EnchantedButton>
);
export const Primary = PrimaryButtonTemplate.bind({});
Primary.args = {
	variant: 'primary',
	disabled: false,
};

const SecondaryButtonTemplate: StoryFn<Props> = (args) => (
	<EnchantedButton {...args}>Secondary Button</EnchantedButton>
);
export const Secondary = SecondaryButtonTemplate.bind({});
Secondary.args = {
	variant: 'secondary',
	disabled: false,
};

const DarkButtonTemplate: StoryFn<Props> = (args) => (
	<EnchantedButton {...args}>Dark Button</EnchantedButton>
);
export const Dark = DarkButtonTemplate.bind({});
Dark.args = {
	variant: 'dark',
	disabled: false,
};

const LightButtonTemplate: StoryFn<Props> = (args) => (
	<EnchantedButton {...args}>Light Button</EnchantedButton>
);
export const Light = LightButtonTemplate.bind({});
Light.args = {
	variant: 'light',
	disabled: false,
};
