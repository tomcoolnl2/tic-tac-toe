import { Preview } from '@storybook/react';
import { withTheme } from '../src/lib/decorators';

const preview: Preview = {
	decorators: [
		(Story) => {
			const ThemedStory = withTheme(Story);
			return <ThemedStory />;
		},
	],
};

export default preview;
