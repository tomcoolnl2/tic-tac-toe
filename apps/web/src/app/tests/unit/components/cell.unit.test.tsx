
import { render, fireEvent } from '@testing-library/react';
import { Props, Cell } from '../../../components/cell/cell';
import { PlayerSymbol } from '../../../core/model';
import { AppStore } from '../../../core/store-manager';


describe('Test rendering of the cell with a specific player symbol', () => {
	
    test('renders the cell with a specific player symbol', () => {
        const props: Props = {
            type: PlayerSymbol.X,
            index: 0,
            solutionCells: [0, 0, 0],
            disabled: false
        };
        const { getByTestId } = render(<Cell {...props} />);
        
        const cellElement = getByTestId('cell-0');
        expect(cellElement).toBeInTheDocument();
    });
});

describe('Test rendering of the cell with null player symbol', () => {
	
    test('renders the cell with null player symbol', () => {
        const props: Props = {
            type: null as PlayerSymbol,
            index: 1,
            solutionCells: [0, 0, 0],
            disabled: false
        };
        const { getByTestId } = render(<Cell {...props} />);
        
        const cellElement = getByTestId('cell-1');
        expect(cellElement).toBeInTheDocument();
      });   
});

describe('Test click event handler', () => {
	
    test('calls AppStore.update with the correct index when clicked', () => {
        const props: Props = {
            type: PlayerSymbol.X,
            index: 2,
            solutionCells: [0, 0, 0],
            disabled: false
        };
      
        const mockUpdate = jest.fn();
        AppStore.update = mockUpdate;
      
        const { getByTestId } = render(<Cell {...props} />);
      
        const cellElement = getByTestId('cell-2');
        fireEvent.click(cellElement);
      
        expect(mockUpdate).toHaveBeenCalledTimes(1);
        expect(mockUpdate).toHaveBeenCalledWith(2);
    });
});