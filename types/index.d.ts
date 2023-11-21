declare module global {
	interface Window {
		electron: {
			getAppVersion(): void;
			platform: NodeJS.Platform;
			theme: string;
		};
	}
}
