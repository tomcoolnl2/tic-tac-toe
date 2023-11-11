import react from '@vitejs/plugin-react';
import { defineConfig, UserConfig } from 'vite';
import type { InlineConfig } from 'vitest';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

const config: UserConfig & { test: InlineConfig } = {
	cacheDir: '../../node_modules/.vite/web',

	server: {
		port: 4200,
		host: 'localhost',
	},

	preview: {
		port: 4300,
		host: 'localhost',
	},

	plugins: [react(), nxViteTsPaths()],

	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ nxViteTsPaths() ],
	// },

	test: {
		globals: true,
		cache: {
			dir: '../../node_modules/.vitest',
		},
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	},
};

export default defineConfig(config);
