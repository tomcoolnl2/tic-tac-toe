import { useCallback, useEffect, useRef } from 'react';

export const useAnimationFrame = (callback: FrameRequestCallback) => {
    const requestRef = useRef<number | null>(null);
    const previousTimeRef = useRef<number | null>(null);

    const animate = useCallback(
        (time: DOMHighResTimeStamp) => {
            if (previousTimeRef.current !== undefined) {
                const deltaTime = time - Number(previousTimeRef.current);
                callback(deltaTime);
            }
            previousTimeRef.current = time;
            requestRef.current = window.requestAnimationFrame(animate);
        },
        [callback]
    );

    useEffect(() => {
        requestRef.current = window.requestAnimationFrame(animate);
        return () => window.cancelAnimationFrame(requestRef.current!);
    }, [animate]);
};
