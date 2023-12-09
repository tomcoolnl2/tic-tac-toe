import React from 'react';

interface Props {
	draw: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;
	height: number;
	width: number;
}

export const Canvas: React.FC<Props> = React.memo(({ draw, height, width }) => {
	const canvas = React.useRef<HTMLCanvasElement>(null);

	React.useEffect(() => {
		const ctx = canvas.current?.getContext('2d') as CanvasRenderingContext2D;
		draw(canvas.current!, ctx);
	}, [draw, height, width]);

	return <canvas ref={canvas} height={height} width={width} />;
});
