import React from 'react';
import { AppScreenContent } from '../context/content/model';
import { Divider } from '../core';
import { Button, Input, LanguageSelector } from '../components';
import { BaseScreen } from './base/base';
import { sleep } from '../utils';

interface Props {
	content: AppScreenContent;
	userName: string;
	authError: Error | null;
	setAuthError: (error: Error | null) => void;
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
	const [isAuthenticating, setIsAuthenticating] = React.useState<boolean>(false);

	const hasError = React.useMemo(() => {
		return authError instanceof Error;
	}, [authError]);

	const handlePwdChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setPwd(event.target.value);
	}, []);

	const handleLoginSubmit = React.useCallback(
		async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			event.preventDefault();
			setIsAuthenticating(true);
			if (pwd === '') {
				setAuthError(new Error(content.errors?.emptyPwd || ''));
			} else {
				await sleep(1000);
				handleSubmit(pwd);
				setAuthError(null);
			}
			setIsAuthenticating(false);
		},
		[pwd, setAuthError, content, handleSubmit]
	);

	return (
		<BaseScreen>
			<LanguageSelector />
			<Divider invisible margin="bottom" />
			<Divider invisible margin="vertical" className="landscape-hidden" />
			<span>{content.title}</span>
			<Divider invisible margin="vertical" />
			<form className="login-form" noValidate autoComplete="off">
				<Input icon="user" id="username" disabled value={userName} testId="username" />
				<Divider invisible margin="bottom" />
				<Divider invisible margin="bottom" className="landscape-hidden" />
				<Input
					icon="lock"
					type="password"
					id="password"
					value={pwd}
					onChange={(value) => handlePwdChange(value)}
					testId="password"
				/>
				<Divider invisible margin="bottom" />
				<Divider invisible margin="bottom" className="landscape-hidden" />
				{hasError ? (
					<>
						<p className="error-message">
							<small>{authError!.message}</small>
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
