
import { render, fireEvent } from '@testing-library/react';
import { ReloadButton } from '../../../components';


describe('ScoreBoardItem component unit test', () => {
    test('renders the ReloadButton component', () => {
        const handleReloadDialog = jest.fn();
        
        const { container } = render(<ReloadButton handleReloadDialog={handleReloadDialog} />);
        
        const buttonElement = container.querySelector('.icon-reload');
        expect(buttonElement).toBeInTheDocument();
    });
});

describe('Test the handleReloadDialog function when the button is clicked', () => {
    
    test('calls handleReloadDialog function when the button is clicked', () => {
        const handleReloadDialog = jest.fn();
    
        const { container } = render(<ReloadButton handleReloadDialog={handleReloadDialog} />);
    
        const buttonElement = container.querySelector('.icon-reload');
        fireEvent.click(buttonElement);
    
        expect(handleReloadDialog).toHaveBeenCalledTimes(1);
    });
});