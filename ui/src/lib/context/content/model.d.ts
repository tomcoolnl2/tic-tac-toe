export interface Content {
	appTitle: string;
}

export interface ContentState {
	content: Content | null;
	isContentLoading: boolean;
	contentError: Error | null;
}

type ContentAction =
	| { type: 'FETCH_START' }
	| { type: 'FETCH_SUCCESS'; payload: Content }
	| { type: 'FETCH_ERROR'; payload: Error };
