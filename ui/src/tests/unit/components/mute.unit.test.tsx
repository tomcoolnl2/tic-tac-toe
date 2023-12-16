import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Mute } from '../../../';

describe('Mute Component', () => {
	const mockHandleMuteSound = jest.fn();

	it('renders Mute component properly', () => {
		const { getByTestId } = render(<Mute muted={true} handleMuteSound={mockHandleMuteSound} />);

		const muteIcon = getByTestId('mute-icon');
		expect(muteIcon).toBeInTheDocument();
		expect(muteIcon).toHaveClass('icon-volume-off');
	});

	it('triggers handleMuteSound function on clicking the mute icon', () => {
		const { getByTestId } = render(<Mute muted={true} handleMuteSound={mockHandleMuteSound} />);

		const muteIcon = getByTestId('mute-icon');
		fireEvent.click(muteIcon);

		expect(mockHandleMuteSound).toHaveBeenCalledTimes(1);
		expect(mockHandleMuteSound).toHaveBeenCalledWith(false);
	});

	it('toggles the mute icon and calls handleMuteSound function with updated state', () => {
		const { getByTestId } = render(
			<Mute muted={false} handleMuteSound={mockHandleMuteSound} />
		);

		const muteIcon = getByTestId('mute-icon');
		fireEvent.click(muteIcon);

		expect(mockHandleMuteSound).toHaveBeenCalledWith(true);
		expect(muteIcon).toHaveClass('icon-volume-off');
	});
});
