import type { StoryFn, Meta } from '@storybook/react';
import { type Props, Mute } from './mute';
import { type ContainerProps, withContainer } from '../../../../.storybook/decorators';

const EnchantedMute: React.FC<Props & ContainerProps> = withContainer(Mute, 300);

const Story: Meta<typeof Mute> = {
	component: Mute,
	title: 'Components/Mute',
};
export default Story;

const Template: StoryFn<Props> = (args) => <EnchantedMute {...args} />;

export const Muted = Template.bind({});
Muted.args = {
	muted: false,
};

export const UnMuted = Template.bind({});
UnMuted.args = {
	muted: true,
};
