import type { StoryFn, Meta } from '@storybook/react';
import { type Props, Modal } from './modal';

const Story: Meta<typeof Modal> = {
	component: Modal,
	title: 'Components/Modal',
};
export default Story;

const Template: StoryFn<Props> = (args) => (
	<Modal {...args}>
		<h2>Modal header</h2>
		<br />
		<small>With some subtext</small>
	</Modal>
);

export const Default = Template.bind({});
Default.args = {};
