import { AppState, IntelligenceLevel, PlayerSymbol } from '@tic-tac-toe/model';
import { AppStore } from '../lib/store-manager';
import { AIEngine } from '../lib/ai-engine';
import { getRandomNullIndex } from '../lib/utils';

describe('AIEngine', () => {
	const appState: AppState = {
		...AppStore.initialState,
		intelligenceLevel: IntelligenceLevel.EASY,
		boardState: [
			null,
			PlayerSymbol.X,
			PlayerSymbol.O,
			null,
			null,
			null,
			PlayerSymbol.X,
			null,
			PlayerSymbol.O,
		],
	};

	describe('update method', () => {
		it('should return a random null index for EASY intelligence level', async () => {
			const aiEngine = new AIEngine();
			const result = await aiEngine.update(appState);
			expect(result).toBeLessThanOrEqual(8);
		});
	});

	describe('getRandomNullIndex method', () => {
		it('should return a random null index', () => {
			const boardState = [
				null,
				PlayerSymbol.X,
				PlayerSymbol.O,
				null,
				null,
				null,
				PlayerSymbol.X,
				null,
				PlayerSymbol.O,
			];
			const result = getRandomNullIndex(boardState);
			expect(boardState[result]).toBeNull();
		});

		it('should return null if there are no null indices', () => {
			const boardState = [
				PlayerSymbol.X,
				PlayerSymbol.O,
				PlayerSymbol.X,
				PlayerSymbol.O,
				PlayerSymbol.X,
				PlayerSymbol.O,
				PlayerSymbol.X,
				PlayerSymbol.O,
				PlayerSymbol.X,
			];
			const result = getRandomNullIndex(boardState);
			expect(result).toBe(-1);
		});
	});
});
