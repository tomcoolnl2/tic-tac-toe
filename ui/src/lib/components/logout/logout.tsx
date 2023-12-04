import React from 'react';
import './logout.scss';

export interface Props {
	handleLogout: () => void;
}

export const Logout: React.FC<Props> = ({ handleLogout }) => {
	return (
		<div className="logout" onClick={handleLogout}>
			<i className="icon-reply" />
		</div>
	);
};
