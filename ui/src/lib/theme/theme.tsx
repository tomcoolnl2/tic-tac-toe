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

export const Theme: React.FC<Props> = ({ theme = Themes.WEB, children }) => {
	React.useEffect(() => {
		Object.values(Themes).map((theme) => document.body.classList.remove(theme));
		document.body.classList.add(theme);
	}, [theme]);

	return <main>{children}</main>;
};
