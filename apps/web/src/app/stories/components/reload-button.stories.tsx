import type { Meta } from '@storybook/react';
import { ReloadButton } from '../../components';


const Story: Meta<typeof ReloadButton> = {
    component: ReloadButton,
    title: 'Components/ReloadButton',
};
export default Story;

export const Default = {
    args: { 
        disabled: false,
    },
};
