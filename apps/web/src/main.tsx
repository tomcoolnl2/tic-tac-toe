import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import * as TTTUI from '@tic-tac-toe/ui';
import { AuthProvider } from '@tic-tac-toe/auth';
import { App } from './app/app';

import { Amplify } from 'aws-amplify';
import amplifyConfig from '../graphql/amplifyconfiguration.json';

Amplify.configure(amplifyConfig);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<AuthProvider>
			<TTTUI.Context.ContentProvider>
				<App />
			</TTTUI.Context.ContentProvider>
		</AuthProvider>
	</StrictMode>
);
