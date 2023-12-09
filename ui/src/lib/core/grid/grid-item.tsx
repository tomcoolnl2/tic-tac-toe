import React from 'react';

interface Props {
	children?: React.ReactNode;
	columnStart?: string;
	columnEnd?: string;
	placeSelf?: string;
}

export const GridItem: React.FC<Props> = React.memo(
	({ children, columnStart: gridColumnStart, columnEnd: gridColumnEnd, placeSelf }) => {
		return <div style={{ gridColumnStart, gridColumnEnd, placeSelf }}>{children}</div>;
	}
);
