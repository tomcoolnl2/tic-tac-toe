import type { StoryFn, Meta } from '@storybook/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { type Props, Cell } from './cell';

const Story: Meta<typeof Cell> = {
	component: Cell,
	title: 'Components/Cell',
};
export default Story;

const Template: StoryFn<Props> = (args) => <Cell {...args} />;

export const CellX = Template.bind({});
CellX.args = {
	type: PlayerSymbol.X,
	index: 1,
	solutionCells: [0, 0, 0],
};

export const CellO = Template.bind({});
CellO.args = {
	type: PlayerSymbol.O,
	index: 2,
	solutionCells: [0, 0, 0],
};

export const InvertedCellX = Template.bind({});
InvertedCellX.args = {
	type: PlayerSymbol.X,
	index: 2,
	solutionCells: [0, 1, 2],
};

export const InvertedCellO = Template.bind({});
InvertedCellO.args = {
	type: PlayerSymbol.O,
	index: 2,
	solutionCells: [0, 1, 2],
};
