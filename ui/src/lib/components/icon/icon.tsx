import React from 'react';
import './icon.scss';

export interface Props {
	name: string;
	handleOnClick?: () => void;
}

export const Icon: React.FC<Props> = React.memo(({ name, handleOnClick }) => {
	return <i className={`icon ${name}`} onClick={() => handleOnClick?.()} />;
});
