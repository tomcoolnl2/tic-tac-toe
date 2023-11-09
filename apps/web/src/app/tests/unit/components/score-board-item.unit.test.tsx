
import { render } from '@testing-library/react';
import { ScoreBoardItem } from '../../../components';
import { PlayerSymbol } from '../../../core/model';


describe('ScoreBoardItem component unit test', () => {

    it('renders correctly with player symbol X', () => {
        const props = {
            score: 5,
            playerSymbol: PlayerSymbol.X,
            cpuSymbol: PlayerSymbol.O,
            index: 0,
        };

        const { getByText } = render(<ScoreBoardItem {...props} />);

        const playerSymbolText = getByText(/X \(You\)/i);
        expect(playerSymbolText).toBeInTheDocument();

        const scoreText = getByText(/5/i);
        expect(scoreText).toBeInTheDocument();
    });

    it('renders correctly for ties', () => {
        const props = {
            score: 3,
            playerSymbol: PlayerSymbol.X,
            cpuSymbol: PlayerSymbol.O,
            index: 1,
        };

        const { getByText, container } = render(<ScoreBoardItem {...props} />);

        const tiesText = getByText(/ties/i);
        expect(tiesText).toBeInTheDocument();

        const scoreText = getByText(/3/i);
        expect(scoreText).toBeInTheDocument();
    });

    test('renders correctly with player symbol O', () => {
        const props = {
            score: 2,
            playerSymbol: PlayerSymbol.X,
            cpuSymbol: PlayerSymbol.O,
            index: 2,
        };

        const { getByText } = render(<ScoreBoardItem {...props} />);

        const playerSymbolText = getByText(/O \(cpu\)/i);
        expect(playerSymbolText).toBeInTheDocument();

        const scoreText = getByText(/2/i);
        expect(scoreText).toBeInTheDocument();
    });

    test('should have the correct class name for player symbol X', () => {
        const props = {
            score: 5,
            playerSymbol: PlayerSymbol.X,
            cpuSymbol: PlayerSymbol.O,
            index: 0,
        };

        const { container } = render(<ScoreBoardItem {...props} />);
        expect(container.firstChild).toHaveClass('score-board-item-x');
        expect(container.firstChild).not.toHaveClass('score-board-item-o');
    });

    test('should have the correct class name for player symbol O', () => {
        const props = {
            score: 2,
            playerSymbol: PlayerSymbol.X,
            cpuSymbol: PlayerSymbol.O,
            index: 2,
        };

        const { container } = render(<ScoreBoardItem {...props} />);
        expect(container.firstChild).toHaveClass('score-board-item-o');
        expect(container.firstChild).not.toHaveClass('score-board-item-x');
    });

});