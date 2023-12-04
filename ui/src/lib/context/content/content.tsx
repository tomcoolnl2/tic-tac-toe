import React from 'react';
import {
	type AppContentStateWithLanguageSelector,
	AppContentState,
	AppContentAction,
	AppContent,
	Locale,
} from '@tic-tac-toe/model';
import { fetchContentfulData } from './api';

const initialContentContext: AppContentState = {
	appContent: null,
	isContentLoading: false,
	contentError: null,
	locale: Locale.EN,
};

const ContentContext = React.createContext<AppContentState>(initialContentContext);

export const useContentContext = () => {
	return React.useContext(ContentContext) as AppContentStateWithLanguageSelector;
};

const contentReducer = (state: AppContentState, action: AppContentAction): AppContentState => {
	switch (action.type) {
		case 'FETCH_START':
			return {
				...state,
				isContentLoading: true,
			};
		case 'FETCH_SUCCESS':
			return {
				...state,
				appContent: action.payload,
				isContentLoading: false,
				contentError: null,
			};
		case 'FETCH_ERROR':
			return {
				...state,
				isContentLoading: false,
				contentError: action.payload,
			};
		case 'SET_LANGUAGE':
			return {
				...state,
				locale: action.payload,
			};
		default:
			return state;
	}
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [contentState, dispatch] = React.useReducer(contentReducer, initialContentContext);

	const setLanguage = React.useCallback((locale: Locale): void => {
		dispatch({ type: 'SET_LANGUAGE', payload: locale });
	}, []);

	React.useEffect(() => {
		const fetchDataFromApi = async () => {
			dispatch({ type: 'FETCH_START' });
			try {
				const content: AppContent = await fetchContentfulData(contentState.locale);
				dispatch({ type: 'FETCH_SUCCESS', payload: content });
			} catch (error: unknown) {
				dispatch({
					type: 'FETCH_ERROR',
					payload: new Error('Something went wrong'),
				});
			}
		};
		fetchDataFromApi();
	}, [contentState.locale]);

	const contextValue: AppContentStateWithLanguageSelector = {
		...contentState,
		setLanguage,
	};

	return <ContentContext.Provider value={contextValue}>{children}</ContentContext.Provider>;
};
