import { Avatar, Button } from '../';
import { PlayerSymbol } from '../../core/model';
import './turn-indicator.scss';

export interface Props {
    playerSymbol: PlayerSymbol;
    currentPlayer: PlayerSymbol;
}

export const TurnIndicator: React.FC<Props> = ({ playerSymbol, currentPlayer }) => {
    const className = ['x', 'o'][currentPlayer];
    return (
        <Button variant='dark' disabled className={`turn-indicator turn-indicator-${className}`}>
            <Avatar type={currentPlayer} size={'s'} variant='light' />
            {currentPlayer === playerSymbol ? 'Your Turn' : 'CPU\'s Turn'}
        </Button>
    );
};
