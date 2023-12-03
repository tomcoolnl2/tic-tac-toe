import React from 'react';
import { AppScreenContent } from '@tic-tac-toe/model';
import { Divider } from '../core';
import { Button, Input } from '../components';
import { BaseScreen } from './base/base';

interface Props {
	content: AppScreenContent;
	userName: string;
	authError: Error | null;
	setAuthError: (error: Error) => void;
	handleSubmit: (pwd: string) => void;
}

export const LoginScreen: React.FC<Props> = ({
	content,
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
				setAuthError(new Error(content.errors?.emptyPwd || ''));
			} else {
				handleSubmit(pwd);
			}
		},
		[pwd, setAuthError, content, handleSubmit]
	);

	return (
		<BaseScreen>
			<Divider invisible margin="vertical-l" />
			<span>{content.title}</span>
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
					{content.cta1}
				</Button>
			</form>
		</BaseScreen>
	);
};
