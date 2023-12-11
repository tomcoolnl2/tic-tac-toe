import { BoardState } from '@tic-tac-toe/model';
import { delay, getNullIndices, getRandomNullIndex } from '../lib/utils';

describe('"delay" function', () => {
	// Test case for default delay (500ms)
	test('should resolve after default delay', async () => {
		const start = Date.now();
		await delay();
		const end = Date.now();
		const elapsed = end - start;
		expect(elapsed).toBeGreaterThanOrEqual(450); // Some leeway for timing fluctuations
		expect(elapsed).toBeLessThan(600); // Still within the expected range
	});

	// Test case for custom delay
	test('should resolve after specified delay', async () => {
		const delayTime = 1000; // 1 second
		const start = Date.now();
		await delay(delayTime);
		const end = Date.now();
		const elapsed = end - start;
		expect(elapsed).toBeGreaterThanOrEqual(950); // Some leeway for timing fluctuations
		expect(elapsed).toBeLessThan(1100); // Still within the expected range
	});
});

describe('"getNullIndices" function', () => {
	// Test case for an empty board
	test('should return an empty array for an empty board', () => {
		const emptyBoard = Array(9).fill(null); // Create an empty board (9 null cells)
		const nullIndices = getNullIndices(emptyBoard);
		expect(nullIndices).toEqual(
			expect.arrayContaining([0, 1, 2, 3, 4, 5, 6, 7, 8])
		); // All indices should be null
		expect(nullIndices.length).toBe(9); // Length of the array should be equal to the board size
	});

	// Test case for a partially filled board
	test('should return indices of null cells in a partially filled board', () => {
		const partiallyFilledBoard = [
			'X',
			null,
			'O',
			'O',
			null,
			'X',
			'X',
			null,
			'O',
		] as BoardState;
		const nullIndices = getNullIndices(partiallyFilledBoard);
		expect(nullIndices).toEqual(expect.arrayContaining([1, 4, 7])); // Indices 1, 4, and 7 should be null
		expect(nullIndices.length).toBe(3); // There should be 3 null cells in this board
	});

	// Test case for a completely filled board
	test('should return an empty array for a fully filled board', () => {
		const filledBoard = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']; // Completely filled board
		const nullIndices = getNullIndices(
			filledBoard as unknown as BoardState
		);
		expect(nullIndices).toEqual([]); // There should be no null cells in this board
		expect(nullIndices.length).toBe(0); // Length of the array should be 0
	});
});

describe('"getRandomNullIndex" function', () => {
	// Mocking Math.random to control the random value for testing
	const originalMathRandom = Math.random;

	beforeEach(() => {
		// Mock Math.random to always return 0.5 for predictable tests
		Math.random = jest.fn(() => 0.5);
	});

	afterEach(() => {
		// Restore Math.random to its original implementation after tests
		Math.random = originalMathRandom;
	});

	// Test case for an empty board
	test('should return a valid random null index for a start board', () => {
		const emptyBoard = Array(9).fill(null); // Create an empty board (9 null cells)
		const randomIndex = getRandomNullIndex(emptyBoard);
		expect(randomIndex).toBeGreaterThanOrEqual(0);
		expect(randomIndex).not.toBeNull(); // Expecting null as there are no available null indices
	});

	// Test case for a partially filled board
	test('should return a valid random null index for a partially filled board', () => {
		const partiallyFilledBoard = [
			'X',
			null,
			'O',
			'O',
			null,
			'X',
			'X',
			null,
			'O',
		] as BoardState; // Example partially filled board
		const randomIndex = getRandomNullIndex(partiallyFilledBoard);
		const nullIndices = getNullIndices(partiallyFilledBoard);
		expect(randomIndex).toBeGreaterThanOrEqual(0); // Random index should be a valid number
		expect(nullIndices.includes(randomIndex!)).toBe(true); // Random index should be one of the available null indices
	});

	// Test case for a fully filled board
	test('should return null for a fully filled board', () => {
		const filledBoard = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']; // Completely filled board
		const randomIndex = getRandomNullIndex(
			filledBoard as unknown as BoardState
		);
		expect(randomIndex).toBeNull(); // Expecting null as there are no available null indices
	});
});
