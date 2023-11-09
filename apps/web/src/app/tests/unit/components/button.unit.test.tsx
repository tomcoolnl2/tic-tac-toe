

import { render, fireEvent } from '@testing-library/react'
import { Button } from '../../../components';


describe('Test rendering of the button with default props', () => {
	
    test('renders the button with default props', () => {
        const { getByText } = render(<Button>Click me</Button>);
        const buttonElement = getByText('Click me');
        expect(buttonElement).toBeInTheDocument();
    });
});

describe('Test rendering of the button with different variants', () => {

    test('renders the primary variant button', () => {
        const { getByText } = render(<Button variant='primary'>Primary</Button>);
        const buttonElement = getByText('Primary');
        expect(buttonElement).toBeInTheDocument();
    });
      
    test('renders the secondary variant button', () => {
        const { getByText } = render(<Button variant='secondary'>Secondary</Button>);
        const buttonElement = getByText('Secondary');
        expect(buttonElement).toBeInTheDocument();
    });
      
    test('renders the dark variant button', () => {
        const { getByText } = render(<Button variant='dark'>Dark</Button>);
        const buttonElement = getByText('Dark');
        expect(buttonElement).toBeInTheDocument();
    });
      
    test('renders the light variant button', () => {
        const { getByText } = render(<Button variant='light'>Light</Button>);
        const buttonElement = getByText('Light');
        expect(buttonElement).toBeInTheDocument();
    });
});

describe('Test the onClick event handler', () => {

    test('calls the onClick handler when clicked', () => {
        const handleClick = jest.fn();
        const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
        const buttonElement = getByText('Click me');
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});

describe('Test button with the disabled prop', () => {

    test('renders a disabled button', () => {
        const { getByText } = render(<Button disabled>Disabled</Button>);
        const buttonElement = getByText('Disabled');
        expect(buttonElement).toBeDisabled();
    });
      
    test('does not call the onClick handler for a disabled button', () => {
        const handleClick = jest.fn();
        const { getByText } = render(<Button onClick={handleClick} disabled>Disabled</Button>);
        const buttonElement = getByText('Disabled');
        fireEvent.click(buttonElement);
        expect(handleClick).not.toHaveBeenCalled();
    });
});
