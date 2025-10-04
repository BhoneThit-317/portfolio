import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Smartphone, Database, Cloud, Server, Code, Layers } from 'lucide-react';

const skills = [
  { name: 'Flutter', icon: Smartphone, color: '#02569B', position: 0 },
  { name: 'Laravel', icon: Server, color: '#FF2D20', position: 1 },
  { name: 'Express.js', icon: Code, color: '#68A063', position: 2 },
  { name: 'Next.js', icon: Layers, color: '#000000', position: 3 },
  { name: 'PostgreSQL', icon: Database, color: '#336791', position: 4 },
  { name: 'Firebase', icon: Cloud, color: '#FFCA28', position: 5 },
];

const strengths = [
  {
    title: 'Mobile-First Development',
    description: 'Expert in Flutter for creating beautiful, high-performance cross-platform mobile applications.',
    icon: Smartphone,
  },
  {
    title: 'Scalable Backend',
    description: 'Building robust APIs with Laravel, Express.js, and .NET for enterprise-grade applications.',
    icon: Server,
  },
  {
    title: 'Cloud Integration',
    description: 'Seamless integration with Firebase, AWS, and modern cloud infrastructure using Docker & Nginx.',
    icon: Cloud,
  },
];

export const About = () => {
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orbitRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    orbitRef.current.appendChild(renderer.domElement);

    const spheres: THREE.Mesh[] = [];
    const radius = 3;

    skills.forEach((skill, index) => {
      const geometry = new THREE.SphereGeometry(0.3, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: skill.color,
        metalness: 0.7,
        roughness: 0.2,
        emissive: skill.color,
        emissiveIntensity: 0.3,
      });
      const sphere = new THREE.Mesh(geometry, material);

      const angle = (index / skills.length) * Math.PI * 2;
      sphere.position.x = Math.cos(angle) * radius;
      sphere.position.z = Math.sin(angle) * radius;
      sphere.position.y = Math.sin(angle * 2) * 0.5;

      scene.add(sphere);
      spheres.push(sphere);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 8;

    const animate = () => {
      requestAnimationFrame(animate);

      spheres.forEach((sphere, index) => {
        const time = Date.now() * 0.001;
        const angle = (index / skills.length) * Math.PI * 2 + time * 0.5;
        sphere.position.x = Math.cos(angle) * radius;
        sphere.position.z = Math.sin(angle) * radius;
        sphere.position.y = Math.sin(angle * 2 + time) * 0.8;
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      spheres.forEach(sphere => {
        sphere.geometry.dispose();
        (sphere.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <section id="about" className="relative min-h-screen py-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="flex justify-center">
            <div className="relative">
              <div className="glass w-64 h-64 rounded-full flex items-center justify-center overflow-hidden neon-border">
                <div className="w-56 h-56 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center text-8xl font-bold">
                  YN
                </div>
              </div>
              <div ref={orbitRef} className="absolute -right-20 -top-20 opacity-70"></div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-cyan-400">Full-Stack Developer</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Passionate developer specializing in <span className="text-cyan-400 font-semibold">Flutter</span> mobile development
              with extensive experience in building scalable backend systems using <span className="text-purple-400 font-semibold">Laravel</span>,
              <span className="text-purple-400 font-semibold"> Express.js</span>,
              <span className="text-purple-400 font-semibold"> Next.js</span>, and
              <span className="text-purple-400 font-semibold"> .NET</span>.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              With expertise in <span className="text-pink-400 font-semibold">PostgreSQL</span>,
              <span className="text-pink-400 font-semibold"> Firebase</span>,
              <span className="text-pink-400 font-semibold"> OData</span>, and modern DevOps tools like
              <span className="text-pink-400 font-semibold"> Docker</span> and
              <span className="text-pink-400 font-semibold"> Nginx</span>, I create end-to-end solutions that deliver exceptional user experiences.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Also experienced in <span className="text-cyan-400 font-semibold">C# Windows Forms</span> development for desktop applications.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="glass px-4 py-2 rounded-lg hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
                >
                  <span className="text-sm font-semibold">{skill.name}</span>
                </div>
              ))}
              <div className="glass px-4 py-2 rounded-lg hover:scale-110 transition-all duration-300">
                <span className="text-sm font-semibold">.NET</span>
              </div>
              <div className="glass px-4 py-2 rounded-lg hover:scale-110 transition-all duration-300">
                <span className="text-sm font-semibold">OData</span>
              </div>
              <div className="glass px-4 py-2 rounded-lg hover:scale-110 transition-all duration-300">
                <span className="text-sm font-semibold">Nginx</span>
              </div>
              <div className="glass px-4 py-2 rounded-lg hover:scale-110 transition-all duration-300">
                <span className="text-sm font-semibold">Docker</span>
              </div>
              <div className="glass px-4 py-2 rounded-lg hover:scale-110 transition-all duration-300">
                <span className="text-sm font-semibold">C#</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {strengths.map((strength, index) => {
            const Icon = strength.icon;
            return (
              <div
                key={index}
                className="glass p-8 rounded-2xl hover:scale-105 transition-all duration-300 hover:neon-border group"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-4 text-cyan-400">{strength.title}</h4>
                <p className="text-gray-300 leading-relaxed">{strength.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
