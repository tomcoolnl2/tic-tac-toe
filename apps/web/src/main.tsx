import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import * as TTTUI from '@tic-tac-toe/ui';
import { App } from './app/app';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<StrictMode>
		<TTTUI.Context.ContentProvider>
			<App />
		</TTTUI.Context.ContentProvider>
	</StrictMode>
);
