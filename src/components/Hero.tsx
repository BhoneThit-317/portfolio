import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Code2, Smartphone } from 'lucide-react';

export const Hero = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const fullText = "Hi, I'm Your Name";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(400, 400);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);

    const torusGeometry = new THREE.TorusGeometry(1.5, 0.4, 32, 100);
    const material = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.7,
      roughness: 0.2,
      transparent: true,
      opacity: 0.8,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
    });
    const torus = new THREE.Mesh(torusGeometry, material);
    scene.add(torus);

    const ringGeometry = new THREE.TorusGeometry(2, 0.05, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
    ring2.rotation.y = Math.PI / 3;
    scene.add(ring2);

    const light1 = new THREE.PointLight(0x06b6d4, 2);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x8b5cf6, 2);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.005;
      torus.rotation.y += 0.01;
      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.005;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      torusGeometry.dispose();
      material.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold glow-text">
                {displayText}
                <span className="animate-pulse">|</span>
              </h1>
              <h2 className="text-2xl md:text-4xl font-light bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Mobile Flutter Developer & Fullstack Engineer
              </h2>
            </div>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Crafting seamless mobile experiences and scalable backend solutions with cutting-edge technologies.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('about')}
                className="glass px-8 py-4 rounded-lg neon-border hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
              >
                <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
                <span>About Me</span>
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="glass px-8 py-4 rounded-lg neon-border hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
              >
                <Code2 className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                <span>Projects</span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="glass px-8 py-4 rounded-lg neon-border hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
              >
                <Smartphone className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
                <span>Contact</span>
              </button>
            </div>

            <div className="flex gap-6 justify-center lg:justify-start text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <span>Available for projects</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div ref={canvasRef} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
