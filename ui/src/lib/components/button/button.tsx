import React from 'react';
import classNames from 'classnames';
import './button.scss';
import { Loader } from '../loader/loader';

export interface Props {
	variant?: 'primary' | 'secondary' | 'dark' | 'light';
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	className?: string;
	children?: React.ReactNode;
	disabled?: boolean;
	loading?: boolean;
	testId?: string;
}

export const Button: React.FC<Props> = React.memo(
	({ variant = 'primary', onClick, className, children, disabled, loading, testId }) => {
		return (
			<button
				className={classNames('button', `button-${variant}`, className)}
				onClick={onClick}
				disabled={disabled}
				data-testid={testId}
			>
				{loading ? <Loader /> : children}
			</button>
		);
	}
);
