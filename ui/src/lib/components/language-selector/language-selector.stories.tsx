import type { Meta, StoryFn } from '@storybook/react';
import { Locale } from '@tic-tac-toe/model';
import { type ContainerProps, withContainer } from '../../../../.storybook/decorators';
import { type Props, LanguageSelector } from './language-selector';

const EnchantedLanguageSelector: React.FC<Props & ContainerProps> = withContainer(
	LanguageSelector,
	100
);
const Story: Meta<typeof LanguageSelector> = {
	component: LanguageSelector,
	title: 'Components/LanguageSelector',
};
export default Story;

const Template: StoryFn<Props> = (args) => <EnchantedLanguageSelector {...args} />;

export const LanguageSelectorEN = Template.bind({});
LanguageSelectorEN.args = {
	selectedLanguage: Locale.EN,
};

export const LanguageSelectorCN = Template.bind({});
LanguageSelectorCN.args = {
	selectedLanguage: Locale.中文,
};
