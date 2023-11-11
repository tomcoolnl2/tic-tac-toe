import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Modal } from '../../../lib/components';

describe('Test rendering of the Modal component with children', () => {
	test('renders the Modal component with children', () => {
		const children = (
			<div>
				<h2>Modal Content</h2>
				<p>This is the content of the modal.</p>
				<button>Close</button>
			</div>
		);

		const { getByText, container } = render(<Modal>{children}</Modal>);

		const modalContent = container.querySelector('.modal-content');
		expect(modalContent).toBeInTheDocument();

		const modalChildren = getByText('Modal Content');
		expect(modalChildren).toBeInTheDocument();

		const closeButton = getByText('Close');
		expect(closeButton).toBeInTheDocument();
	});
});
