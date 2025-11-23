import { useRef, type MouseEvent } from 'react';

export const useCardEffect = () => {
  const boundingRef = useRef<DOMRect | null>(null);

  const handleMouseLeave = () => {
    boundingRef.current = null;
  };

  const handleMouseEnter = (ev: MouseEvent<HTMLElement>) => {
    boundingRef.current = ev.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (ev: MouseEvent<HTMLElement>) => {
    if (!boundingRef.current) return;
    const x = ev.clientX - boundingRef.current.left;
    const y = ev.clientY - boundingRef.current.top;
    const xPercentage = x / boundingRef.current.width;
    const yPercentage = y / boundingRef.current.height;
    const xRotation = (xPercentage - 0.5) * 20;
    const yRotation = (0.5 - yPercentage) * 20;

    ev.currentTarget.style.setProperty('--x-rotation', `${yRotation}deg`);
    ev.currentTarget.style.setProperty('--y-rotation', `${xRotation}deg`);
    ev.currentTarget.style.setProperty('--x', `${xPercentage * 100}%`);
    ev.currentTarget.style.setProperty('--y', `${yPercentage * 100}%`);
  };

  // Return the event handlers to be attached to the component
  return {
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseMove,
  };
};
