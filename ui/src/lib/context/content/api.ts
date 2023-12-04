import { AppContent, Locale } from '@tic-tac-toe/model';
import {
	VITE_CF_SPACE_ID,
	VITE_CF_LOCALIZED_PROPERTIES_ID,
	VITE_CF_CONTENT_DELIVERY_API_ACCESS_TOKEN,
} from '@tic-tac-toe/constants';

function generateQuery(locale: string): string {
	return `
	  query {
		  localizedProperties(id: "${VITE_CF_LOCALIZED_PROPERTIES_ID}", locale: "${locale}") {
			  appTitle
			  loginScreen
			  settingsScreen
			  gameScreen
			  restartModal
			  gameOverModal
		  }
	  }
	`;
}

export const fetchContentfulData = async (
	locale: Locale
): Promise<AppContent> => {
	try {
		const url = `https://graphql.contentful.com/content/v1/spaces/${VITE_CF_SPACE_ID}/`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${VITE_CF_CONTENT_DELIVERY_API_ACCESS_TOKEN}`,
			},
			body: JSON.stringify({ query: generateQuery(locale) }),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok.');
		}
		const json = await response.json();
		return json.data.localizedProperties;
	} catch (error) {
		throw new Error(`Fetch error: Something went wrong`);
	}
};
