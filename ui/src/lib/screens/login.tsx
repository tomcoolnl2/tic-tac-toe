import React from 'react';
import { User } from '@tic-tac-toe/model';
import { AppStore } from '@tic-tac-toe/core';
import { Divider, FlexBox } from '../core';
import { AppLogo, Button, Input } from '../components';

export const LoginScreen: React.FC = () => {
	const [userName, setUserName] = React.useState<string>('');
	const [pwdValue, setPwdValue] = React.useState<string>('');
	const [pwdError, setPwdError] = React.useState<boolean>(false);
	const [pwdErrorMsg, setPwdErrorMsg] = React.useState<string>('');

	React.useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		const fetchUserName = async () => {
			const response = await fetch(
				'http://localhost:3000/api-login/username',
				{ signal }
			);
			const json = await response.json();
			const { name }: Partial<User> = json;
			name && setUserName(name);
		};
		fetchUserName();
	}, []);

	const handlePwdChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPwdError(false);
			setPwdErrorMsg('');
			setPwdValue(event.target.value);
		},
		[]
	);

	const handleLoginSubmit = React.useCallback(
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			event.preventDefault();

			if (pwdValue === '') {
				setPwdError(true);
				setPwdErrorMsg('Please provide a password...');
			} else {
				const controller = new AbortController();
				const signal = controller.signal;
				const login = async () => {
					const response = await fetch(
						'http://localhost:3000/api-login/login',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({ pwd: pwdValue }),
							signal,
						}
					);

					if (!response.ok) {
						const data = await response.json();
						setPwdError(true);
						setPwdErrorMsg(data.message);
					} else {
						AppStore.resetState();
					}
				};
				login();
			}
		},
		[pwdValue]
	);

	return (
		<FlexBox direction="column" alignItems="center">
			<AppLogo />
			<Divider invisible margin="vertical" />
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
					value={pwdValue}
					onChange={(value) => handlePwdChange(value)}
					testId="password"
				/>
				<Divider invisible margin="vertical" />
				{pwdError ? (
					<>
						<p className="error-message">
							<small>{pwdErrorMsg}</small>
						</p>
						<Divider invisible margin="vertical-l" />
					</>
				) : null}
				<Button
					variant="primary"
					onClick={handleLoginSubmit}
					disabled={pwdError}
					testId="submit"
				>
					Login
				</Button>
			</form>
		</FlexBox>
	);
};
