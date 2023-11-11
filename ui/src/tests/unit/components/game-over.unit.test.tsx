import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PlayerSymbol } from '@tic-tac-toe/model';
import { GameOver } from '../../../lib/components';

describe('Test rendering of the GameOver component with a specific props', () => {
	test('renders the GameOver component with a specific title, subtitle, and avatar', () => {
		const title = 'Game Over';
		const subtitle = 'Winner: Player X';
		const avatar = PlayerSymbol.X;
		const className = 'winner';

		const { getByText, container } = render(
			<GameOver
				title={title}
				subtitle={subtitle}
				avatar={avatar}
				className={className}
			/>
		);

		const subtitleElement = getByText(subtitle);
		expect(subtitleElement).toBeInTheDocument();

		const avatarElement = container.querySelector('.avatar');
		expect(avatarElement).toBeInTheDocument();

		const titleElement = getByText(title);
		expect(titleElement).toBeInTheDocument();
		expect(titleElement).toHaveClass(`text-player-${className}`);
	});
});

describe('Test rendering of the GameOver component with avatar set to null', () => {
	test('renders the GameOver component with avatar set to null', () => {
		const title = 'Game Over';
		const subtitle = "It's a tie";
		const avatar: PlayerSymbol | null = null;
		const className = 'tie';

		const { getByText, container } = render(
			<GameOver
				title={title}
				subtitle={subtitle}
				avatar={avatar}
				className={className}
			/>
		);

		const subtitleElement = getByText(subtitle);
		expect(subtitleElement).toBeInTheDocument();

		const avatarElement = container.querySelector('.avatar');
		expect(avatarElement).not.toBeInTheDocument();

		const titleElement = getByText(title);
		expect(titleElement).toBeInTheDocument();
		expect(titleElement).toHaveClass(`text-player-${className}`);
	});
});
