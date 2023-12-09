import React from 'react';
import './styles.scss';

export enum Themes {
	WEB = 'web',
	DESKTOP = 'desktop',
}

export interface Props {
	theme?: Themes;
	children: React.ReactNode;
}

export const Theme: React.FC<Props> = React.memo(({ theme = Themes.WEB, children }) => {
	return <main className={theme}>{children}</main>;
});
