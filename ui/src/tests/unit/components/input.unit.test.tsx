import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Input, type Props } from '../../../lib/components/input/input';

describe('Input component', () => {
	const defaultProps: Props = {
		onChange: jest.fn(),
		id: 'test-input',
		value: '',
		testId: 'test-input',
	};

	it('renders without crashing', () => {
		const { container } = render(<Input {...defaultProps} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('renders with icon when provided', () => {
		const { container } = render(<Input {...defaultProps} icon="search" />);
		expect(container.querySelector('.icon-search')).toBeTruthy();
	});

	it('calls onChange callback when input value changes', () => {
		const onChange = jest.fn();
		const { getByTestId } = render(<Input {...defaultProps} onChange={onChange} />);
		const input = getByTestId('test-input') as HTMLInputElement;

		fireEvent.change(input, { target: { value: 'test' } });
		expect(onChange).toHaveBeenCalledTimes(1);
	});

	it('sets default name as id if name is not provided', () => {
		const { getByTestId } = render(<Input {...defaultProps} />);
		const input = getByTestId('test-input') as HTMLInputElement;

		expect(input.getAttribute('name')).toBe('test-input');
	});

	it('disables input when disabled prop is true', () => {
		const { getByTestId } = render(<Input {...defaultProps} disabled />);
		const input = getByTestId('test-input') as HTMLInputElement;

		expect(input.disabled).toBe(true);
	});

	// Add more test cases as needed based on specific functionality
});
