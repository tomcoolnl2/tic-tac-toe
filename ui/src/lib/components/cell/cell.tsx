import * as Rx from 'rxjs';
import React from 'react';
import { PlayFunction } from 'use-sound/dist/types';
import { AppStore } from '@tic-tac-toe/core';
import { AppState, PlayerSymbol } from '@tic-tac-toe/model';
import { getDataSetAttribute, getEventTargetElement } from '../../utils';
import { Avatar } from '../avatar/avatar';
import './cell.scss';

export interface Props {
	type: PlayerSymbol | null;
	index: number;
	solutionCells: AppState['solutionCells'];
	disabled: boolean;
	muted: boolean;
	playTurnSfx: PlayFunction;
}

export const Cell: React.FC<Props> = React.memo(({ type, index, solutionCells, disabled, muted, playTurnSfx }) => {
	//
	const cellRef = React.useRef(null);
	const getIndex = getDataSetAttribute('index');

	React.useEffect(() => {
		const clickHandler = Rx.fromEvent<MouseEvent>(cellRef.current!, 'click').pipe(
			Rx.take(1),
			Rx.map(getEventTargetElement),
			Rx.map(getIndex),
			Rx.map((index) => Number(index)),
			Rx.mergeMap((index) => {
				!muted && playTurnSfx();
				return Rx.of(index);
			})
		);

		const subscription = clickHandler.subscribe(AppStore.update);

		return () => {
			subscription.unsubscribe();
		};
	}, [getIndex, muted, playTurnSfx]);

	const classNames = React.useMemo(() => {
		return solutionCells?.includes(index) ? `invert invert-${['x', 'o'][type!]}` : '';
	}, [type, index, solutionCells]);

	return (
		<button
			ref={cellRef}
			value={index}
			className={`cell ${classNames}`}
			data-index={index}
			data-testid={`cell-${index}`}
			disabled={type !== null || disabled}
		>
			{type !== null && <Avatar size="xl" type={type} />}
		</button>
	);
});
