import React from 'react';
import './styles.scss';

export const Theme: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const theme = React.useMemo(() => window.electron?.theme ?? 'web', []);

	React.useEffect(() => {
		document.body.classList.add(theme);
	}, [theme]);

	return <main className={theme}>{children}</main>;
};
