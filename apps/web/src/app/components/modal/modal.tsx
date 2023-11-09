import React from 'react';
import * as ArenaUI from '@tic-tac-toe/ui';
import './modal.scss';

export interface Props {
	children: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ children }) => {
	return (
		<ArenaUI.FlexBox
			className="modal-backdrop"
			direction="row"
			alignItems="center"
		>
			<ArenaUI.FlexBox
				className="modal-background"
				direction="column"
				alignItems="center"
			>
				<ArenaUI.FlexBox
					className="modal-content"
					direction="column"
					alignItems="center"
					justifyContent="center"
				>
					{children}
				</ArenaUI.FlexBox>
			</ArenaUI.FlexBox>
		</ArenaUI.FlexBox>
	);
};
