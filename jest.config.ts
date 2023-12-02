import { getJestProjects } from '@nx/jest';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
export default {
	projects: getJestProjects(),
	setupFiles: ['jest-fetch-mock'],
};
