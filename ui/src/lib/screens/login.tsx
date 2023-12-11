import React from 'react';
import { AppScreenContent } from '../context/content/model';
import { Divider } from '../core';
import { Button, Input, LanguageSelector } from '../components';
import { BaseScreen } from './base/base';
import { sleep } from '../utils';

interface Props {
	content: AppScreenContent;
	authError: Error | null;
	setAuthError: (error: Error | null) => void;
	handleSubmit: (userName: string, password: string) => Promise<void>;
}

export const LoginScreen: React.FC<Props> = ({
	content,
	authError,
	setAuthError,
	handleSubmit,
}) => {
	const [userName, setUserName] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [isAuthenticating, setIsAuthenticating] = React.useState<boolean>(false);

	const handleUserNameChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setUserName(event.target.value);
	}, []);

	const handlePassWordChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	}, []);

	const handleLoginSubmit = React.useCallback(
		async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			event.preventDefault();
			setIsAuthenticating(true);
			if (password.length === 0) {
				setAuthError(new Error(content.errors?.emptyPwd));
			} else {
				await sleep(750);
				handleSubmit(userName, password);
				setAuthError(null);
			}
			setIsAuthenticating(false);
		},
		[userName, password, content.errors?.emptyPwd, setAuthError, handleSubmit]
	);

	return (
		<BaseScreen>
			<LanguageSelector />
			<Divider invisible margin="bottom" />
			<Divider invisible margin="vertical" className="landscape-hidden" />
			<span>{content.title}</span>
			<Divider invisible margin="vertical" />
			<form className="login-form" noValidate autoComplete="off">
				<Input
					icon="user"
					id="username"
					defaultValue={userName}
					testId="username"
					onChange={handleUserNameChange}
					placeholder="username"
				/>
				<Divider invisible margin="bottom" />
				<Divider invisible margin="bottom" className="landscape-hidden" />
				<Input
					icon="lock"
					type="password"
					id="password"
					defaultValue={password}
					onChange={handlePassWordChange}
					testId="password"
					placeholder="password"
				/>
				<Divider invisible margin="bottom" />
				<Divider invisible margin="bottom" className="landscape-hidden" />
				{authError instanceof Error ? (
					<>
						<p className="error-message">
							<small>{authError.message}</small>
						</p>
						<Divider invisible margin="bottom" />
						<Divider invisible margin="bottom" className="landscape-hidden" />
					</>
				) : null}
				<Button
					variant="primary"
					onClick={handleLoginSubmit}
					testId="submit"
					loading={isAuthenticating}
				>
					{content.cta1}
				</Button>
			</form>
		</BaseScreen>
	);
};
