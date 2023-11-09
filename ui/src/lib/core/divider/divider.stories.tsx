import React from 'react';
import { Divider } from './divider';
import { Meta } from '@storybook/react';
import { Typography } from '..';

export default {
    title: 'Components/Divider',
    component: Divider,
    decorators: [
        (Story) => (
            <div
                style={{
                    display: 'grid',
                    gridTemplateRows: '150px',
                    gridTemplateColumns: '200px',
                    position: 'relative',
                }}
            >
                <Story />
            </div>
        ),
    ],
} as Meta;

const withText = (element: React.ReactChild, flex?: boolean) => (
    <div style={flex ? { display: 'flex' } : undefined}>
        <Typography.Text>Some Text 1</Typography.Text>
        {element}
        <Typography.Text>Some Text 2</Typography.Text>
    </div>
);

export const HorizontalFullWidth = () =>
    withText(<Divider orientation="horizontal" margin="vertical" />);
export const HorizontalInset = () =>
    withText(
        <Divider variant="inset" orientation="horizontal" margin="vertical" />
    );
export const HorizontalMiddle = () =>
    withText(
        <Divider variant="middle" orientation="horizontal" margin="vertical" />
    );

export const VerticalFullHeight = () =>
    withText(<Divider orientation="vertical" margin="horizontal" />, true);
export const VerticalInset = () =>
    withText(
        <Divider variant="inset" orientation="vertical" margin="horizontal" />,
        true
    );
export const VerticalMiddle = () =>
    withText(
        <Divider variant="middle" orientation="vertical" margin="horizontal" />,
        true
    );
