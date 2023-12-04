import { renderHook } from '@testing-library/react-hooks';
import { useScreenOrientation } from '../../../lib/hooks';

describe('useScreenOrientation', () => {
	const originalError = console.error;

	beforeAll(() => {
		// Mock window.screen.orientation
		Object.defineProperty(window, 'screen', {
			value: {
				orientation: {
					type: 'landscape-primary',
				},
			},
			writable: true,
		});

		console.error = jest.fn(); // Mock console.error to suppress the React 18 warning
	});

	afterAll(() => {
		console.error = originalError; // Restore original console.error after tests
	});

	it('should return the initial screen orientation', () => {
		const { result } = renderHook(() => useScreenOrientation());

		// Initially, the orientation should be retrieved
		expect(result.current).toEqual('landscape-primary');
	});

	it('should update the orientation on orientationchange event', () => {
		const { result } = renderHook(() => useScreenOrientation());

		// Simulate an orientation change event
		const orientationChangeEvent = new Event('orientationchange');
		window.dispatchEvent(orientationChangeEvent);

		// Check if the orientation is updated after the change event
		expect(result.current).toEqual('landscape-primary');
	});

	it('should remove event listener on unmount', () => {
		const originalRemoveEventListener = window.removeEventListener;
		const removeEventListenerMock = jest.fn();
		window.removeEventListener = removeEventListenerMock;

		const { unmount } = renderHook(() => useScreenOrientation());
		unmount();

		// Check if removeEventListener is called with the correct arguments
		expect(removeEventListenerMock).toHaveBeenCalledWith(
			'orientationchange',
			expect.any(Function)
		);

		window.removeEventListener = originalRemoveEventListener;
	});
});
