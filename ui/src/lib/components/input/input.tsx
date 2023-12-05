import classNames from 'classnames';
import './input.scss';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: string;
	name?: string;
	testId?: string;
}

export const Input: React.FC<Props> = ({
	type = 'text',
	icon,
	id,
	name,
	disabled,
	value,
	onChange,
	testId,
}) => {
	return (
		<div className={classNames('form-input', { icon })}>
			<i className={`icon-${icon}`} />
			<input
				type={type}
				id={id}
				name={name ?? id}
				disabled={disabled || false}
				value={value}
				autoComplete="off"
				onChange={onChange}
				data-testid={testId}
			/>
		</div>
	);
};
