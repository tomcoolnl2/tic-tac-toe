import React from 'react';
import { Divider } from '../core';
import { Button, Input } from '../components';
import { BaseScreen } from './base/base';

interface Props {
	userName: string;
	authError: Error | null;
	setAuthError: (error: Error) => void;
	handleSubmit: (pwd: string) => void;
}

export const LoginScreen: React.FC<Props> = ({
	userName,
	authError,
	setAuthError,
	handleSubmit,
}) => {
	const [pwd, setPwd] = React.useState<string>('');

	const hasError = React.useMemo(() => {
		return authError instanceof Error;
	}, [authError]);

	const handlePwdChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPwd(event.target.value);
		},
		[]
	);

	const handleLoginSubmit = React.useCallback(
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			event.preventDefault();
			if (pwd === '') {
				setAuthError(new Error('Please provide a password...'));
			} else {
				handleSubmit(pwd);
			}
		},
		[pwd, handleSubmit, setAuthError]
	);

	return (
		<BaseScreen>
			<Divider invisible margin="vertical-l" />
			<span>Login</span>
			<Divider invisible margin="vertical" />
			<form className="login-form" noValidate autoComplete="off">
				<Input
					id="username"
					disabled
					value={userName}
					testId="username"
				/>
				<Divider invisible margin="vertical" />
				<Input
					type="password"
					id="password"
					value={pwd}
					onChange={(value) => handlePwdChange(value)}
					testId="password"
				/>
				<Divider invisible margin="vertical" />
				{hasError ? (
					<>
						<p className="error-message">
							<small>{authError!.message}</small>
						</p>
						<Divider invisible margin="vertical-l" />
					</>
				) : null}
				<Button
					variant="primary"
					onClick={handleLoginSubmit}
					testId="submit"
				>
					Login
				</Button>
			</form>
		</BaseScreen>
	);
};
