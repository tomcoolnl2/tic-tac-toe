import { StoryFn, type Meta } from '@storybook/react';
import { Input, Props } from './input';
import { ContainerProps, withContainer } from '../../decorators';

const EnchantedInput: React.FC<Props & ContainerProps> = withContainer(
	Input,
	300
);

const Story: Meta<typeof Input> = {
	component: Input,
	title: 'Components/Input',
};
export default Story;

const Template: StoryFn<Props> = (args) => <EnchantedInput {...args} />;

export const TextInput = Template.bind({});
TextInput.args = {
	id: 'username',
	value: 'test',
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
	type: 'password',
	id: 'password',
	value: '',
};
