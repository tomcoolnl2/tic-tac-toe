import type { Meta } from '@storybook/react';
import { Timer } from '../';

const Story: Meta<typeof Timer> = {
	component: Timer,
	title: 'Components/Timer',
};
export default Story;

export const Default = {
	args: {},
};
