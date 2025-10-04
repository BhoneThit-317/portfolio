import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Heart } from 'lucide-react';

export const Footer = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(60, 60);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    logoRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.OctahedronGeometry(0.8, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
    });
    const logo = new THREE.Mesh(geometry, material);
    scene.add(logo);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(2, 2, 2);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      logo.rotation.x += 0.01;
      logo.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <footer className="relative py-12 px-6 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-6">
          <div ref={logoRef} className="opacity-80"></div>

          <div className="text-center space-y-2">
            <p className="text-gray-400 flex items-center gap-2 justify-center">
              Built with <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" /> using React, Three.js & GSAP
            </p>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </p>
          </div>

          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>
      </div>
    </footer>
  );
};
