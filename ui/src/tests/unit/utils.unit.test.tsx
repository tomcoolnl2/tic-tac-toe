import { getEventTargetElement, getDataSetAttribute, sleep } from '../../lib/utils';

describe('getEventTargetElement', () => {
	test('returns the target element from a MouseEvent', () => {
		// Mock a MouseEvent
		const mockEvent: Partial<MouseEvent> = {
			target: document.createElement('button'),
		};

		// Call the function with the mocked event
		const result = getEventTargetElement(mockEvent as MouseEvent);

		// Check if the returned result is an HTMLButtonElement
		expect(result instanceof HTMLButtonElement).toBe(true);
	});
});

describe('getDataSetAttribute', () => {
	test('returns the specified data attribute value from an HTMLButtonElement', () => {
		// Mock an HTMLButtonElement with a dataset containing a specific attribute
		const mockButton: HTMLButtonElement = document.createElement('button');
		mockButton.dataset['testAttribute'] = 'testValue';

		// Call the function with the mocked button and specified attribute
		const result = getDataSetAttribute('testAttribute')(mockButton);

		// Check if the function returns the correct attribute value
		expect(result).toBe('testValue');
	});

	test('returns undefined if the specified data attribute does not exist', () => {
		// Mock an HTMLButtonElement without the specified attribute in its dataset
		const mockButton: HTMLButtonElement = document.createElement('button');

		// Call the function with the mocked button and a non-existing attribute
		const result = getDataSetAttribute('nonExistingAttribute')(mockButton);

		// Check if the function returns undefined for non-existing attribute
		expect(result).toBeUndefined();
	});
});

describe('"sleep" function', () => {
	// Test case for default delay (500ms)
	test('should resolve after default delay', async () => {
		const start = Date.now();
		await sleep();
		const end = Date.now();
		const elapsed = end - start;
		expect(elapsed).toBeGreaterThanOrEqual(450); // Some leeway for timing fluctuations
		expect(elapsed).toBeLessThan(600); // Still within the expected range
	});

	// Test case for custom delay
	test('should resolve after specified delay', async () => {
		const delayTime = 1000; // 1 second
		const start = Date.now();
		await sleep(delayTime);
		const end = Date.now();
		const elapsed = end - start;
		expect(elapsed).toBeGreaterThanOrEqual(950); // Some leeway for timing fluctuations
		expect(elapsed).toBeLessThan(1100); // Still within the expected range
	});
});
