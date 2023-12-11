import React from 'react';
import classNames from 'classnames';
import './input.scss';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: string;
	name?: string;
	testId?: string;
}

export const Input: React.FC<Props> = React.memo(
	({ type = 'text', icon, id, name, onChange, testId, ...props }) => {
		return (
			<div className={classNames('form-input', { icon })}>
				<i className={`icon-${icon}`} />
				<input
					type={type}
					id={id}
					name={name ?? id}
					autoComplete="off"
					onChange={onChange}
					data-testid={testId}
					{...props}
				/>
			</div>
		);
	}
);
