import type { Meta } from '@storybook/react';
import { AppLogo } from '../../components';

const Story: Meta<typeof AppLogo> = {
    component: AppLogo,
    title: 'Components/AppLogo',
};
export default Story;

export const Default = {
    args: {},
};
