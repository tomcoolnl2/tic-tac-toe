import type { Meta } from '@storybook/react';
import { Spinner } from '../';

const Story: Meta<typeof Spinner> = {
	component: Spinner,
	title: 'Components/Spinner',
};
export default Story;

export const Default = {
	args: {},
};
