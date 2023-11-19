import { renderHook } from '@testing-library/react-hooks';
import { useAnimationFrame } from '../../../lib/hooks';

jest.useFakeTimers(); // Use fake timers to control time-related functions

describe('useAnimationFrame', () => {
	let callback: jest.Mock;
	const originalError = console.error;

	beforeAll(() => {
		console.error = jest.fn(); // Mock console.error to suppress the React 18 warning
	});

	afterAll(() => {
		console.error = originalError; // Restore original console.error after tests
	});

	beforeEach(() => {
		callback = jest.fn();
		jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
			const frameCallback = () => {
				cb(16); // Simulate a delta time of 16ms (60 frames per second)
			};
			return window.setTimeout(frameCallback, 16); // Simulate frame time (16ms)
		});
		jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(
			() => ({})
		);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should call the callback with delta time on each animation frame', () => {
		const { unmount } = renderHook(() => useAnimationFrame(callback));

		jest.advanceTimersByTime(1000); // Simulate multiple frames

		expect(callback).toHaveBeenCalled();
		expect(window.requestAnimationFrame).toHaveBeenCalled();
		expect(window.cancelAnimationFrame).not.toHaveBeenCalled();

		unmount();

		expect(window.cancelAnimationFrame).toHaveBeenCalledTimes(1);
	});
});
