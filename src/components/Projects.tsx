import { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github, Smartphone, Server, Globe } from 'lucide-react';
import * as THREE from 'three';

const projects = [
  {
    title: 'E-Commerce Mobile App',
    description: 'Full-featured Flutter e-commerce application with real-time inventory, payment integration, and push notifications.',
    tech: ['Flutter', 'Firebase', 'Stripe API', 'Provider'],
    category: 'mobile',
    icon: Smartphone,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Healthcare Management System',
    description: 'Complete hospital management platform with patient records, appointment scheduling, and billing system.',
    tech: ['Laravel', 'PostgreSQL', 'Vue.js', 'Docker'],
    category: 'fullstack',
    icon: Server,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Social Media Dashboard',
    description: 'Real-time analytics dashboard for social media metrics with beautiful data visualizations.',
    tech: ['Next.js', 'Express.js', 'MongoDB', 'Socket.io'],
    category: 'web',
    icon: Globe,
    gradient: 'from-pink-500 to-orange-500',
  },
  {
    title: 'Food Delivery App',
    description: 'Multi-vendor food delivery platform with real-time order tracking and payment gateway integration.',
    tech: ['Flutter', 'Laravel', 'MySQL', 'Google Maps API'],
    category: 'mobile',
    icon: Smartphone,
    gradient: 'from-green-500 to-teal-500',
  },
  {
    title: 'REST API Gateway',
    description: 'Scalable API gateway with rate limiting, authentication, and comprehensive documentation.',
    tech: ['.NET Core', 'PostgreSQL', 'Redis', 'Swagger'],
    category: 'backend',
    icon: Server,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Task Management SaaS',
    description: 'Collaborative task management platform with real-time updates and team collaboration features.',
    tech: ['Next.js', 'Firebase', 'Tailwind CSS', 'TypeScript'],
    category: 'web',
    icon: Globe,
    gradient: 'from-violet-500 to-purple-500',
  },
];

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const scenes: {
      scene: THREE.Scene;
      camera: THREE.PerspectiveCamera;
      renderer: THREE.WebGLRenderer;
      cube: THREE.Mesh;
      animationId: number;
    }[] = [];

    sceneRefs.current.forEach((ref, index) => {
      if (!ref) return;

      ref.innerHTML = '';

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(80, 80);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      ref.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({
        color: index % 2 === 0 ? 0x06b6d4 : 0x8b5cf6,
        metalness: 0.7,
        roughness: 0.2,
        emissive: index % 2 === 0 ? 0x06b6d4 : 0x8b5cf6,
        emissiveIntensity: 0.3,
      });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      const light = new THREE.PointLight(0xffffff, 1);
      light.position.set(2, 2, 2);
      scene.add(light);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      camera.position.z = 2;

      const animate = () => {
        const animationId = requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        scenes[index].animationId = animationId;
      };

      scenes.push({ scene, camera, renderer, cube, animationId: 0 });
      animate();
    });

    return () => {
      scenes.forEach(({ renderer, cube, animationId }) => {
        cancelAnimationFrame(animationId);
        renderer.dispose();
        cube.geometry.dispose();
        (cube.material as THREE.Material).dispose();
      });
    };
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'web', label: 'Web' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' },
  ];

  return (
    <section id="projects" className="relative min-h-screen py-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent work across mobile, web, and backend development
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'glass neon-border scale-105'
                  : 'glass hover:scale-105'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={index}
                className="glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                    //   ref={el => sceneRefs.current[index] = el}
                      className="opacity-50"
                    ></div>
                    <Icon className="w-20 h-20 text-white/80 absolute" />
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-cyan-400 group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button className="flex items-center gap-2 glass px-4 py-2 rounded-lg hover:neon-border transition-all duration-300">
                      <Github className="w-4 h-4" />
                      <span className="text-sm">Code</span>
                    </button>
                    <button className="flex items-center gap-2 glass px-4 py-2 rounded-lg hover:neon-border transition-all duration-300">
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">Live</span>
                    </button>
                  </div>
                </div>

                {hoveredIndex === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
