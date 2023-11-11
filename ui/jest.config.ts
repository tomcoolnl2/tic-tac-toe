/* eslint-disable */
export default {
	displayName: 'ui',
	preset: '../jest.preset.js',
	testEnvironment: 'jsdom',
	transform: {
		'^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
		'^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../coverage/ui',
};
