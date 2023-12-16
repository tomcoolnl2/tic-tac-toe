import React from 'react';
import { Icon } from '../icon/icon';
import './mute.scss';

export interface Props {
	muted: boolean;
	handleMuteSound: (muted: boolean) => void;
}

export const Mute: React.FC<Props> = React.memo(({ muted, handleMuteSound }) => {
	//
	const [className, setClassName] = React.useState<string>(
		muted ? 'icon-volume-off' : 'icon-volume-up'
	);

	const handleOnClick = React.useCallback(() => {
		setClassName(!muted ? 'icon-volume-off' : 'icon-volume-up');
		handleMuteSound(!muted);
	}, [muted, handleMuteSound]);

	return <Icon name={`mute ${className}`} handleOnClick={handleOnClick} testId="mute-icon" />;
});
