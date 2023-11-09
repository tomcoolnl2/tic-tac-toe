
import { render, fireEvent } from '@testing-library/react';
import { GameScreen } from '../../../screens';

describe('GameScreen component', () => {

    it('should render the component correctly', () => {
        const useLanscapeDesign = true;
        const handleReloadDialog = jest.fn();
    
        const { container } = render(
            <GameScreen useLanscapeDesign={useLanscapeDesign} handleReloadDialog={handleReloadDialog} />
        );
    
        expect(container.querySelector('.logo')).toBeInTheDocument();
        expect(container.querySelector('.turn-indicator')).toBeInTheDocument();
        expect(container.querySelector('.icon-reload')).toBeInTheDocument();
        expect(container.querySelector('.board')).toBeInTheDocument();
        expect(container.querySelector('.score-board-item')).toBeInTheDocument();
    });
  
    it('should call handleReloadDialog when reload button is clicked', () => {
        const useLanscapeDesign = true;
        const handleReloadDialog = jest.fn();

        const { container } = render(
            <GameScreen useLanscapeDesign={useLanscapeDesign} handleReloadDialog={handleReloadDialog} />
        );
    
        const reloadButton = container.querySelector('.icon-reload');
        fireEvent.click(reloadButton);
    
        expect(handleReloadDialog).toHaveBeenCalledTimes(1);
    });
});