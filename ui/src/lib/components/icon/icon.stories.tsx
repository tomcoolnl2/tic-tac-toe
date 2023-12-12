import type { Meta } from '@storybook/react';
import { Icon } from './icon';

const Story: Meta<typeof Icon> = {
	component: Icon,
	title: 'Components/Icon',
};
export default Story;

export const Default = {
	args: {
		name: 'icon-repeat',
	},
};
