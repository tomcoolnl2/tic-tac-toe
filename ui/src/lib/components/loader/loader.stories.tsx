import type { StoryFn, Meta } from '@storybook/react';
import { type ContainerProps, withContainer } from '../../../../.storybook/decorators';
import { Loader } from './loader';

const EnchantedLoader: React.FC<ContainerProps> = withContainer(Loader, 200);

const Story: Meta<typeof Loader> = {
	component: Loader,
	title: 'Components/Loader',
};
export default Story;

const Template: StoryFn = (args) => <EnchantedLoader {...args} />;

export const RenderedLoader = Template.bind({});
