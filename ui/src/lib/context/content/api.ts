import {
	VITE_CF_SPACE_ID,
	VITE_CF_LOCALIZED_PROPERTIES_ID,
	VITE_CF_CONTENT_DELIVERY_API_ACCESS_TOKEN,
} from '@tic-tac-toe/constants';
import { Content } from './model';

const query = `
    query {
        localizedProperties(id: "${VITE_CF_LOCALIZED_PROPERTIES_ID}") {
            appTitle
        }
    }
`;

export const fetchContentfulData = async (): Promise<Content> => {
	try {
		const url = `https://graphql.contentful.com/content/v1/spaces/${VITE_CF_SPACE_ID}/`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${VITE_CF_CONTENT_DELIVERY_API_ACCESS_TOKEN}`,
			},
			body: JSON.stringify({ query }),
		});
		if (!response.ok) {
			// TODO use contentfull message in a custom error
			throw new Error('Network response was not ok.');
		}
		const json = await response.json();
		return json.data.localizedProperties;
	} catch (error) {
		throw new Error(`Fetch error: Something went wrong`);
	}
};
