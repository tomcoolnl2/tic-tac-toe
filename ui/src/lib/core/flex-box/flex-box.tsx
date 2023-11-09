// Inspiration: https://github.com/mui-org/material-ui/blob/master/packages/mui-material/src/FlexBox/FlexBox.js

import React, { FC } from 'react';
import classNames from 'classnames';
import './flex-box.scss';

type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type Justify =
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-evenly'
    | 'space-between'
    | 'space-around';
type Alignment = 'flex-start' | 'flex-end' | 'center';
type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface FlexBoxProps {
    forwardRef?: React.RefObject<HTMLDivElement>;
    wrap?: boolean;
    item?: boolean;
    xs?: Columns;
    s?: Columns;
    m?: Columns;
    l?: Columns;
    xl?: Columns;
    spacing?: 's' | 'm' | 'l';
    direction?: Direction;
    justifyContent?: Justify;
    alignItems?: Alignment;
    title?: string;
    onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter?: (event?: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave?: (event?: React.MouseEvent<HTMLDivElement>) => void;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const FlexBox: FC<FlexBoxProps> = ({
    forwardRef,
    wrap,
    item,
    xs,
    s,
    m,
    l,
    xl,
    spacing,
    direction = 'row',
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
    title,
    onClick,
    onMouseEnter,
    onMouseLeave,
    className,
    style,
    children,
}) => (
    <div
        ref={forwardRef}
        title={title}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={style}
        className={classNames(
            'flex-box',
            `direction-${direction}`,
            `justify-content-${justifyContent}`,
            `align-items-${alignItems}`,
            {
                ['wrap']: wrap,
                ['item']: item,
                [`xs-${xs}`]: xs,
                [`s-${s}`]: s,
                [`m-${m}`]: m,
                [`l-${l}`]: l,
                [`xl-${xl}`]: xl,
                [`spacing-${spacing}`]: spacing,
            },
            className
        )}
    >
        {children}
    </div>
);
