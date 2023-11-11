import '@testing-library/jest-dom';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { render } from '@testing-library/react';
import { Avatar } from '../../../lib/components';

// Mock the classNames library to avoid CSS class calculations in unit tests
jest.mock('classnames', () =>
	jest.fn((...args) => args.filter(Boolean).join(' '))
);

describe('Avatar component unit test', () => {
	it('should render the correct CSS classes', () => {
		const { container } = render(
			<Avatar
				type={PlayerSymbol.X}
				size="m"
				variant="dark"
				className="custom-avatar"
			/>
		);

		// Check if the correct CSS classes are being applied
		expect(container.firstChild).toHaveClass('avatar');
		expect(container.firstChild).toHaveClass('avatar-x');
		expect(container.firstChild).toHaveClass('avatar-size-m');
		expect(container.firstChild).toHaveClass('avatar-variant-dark');
		expect(container.firstChild).toHaveClass('custom-avatar');
	});

	it('should render the correct CSS classes for PlayerSymbol.O', () => {
		const { container } = render(
			<Avatar
				type={PlayerSymbol.O}
				size="xl"
				variant="light"
				className="other-avatar"
			/>
		);

		// Check if the correct CSS classes are being applied for PlayerSymbol.O
		expect(container.firstChild).toHaveClass('avatar');
		expect(container.firstChild).toHaveClass('avatar-o');
		expect(container.firstChild).toHaveClass('avatar-size-xl');
		expect(container.firstChild).toHaveClass('avatar-variant-light');
		expect(container.firstChild).toHaveClass('other-avatar');
	});
});
