import React from 'react';
import classNames from 'classnames';
import { PlayerSymbol } from '@tic-tac-toe/model';
import './avatar.scss';

export interface Props {
	type: PlayerSymbol;
	size: 's' | 'm' | 'l' | 'xl';
	variant?: 'dark' | 'light';
	className?: string;
}

export const Avatar: React.FC<Props> = React.memo(({ type, size, variant, className }) => {
	const version = type === PlayerSymbol.X ? 'x' : 'o';

	const variantClassName =
		variant === 'dark'
			? 'avatar-variant-dark'
			: variant === 'light'
			? 'avatar-variant-light'
			: '';

	return (
		<span
			className={classNames(
				'avatar',
				`avatar-${version}`,
				`avatar-size-${size}`,
				variantClassName,
				className
			)}
		/>
	);
});
