import './input.scss';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name?: string;
}

export const Input: React.FC<Props> = ({
	type = 'text',
	id,
	name,
	disabled,
	value,
	onChange,
}) => {
	return (
		<input
			type={type}
			id={id}
			name={name ?? id}
			disabled={disabled || false}
			value={value}
			autoComplete="off"
			onChange={onChange}
		/>
	);
};
