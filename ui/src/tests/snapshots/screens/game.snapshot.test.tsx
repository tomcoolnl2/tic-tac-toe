import { render } from '@testing-library/react';
import { GameScreen } from '../../../lib/screens';

describe('GameScreen screen component snapshot test', () => {
	it('should match the snapshot', () => {
		const handleReloadDialog = jest.fn();
		const { asFragment } = render(
			<GameScreen
				useLanscapeDesign={false}
				handleReloadDialog={handleReloadDialog}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
