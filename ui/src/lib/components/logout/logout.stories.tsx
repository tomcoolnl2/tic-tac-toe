import { StoryFn, type Meta } from '@storybook/react';
import { Logout, Props } from './logout';
import { ContainerProps, withContainer } from '../../../../.storybook/decorators';

const EnchantedLogout: React.FC<Props & ContainerProps> = withContainer(Logout, 300);

const Story: Meta<typeof Logout> = {
	component: Logout,
	title: 'Components/Logout',
};
export default Story;

const Template: StoryFn<Props> = (args) => <EnchantedLogout {...args} />;

export const LogoutIcon = Template.bind({});
