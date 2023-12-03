import { Locale } from './model';

export type AppContentAction =
	| { type: 'FETCH_START' }
	| { type: 'FETCH_SUCCESS'; payload: AppContent }
	| { type: 'FETCH_ERROR'; payload: Error }
	| { type: 'SET_LANGUAGE'; payload: Locale };

export interface AppContentState {
	content: AppContent | null;
	isContentLoading: boolean;
	contentError: Error | null;
	locale: Locale;
}

export type AppContentStateWithLanguageSelector = AppContentState & {
	setLanguage: (locale: Locale) => void;
};

export interface AppContent {
	appTitle: string;
	loginScreen: AppScreenContent;
	settingsScreen: AppScreenContent;
	gameScreen: AppGameContent;
	restartModal: AppScreenContent;
	gameOverModal: AppScreenContent;
}

export interface AppScreenContent {
	title: string | string[];
	subtitle?: string | string[];
	cta1?: string;
	cta2?: string;
	errors?: {
		[key: string]: string;
	};
}

export interface AppGameContent {
	intelligenceLevel: [string, string, string];
	turnIndicator: [string, string];
	scoreBoard: [string, string, string];
}
