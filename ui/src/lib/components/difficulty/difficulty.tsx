import React from 'react';
import { IntelligenceLevel } from '@tic-tac-toe/model';
import { FlexBox } from '../../core';
import './difficulty.scss';

export interface Props {
	intelligenceLevel: IntelligenceLevel;
}

export const Difficulty: React.FC<Props> = React.memo(({ intelligenceLevel }) => {
	const className = React.useMemo(
		() => 'difficulty-' + intelligenceLevel.toLowerCase(),
		[intelligenceLevel]
	);
	return (
		<FlexBox spacing="m" justifyContent="center" className={`difficulty ${className}`}>
			<div className="star" />
			<div className="star" />
			<div className="star" />
		</FlexBox>
	);
});
