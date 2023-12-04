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
				items: [
					{ value: Themes.WEB, icon: 'circlehollow', title: 'Web' },
					{ value: Themes.DESKTOP, icon: 'circle', title: 'Desktop' },
					{ value: 'side-by-side', icon: 'sidebar', title: 'Both' },
				],
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
