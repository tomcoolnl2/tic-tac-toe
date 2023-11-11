import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AppLogo } from '../../../lib/components';

describe('AppLogo component unit test', () => {
	it('should render two Avatar components with correct props', () => {
		const { container } = render(<AppLogo />);

		const avatarX = container.querySelector('.avatar-x');
		const avatarO = container.querySelector('.avatar-o');

		expect(avatarX).toBeInTheDocument();
		expect(avatarO).toBeInTheDocument();
	});
});
