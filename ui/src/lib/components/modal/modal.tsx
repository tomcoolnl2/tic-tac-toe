import React from 'react';
import { FlexBox } from '../../core';
import './modal.scss';

export interface Props {
	children: React.ReactNode;
}

export const Modal: React.FC<Props> = React.memo(({ children }) => {
	return (
		<FlexBox className="modal-backdrop" direction="row" alignItems="center">
			<FlexBox className="modal-background" direction="column" alignItems="center">
				<FlexBox
					className="modal-content"
					direction="column"
					alignItems="center"
					justifyContent="center"
				>
					{children}
				</FlexBox>
			</FlexBox>
		</FlexBox>
	);
});
