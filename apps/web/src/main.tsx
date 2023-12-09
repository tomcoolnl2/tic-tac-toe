import { StrictMode } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import {
	AWS_USER_POOL_APP_CLIENT_ID,
	AWS_USER_POOL_ID,
	AWS_IDENTOTY_POOL_ID,
} from '@tic-tac-toe/constants';
import * as ReactDOM from 'react-dom/client';
import * as TTTUI from '@tic-tac-toe/ui';
import { App } from './app/app';

// import awsExports from './aws-exports';
// Amplify.configure(awsExports);

Amplify.configure({
	Auth: {
		Cognito: {
			identityPoolId: AWS_IDENTOTY_POOL_ID,
			userPoolId: AWS_USER_POOL_ID,
			userPoolClientId: AWS_USER_POOL_APP_CLIENT_ID,
			// allowGuestAccess: false,
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<Authenticator.Provider>
			<TTTUI.Context.AuthProvider>
				<TTTUI.Context.ContentProvider>
					<App />
				</TTTUI.Context.ContentProvider>
			</TTTUI.Context.AuthProvider>
		</Authenticator.Provider>
	</StrictMode>
);
