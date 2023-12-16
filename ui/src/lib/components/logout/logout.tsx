import React from 'react';
import './logout.scss';

export interface Props {
	handleLogout: () => void;
}

export const Logout: React.FC<Props> = React.memo(({ handleLogout }) => {
	return <i className="logout icon-reply" onClick={handleLogout} />;
});
