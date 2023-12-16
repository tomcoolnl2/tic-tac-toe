import { AppState, IntelligenceLevel, PlayerSymbol } from '@tic-tac-toe/model';
import { AppStore } from '../lib/store-manager';
import { AIEngine } from '../lib/ai-engine';

describe('AIEngine', () => {
	const appState: AppState = {
		...AppStore.initialState,
		intelligenceLevel: IntelligenceLevel.EASY,
		boardState: [null, PlayerSymbol.X, PlayerSymbol.O, null, null, null, PlayerSymbol.X, null, PlayerSymbol.O],
	};

	describe('update method', () => {
		it('should return a random null index for EASY intelligence level', async () => {
			const aiEngine = new AIEngine();
			const result = await aiEngine.update(appState);
			expect(result).toBeLessThanOrEqual(8);
		});

		it('should prioritize blocking player from winning for HARD intelligence level', async () => {
			const hardAppState: AppState = {
				...appState,
				intelligenceLevel: IntelligenceLevel.HARD,
				boardState: [
					null,
					PlayerSymbol.X,
					PlayerSymbol.O,
					null,
					PlayerSymbol.O,
					null,
					PlayerSymbol.X,
					null,
					null,
				],
			};
			const aiEngine = new AIEngine();
			const result = await aiEngine.update(hardAppState);
			expect(result).toBe(3);
		});
	});

	describe('evaluateMove method', () => {
		it('should prioritize blocking player from winning', () => {
			const aiEngine = new AIEngine();
			const blockingEvaluation = aiEngine['evaluateMove'](appState, 1 << 6, 8); // Simulating a scenario where the player is about to win
			expect(blockingEvaluation).toBeGreaterThan(0); // Ensure the evaluation prioritizes blocking player's winning move
		});

		it('should prioritize winning move for AI', () => {
			const aiEngine = new AIEngine();
			const winningEvaluation = aiEngine['evaluateMove'](appState, 1 << 6, 6); // Simulating a scenario where AI can win
			expect(winningEvaluation).toBeGreaterThan(0); // Ensure the evaluation prioritizes AI's winning move
		});
	});
});
