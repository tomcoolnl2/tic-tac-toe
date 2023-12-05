import type { Meta, StoryFn } from '@storybook/react';
import { type ContainerProps, withContainer } from '../../../../.storybook/decorators';
import { type Props, Input } from './input';

const EnchantedInput: React.FC<Props & ContainerProps> = withContainer(Input, 300);

const Story: Meta<typeof Input> = {
	component: Input,
	title: 'Components/Input',
};
export default Story;

const Template: StoryFn<Props> = (args) => <EnchantedInput {...args} />;

export const TextInput = Template.bind({});
TextInput.args = {
	icon: 'user',
	id: 'username',
	value: 'test',
} as Props;

export const PasswordInput = Template.bind({});
PasswordInput.args = {
	icon: 'lock',
	type: 'password',
	id: 'password',
	value: '',
} as Props;
