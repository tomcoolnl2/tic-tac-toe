import React from 'react';
import './icon.scss';

export interface Props {
	name: string;
	testId?: string;
	handleOnClick?: () => void;
}

export const Icon: React.FC<Props> = React.memo(({ name, testId, handleOnClick }) => {
	return <i className={`icon ${name}`} onClick={() => handleOnClick?.()} data-testid={testId} />;
});
