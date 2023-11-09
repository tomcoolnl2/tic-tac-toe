import * as ArenaUI from '@tic-tac-toe/ui';
import { PlayerSymbol } from '../../core/model';
import './score-board-item.scss';

export interface Props {
	score: number;
	playerSymbol: PlayerSymbol;
	cpuSymbol: PlayerSymbol;
	index: number;
}

export const ScoreBoardItem: React.FC<Props> = ({
	score,
	playerSymbol,
	cpuSymbol,
	index,
}) => {
	let text = '';
	let className = '';
	let symbol = '';
	switch (index) {
		case 0:
			symbol = ['X', 'O'][playerSymbol];
			text = `${symbol} (You)`;
			className = 'score-board-item-' + symbol.toLowerCase();
			break;
		case 1:
			text = 'ties';
			break;
		case 2:
			symbol = ['X', 'O'][cpuSymbol];
			text = `${symbol} (cpu)`;
			className = 'score-board-item-' + symbol.toLowerCase();
			break;
	}
	return (
		<ArenaUI.Grid rowGap="s" className={`score-board-item ${className}`}>
			<small>{text}</small>
			<h3>{score}</h3>
		</ArenaUI.Grid>
	);
};
