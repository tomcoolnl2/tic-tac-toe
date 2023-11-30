import './input.scss';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name?: string;
	testId?: string;
}

export const Input: React.FC<Props> = ({
	type = 'text',
	id,
	name,
	disabled,
	value,
	onChange,
	testId,
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
			data-testid={testId}
		/>
	);
};
