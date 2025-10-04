"use client";
import { useEffect, useRef } from 'react';
import { ThreeScene } from '../utils/three-sence';

export const Background3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ThreeScene | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    sceneRef.current = new ThreeScene(containerRef.current);

    const handleMouseMove = (e: MouseEvent) => {
      if (sceneRef.current) {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        sceneRef.current.updateCameraPosition(mouseX, mouseY);
      }
    };

    const handleScroll = () => {
      if (sceneRef.current) {
        sceneRef.current.updateParticlesRotation(window.scrollY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (sceneRef.current) {
        sceneRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};
