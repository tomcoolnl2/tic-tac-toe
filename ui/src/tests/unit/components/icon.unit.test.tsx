import { render, fireEvent } from '@testing-library/react';
import { Icon } from '../../../lib/components/icon/icon';

describe('Icon component', () => {
	it('handles click events correctly', () => {
		const handleClick = jest.fn();
		const { container } = render(
			<Icon name="icon-repeat" handleOnClick={handleClick} test-id="reload" />
		);
		const iconElement = container.firstChild as HTMLElement;

		fireEvent.click(iconElement);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
