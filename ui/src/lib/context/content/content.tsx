import React from 'react';
import {
	AppContentState,
	AppContentAction,
	AppContent,
} from '@tic-tac-toe/model';
import { fetchContentfulData } from './api';

const initialContentContext: AppContentState = {
	content: null,
	isContentLoading: false,
	contentError: null,
};

const ContentContext = React.createContext<AppContentState>(
	initialContentContext
);

export const useContentContext = () => React.useContext(ContentContext);

const contentReducer = (
	state: AppContentState,
	action: AppContentAction
): AppContentState => {
	switch (action.type) {
		case 'FETCH_START':
			return {
				...state,
				isContentLoading: true,
			};
		case 'FETCH_SUCCESS':
			return {
				...state,
				content: action.payload,
				isContentLoading: false,
				contentError: null,
			};
		case 'FETCH_ERROR':
			return {
				...state,
				isContentLoading: false,
				contentError: action.payload,
			};
		default:
			return state;
	}
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [contentState, dispatch] = React.useReducer(
		contentReducer,
		initialContentContext
	);

	React.useEffect(() => {
		const fetchDataFromApi = async () => {
			dispatch({ type: 'FETCH_START' });
			try {
				const content: AppContent = await fetchContentfulData();
				dispatch({ type: 'FETCH_SUCCESS', payload: content });
			} catch (error: unknown) {
				dispatch({
					type: 'FETCH_ERROR',
					payload: new Error('Something went wrong'),
				});
			}
		};
		fetchDataFromApi();
	}, []);

	return (
		<ContentContext.Provider value={contentState}>
			{children}
		</ContentContext.Provider>
	);
};
