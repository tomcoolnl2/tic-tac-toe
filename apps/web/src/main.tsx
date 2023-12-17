import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { AuthProvider } from '@tic-tac-toe/auth';
import { ContentProvider } from '@tic-tac-toe/content';
import { App } from './app/app';

import { Amplify } from 'aws-amplify';
import amplifyConfig from '../graphql/amplifyconfiguration.json';

Amplify.configure(amplifyConfig);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<AuthProvider>
			<ContentProvider>
				<App />
			</ContentProvider>
		</AuthProvider>
	</StrictMode>
);
