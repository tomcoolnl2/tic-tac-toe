
import { render, fireEvent } from '@testing-library/react';
import { SettingsScreen } from '../../../screens';
import { PlayerSymbol } from '../../../core/model';

describe('SettingsScreen component', () => {
    
    it('should render the component correctly', () => {
        const playerSymbol = PlayerSymbol.X;
        const handleSymbolChoiceChange = jest.fn();
        const handleStartGame = jest.fn();
    
        const { getByText, container } = render(
            <SettingsScreen
                playerSymbol={playerSymbol}
                handleSymbolChoiceChange={handleSymbolChoiceChange}
                handleStartGame={handleStartGame}
            />
        );
  
        expect(getByText("Pic Player 1's Mark")).toBeInTheDocument();
        expect(container.querySelector('.choose-player')).toBeInTheDocument();
        expect(getByText('Remember, X goes first')).toBeInTheDocument();
        expect(getByText('Start game')).toBeInTheDocument();
    });
  
    it('should call handleSymbolChoiceChange when symbol choice is changed', () => {
        const playerSymbol = PlayerSymbol.X;
        const handleSymbolChoiceChange = jest.fn();
        const handleStartGame = jest.fn();
    
        const { container } = render(
            <SettingsScreen
                playerSymbol={playerSymbol}
                handleSymbolChoiceChange={handleSymbolChoiceChange}
                handleStartGame={handleStartGame}
            />
        );
    
        const checkbox = container.querySelector('.choose-player');
        fireEvent.click(checkbox);
    
        expect(handleSymbolChoiceChange).toHaveBeenCalledTimes(1);
    });
  
    it('should call handleStartGame when "Start game" button is clicked', () => {
        const playerSymbol = PlayerSymbol.X;
        const handleSymbolChoiceChange = jest.fn();
        const handleStartGame = jest.fn();
    
        const { getByText } = render(
            <SettingsScreen
                playerSymbol={playerSymbol}
                handleSymbolChoiceChange={handleSymbolChoiceChange}
                handleStartGame={handleStartGame}
            />
        );
    
        const startButton = getByText('Start game');
        fireEvent.click(startButton);
    
        expect(handleStartGame).toHaveBeenCalledTimes(1);
    });
});