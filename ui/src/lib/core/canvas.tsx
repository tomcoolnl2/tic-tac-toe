import { FC, memo, useEffect, useRef } from 'react';

interface Props {
    draw: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;
    height: number;
    width: number;
}

export const Canvas: FC<Props> = memo(({ draw, height, width }) => {
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = canvas.current?.getContext(
            '2d'
        ) as CanvasRenderingContext2D;
        draw(canvas.current!, ctx);
    }, [draw, height, width]);

    return <canvas ref={canvas} height={height} width={width} />;
});
