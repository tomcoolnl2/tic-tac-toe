// Inspiration: https://github.com/mui-org/material-ui/blob/master/packages/mui-material/src/Grid/Grid.js

import React from 'react';
import classNames from 'classnames';
import './grid.scss';

export type GridOption = 1 | 2 | 3 | 4 | 5 | string;

export interface GridProps {
	cols?: GridOption;
	rows?: GridOption;
	colGap?: 's' | 'm' | 'l';
	rowGap?: 's' | 'm' | 'l';
	alignItems?: string;
	padding?: 's' | 'm' | 'l';
	autoFlow?: string;
	rowHeight?: string;
	colWidth?: string;
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
}

export const Grid: React.FC<GridProps> = React.memo((props) => {
	const rowHeight = props.rowHeight ?? '1fr';
	const colWidth = props.colWidth ?? '1fr';

	const style: React.CSSProperties = {
		'--row-height': rowHeight,
		'--col-width': colWidth,
	} as unknown as React.CSSProperties;

	if (props.autoFlow) {
		style.gridAutoFlow = props.autoFlow;
	}

	if (typeof props.cols === 'string') {
		style.gridTemplateColumns = props.cols;
	}

	if (typeof props.rows === 'string') {
		style.gridTemplateRows = props.rows;
	}

	if (props.alignItems) {
		style.alignItems = props.alignItems;
	}

	return (
		<div
			style={{ ...style, ...props.style }}
			className={classNames(
				'container',
				{
					[`cols-${props.cols}`]: typeof props.cols === 'number',
					[`rows-${props.rows}`]: typeof props.rows === 'number',
					[`col-gap-${props.colGap}`]: props.colGap,
					[`row-gap-${props.rowGap}`]: props.rowGap,
					[`padding-${props.padding}`]: props.padding,
				},
				props.className
			)}
		>
			{props.children}
		</div>
	);
});
