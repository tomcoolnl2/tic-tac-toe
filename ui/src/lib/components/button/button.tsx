import React from 'react';
import classNames from 'classnames';
import './button.scss';

export interface Props {
	variant?: 'primary' | 'secondary' | 'dark' | 'light';
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	className?: string;
	children?: React.ReactNode;
	disabled?: boolean;
	testId?: string;
}

export const Button: React.FC<Props> = ({
	variant = 'primary',
	onClick,
	className,
	children,
	disabled,
	testId,
}) => {
	return (
		<button
			className={classNames('button', `button-${variant}`, className)}
			onClick={onClick}
			disabled={disabled}
			data-testid={testId}
		>
			{children}
		</button>
	);
};
