import { getEventTargetElement, getDataSetAttribute } from '../../lib/utils';

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
