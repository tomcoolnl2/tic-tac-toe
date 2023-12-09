import React, { FC } from 'react';
import classNames from 'classnames';
import './divider.scss';

enum Variants {
	fullWidth = 'full-width',
	inset = 'inset',
	middle = 'middle',
}

enum Orientation {
	horizontal = 'horizontal',
	vertical = 'vertical',
}

enum Margin {
	top = 'top',
	bottom = 'bottom',
	left = 'left',
	right = 'right',
	horizontal = 'horizontal',
	vertical = 'vertical',
	topS = 'top-s',
	bottomS = 'bottom-s',
	leftS = 'left-s',
	rightS = 'right-s',
	horizontalS = 'horizontal-s',
	verticalS = 'vertical-s',
	verticalL = 'vertical-l',
}

export interface DividerProps {
	variant?: `${Variants}`;
	orientation?: `${Orientation}`;
	margin?: `${Margin}`;
	invisible?: boolean;
	className?: string;
}

export const Divider: FC<DividerProps> = React.memo(
	({ variant, orientation, margin, invisible, className }) => (
		<hr
			className={classNames(
				'divider',
				variant || 'full-width',
				orientation || 'horizontal',
				margin && `margin-${margin}`,
				invisible && 'invisible',
				className
			)}
		/>
	)
);
