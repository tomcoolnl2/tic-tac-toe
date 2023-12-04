import { Preview } from '@storybook/react';
import { Themes } from '../src/lib/theme/theme';
import { withTheme } from './decorators';
import './styles.scss';

const preview: Preview = {
	globalTypes: {
		theme: {
			description: 'Global theme for components',
			defaultValue: Themes.WEB,
			toolbar: {
				title: 'Theme',
				icon: 'circlehollow',
				items: Object.values(Themes),
			},
		},
	},
	decorators: [
		(StoryFn, context) => {
			const ThemedStory = withTheme(StoryFn, context.globals.theme);
			return <ThemedStory />;
		},
	],
};

export default preview;
