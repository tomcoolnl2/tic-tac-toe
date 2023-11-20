import React from 'react';
import { VITE_USERNAME, VITE_USERPWD } from '@tic-tac-toe/constants';
import { AppStore } from '@tic-tac-toe/core';
import { Divider, FlexBox } from '../core';
import { AppLogo, Button, Input } from '../components';

interface Props {
	test?: boolean;
}

export const LoginScreen: React.FC<Props> = () => {
	const [username, pwd] = React.useMemo(() => {
		return [VITE_USERNAME, VITE_USERPWD];
	}, []);

	const [pwdVlaue, setPwdValue] = React.useState<string>('');
	const [pwdError, setPwdError] = React.useState<boolean>(false);

	const handlePwdChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPwdError(false);
			setPwdValue(event.target.value);
		},
		[]
	);

	const handleLoginSubmit = React.useCallback(
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			event.preventDefault();
			if (pwd !== pwdVlaue) {
				setPwdError(true);
			} else {
				setPwdError(false);
				AppStore.resetState();
			}
		},
		[pwd, pwdVlaue]
	);

	return (
		<FlexBox direction="column" alignItems="center">
			<AppLogo />
			<Divider invisible margin="vertical" />
			<Divider invisible margin="vertical-l" />
			<span>Login</span>
			<Divider invisible margin="vertical" />
			<form noValidate autoComplete="off">
				<Input id="username" disabled value={username} />
				<Divider invisible margin="vertical" />
				<Input
					type="password"
					id="password"
					value={pwdVlaue}
					onChange={(value) => handlePwdChange(value)}
				/>
				<Divider invisible margin="vertical" />
				{pwdError ? (
					<>
						<p className="error-message">
							<small>Wrong password!</small>
						</p>
						<Divider invisible margin="vertical-l" />
					</>
				) : null}
				<Button
					variant="primary"
					onClick={handleLoginSubmit}
					disabled={pwdError}
				>
					Login
				</Button>
			</form>
		</FlexBox>
	);
};
