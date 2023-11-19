import { BehaviorSubject } from 'rxjs';
import { renderHook, act } from '@testing-library/react-hooks';
import { useBehaviorSubjectState } from '../../../lib/hooks';

describe('useBehaviorSubjectState', () => {
	const originalError = console.error;

	beforeAll(() => {
		console.error = jest.fn(); // Mock console.error to suppress the React 18 warning
	});

	afterAll(() => {
		console.error = originalError; // Restore original console.error after tests
	});

	it('should update state with BehaviorSubject', () => {
		const initialValue = 'initial';
		const behaviorSubject = new BehaviorSubject(initialValue);

		const { result } = renderHook(() =>
			useBehaviorSubjectState(behaviorSubject)
		);

		const [state, setState] = result.current;

		// Check initial state
		expect(state).toBe(initialValue);

		const updatedValue = 'updated';

		// Update state using the setState callback from the hook
		act(() => {
			setState(updatedValue);
		});

		// Check if state is updated
		expect(result.current[0]).toBe(updatedValue);

		// Update state using the behaviorSubject
		behaviorSubject.next('another update');

		// Check if state is updated after behaviorSubject update
		expect(result.current[0]).toBe('another update');
	});

	it('should unsubscribe from BehaviorSubject on unmount', () => {
		const behaviorSubject = new BehaviorSubject('value');

		const { unmount } = renderHook(() =>
			useBehaviorSubjectState(behaviorSubject)
		);

		// Access the behaviorSubject instance and check its subscriptions
		const subscriptions = behaviorSubject.observers.length;

		// Check if there are active subscriptions before unmount
		expect(subscriptions).toBeGreaterThan(0);

		unmount();

		// Check if subscriptions are cleared after unmount
		expect(behaviorSubject.observers.length).toBe(0);
	});
});
