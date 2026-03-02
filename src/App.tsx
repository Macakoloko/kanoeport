/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import Lenis from 'lenis';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Github, 
  ExternalLink,
  Zap,
  Layers,
  Target,
  MousePointer2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Cpu,
  Box,
  Eye,
  Activity
} from 'lucide-react';
import { HeroScene } from './components/HeroScene';
import { cn } from './utils/cn';

const PROJECTS = [
  {
    id: 1,
    title: "LOJA DAS LIAS & D'ORIGEM",
    category: "Ecommerce & Social Media",
    shortDesc: "High-end fashion boutique ecosystem.",
    image: "https://picsum.photos/seed/fashion-boutique/1200/1600",
    color: "#00ff41",
    description: "Full digital ecosystem for high-end fashion boutiques. From seamless ecommerce experiences to high-impact social media presence.",
    className: "col-span-2 row-span-2",
    links: [
      { label: "D'Origem Boutique", url: "https://dorigemboutique.com/" },
      { label: "Loja das Lias", url: "https://lojadaslias.com/" }
    ],
    gallery: [
      "https://picsum.photos/seed/fashion-1/800/600",
      "https://picsum.photos/seed/fashion-2/800/600",
      "https://picsum.photos/seed/fashion-3/800/600"
    ]
  },
  {
    id: 2,
    title: "PERSONAL TRAINER",
    category: "Site & Visual ID",
    shortDesc: "High-performance digital identity for trainers.",
    image: "https://picsum.photos/seed/fitness-gym/1200/1600",
    color: "#d4af37",
    description: "A raw, high-performance digital identity for a personal trainer. Built for speed, results, and pure motivation.",
    className: "col-span-2 row-span-1",
    links: [
      { label: "Sem Dedo Project", url: "https://semdedo.vercel.app/" }
    ],
    gallery: [
      "https://picsum.photos/seed/gym-1/800/600",
      "https://picsum.photos/seed/gym-2/800/600",
      "https://picsum.photos/seed/gym-3/800/600"
    ]
  },
  {
    id: 3,
    title: "ALTA MESA",
    category: "Food Photography",
    shortDesc: "Visual storytelling for the culinary world.",
    image: "https://picsum.photos/seed/food-photography/1200/1600",
    color: "#00f2ff",
    description: "Visual storytelling for the culinary world. A minimalist, elegant portfolio showcasing the art of food photography.",
    className: "col-span-1 row-span-1",
    links: [
      { label: "Alta Mesa Site", url: "https://altamesa-theta.vercel.app/" }
    ],
    gallery: [
      "https://picsum.photos/seed/food-1/800/600",
      "https://picsum.photos/seed/food-2/800/600",
      "https://picsum.photos/seed/food-3/800/600"
    ]
  },
  {
    id: 4,
    title: "AB BARBER",
    category: "Branding & Social",
    shortDesc: "Complete visual overhaul for barber shops.",
    image: "https://picsum.photos/seed/barber-shop/1200/1600",
    color: "#ffffff",
    description: "The ultimate barber shop experience. A complete visual overhaul including site, social media, and brand identity.",
    className: "col-span-1 row-span-1",
    links: [
      { label: "AB Barber Site", url: "https://abbarber-topaz.vercel.app/" }
    ],
    gallery: [
      "https://picsum.photos/seed/barber-1/800/600",
      "https://picsum.photos/seed/barber-2/800/600",
      "https://picsum.photos/seed/barber-3/800/600"
    ]
  }
];

const TEAM = [
  {
    name: "GABRIEL FERREIRA",
    role: "Creative Director",
    image: "https://i.ibb.co/qMb17LMV/Gabriel-Ferreira-Fundadore-Tecnologia-e-webdesign.jpg",
    bio: "The visionary behind the chaos. Specialized in breaking rules and creating new ones."
  },
  {
    name: "KANOÊ TWO",
    role: "Lead Developer",
    image: "https://picsum.photos/seed/k2/800/1000",
    bio: "Turning abstract concepts into digital reality. Master of the neural link."
  }
];

const SERVICES = [
  { 
    icon: Zap, 
    activeIcon: Cpu,
    title: "High Speed Dev", 
    activeTitle: "OVERCLOCKED",
    desc: "Fast as lightning, sharp as a blade.",
    activeDesc: "Pushing limits beyond the standard clock speed."
  },
  { 
    icon: Layers, 
    activeIcon: Box,
    title: "3D Immersive", 
    activeTitle: "META REALITY",
    desc: "Breaking the 2D barrier with style.",
    activeDesc: "Total immersion in a synthetic environment."
  },
  { 
    icon: Target, 
    activeIcon: Eye,
    title: "Brand Strategy", 
    activeTitle: "MIND CONTROL",
    desc: "Hitting the mark every single time.",
    activeDesc: "Infiltrating the collective consciousness."
  },
  { 
    icon: MousePointer2, 
    activeIcon: Activity,
    title: "UX/UI Design", 
    activeTitle: "NEURAL LINK",
    desc: "Interfaces that feel like a game.",
    activeDesc: "Direct link between thought and digital action."
  }
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0], index: number }) {
  const [isActive, setIsActive] = useState(false);
  const Icon = isActive ? service.activeIcon : service.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setIsActive(!isActive)}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative p-4 md:p-12 border border-white/10 transition-all duration-500 cursor-pointer overflow-hidden group aspect-square md:aspect-auto",
        isActive ? "bg-kanoe-green text-kanoe-black border-kanoe-green" : "bg-transparent hover:border-kanoe-green/50"
      )}
    >
      {/* Glitch Background on Active */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col h-full justify-between md:justify-start gap-4 md:gap-6">
        <div className="flex justify-between items-start">
          <Icon size={32} className={cn(
            "transition-colors duration-300 md:w-12 md:h-12",
            isActive ? "text-kanoe-black" : "text-kanoe-green"
          )} />
          <span className="font-mono text-[8px] md:text-[10px] opacity-40">0{index + 1}</span>
        </div>
        
        <motion.div
          key={isActive ? 'active' : 'inactive'}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <h3 className="text-lg md:text-4xl font-display mb-1 md:mb-4 uppercase tracking-tight leading-none">
            {isActive ? service.activeTitle : service.title}
          </h3>
          <p className={cn(
            "text-[10px] md:text-lg leading-tight md:leading-relaxed transition-colors duration-300 line-clamp-3 md:line-clamp-none",
            isActive ? "text-kanoe-black/80" : "text-white/60"
          )}>
            {isActive ? service.activeDesc : service.desc}
          </p>
        </motion.div>

        <div className="flex items-center gap-2 mt-auto md:mt-4">
          <div className={cn(
            "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse",
            isActive ? "bg-kanoe-black" : "bg-kanoe-green"
          )}></div>
          <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-widest">
            {isActive ? "Active" : "Link"}
          </span>
        </div>
      </div>

      {/* Border Animation */}
      <motion.div 
        initial={false}
        animate={{ width: isActive ? '100%' : '0%' }}
        className="absolute bottom-0 left-0 h-1 bg-kanoe-black"
      />
    </motion.div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formOrigin, setFormOrigin] = useState({ x: 0, y: 0 });
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({ vision: '', name: '', email: '', budget: '' });
  const [showLinks, setShowLinks] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const formQuestions = [
    { key: 'vision', question: "What's your vision?", placeholder: "Tell us about your project..." },
    { key: 'name', question: "What's your name?", placeholder: "Your name..." },
    { key: 'email', question: "Your email address?", placeholder: "email@example.com" },
    { key: 'budget', question: "What's your budget range?", placeholder: "e.g. $5k - $10k" },
  ];

  const handleFormNext = () => {
    if (formStep < formQuestions.length - 1) {
      setFormStep(prev => prev + 1);
    } else {
      // Final Step: WhatsApp Integration
      const message = `*KANOÊ AGENCY - NEW LEAD*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Vision:* ${formData.vision}%0A*Budget:* ${formData.budget}`;
      window.open(`https://wa.me/936356199?text=${message}`, '_blank');
      setIsFormOpen(false);
      setFormStep(0);
      setFormData({ vision: '', name: '', email: '', budget: '' });
    }
  };

  const openForm = (e: React.MouseEvent) => {
    setFormOrigin({ x: e.clientX, y: e.clientY });
    setIsFormOpen(true);
  };

  const { scrollYProgress } = useScroll();
  const textX = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const nextProject = () => {
    if (!selectedProject) return;
    setShowLinks(false);
    setIsGalleryOpen(false);
    const currentIndex = PROJECTS.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    setSelectedProject(PROJECTS[nextIndex]);
  };

  const prevProject = () => {
    if (!selectedProject) return;
    setShowLinks(false);
    setIsGalleryOpen(false);
    const currentIndex = PROJECTS.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    setSelectedProject(PROJECTS[prevIndex]);
  };

  // Lock body scroll when a project or menu or form is selected
  useEffect(() => {
    if (selectedProject || isMenuOpen || isFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, isMenuOpen, isFormOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsFormOpen(false);
        setShowLinks(false);
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={cn(
      "relative min-h-screen bg-kanoe-black text-white font-sans selection:bg-kanoe-green transition-colors duration-700 overflow-x-hidden"
    )}>
      {/* Custom Cursor / Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 p-6 flex justify-between items-center mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display tracking-tighter cursor-pointer"
          onClick={() => {
            setSelectedProject(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          KANOÊ<span className="text-kanoe-green">.</span>
        </motion.div>
        
        <div className="flex items-center gap-8">
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 p-2 hover:scale-110 transition-transform bg-kanoe-black/20 backdrop-blur-sm rounded-full"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </motion.button>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 100 }}
            className="fixed inset-0 z-40 bg-kanoe-green flex flex-col items-center justify-center p-12"
          >
            {/* Top Right Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 p-4 text-kanoe-black hover:scale-110 transition-transform"
            >
              <X size={48} />
            </motion.button>

            {/* Close button for mobile explicitly handled by the nav button above, but adding a secondary one here for clarity if needed */}
            <div className="flex flex-col gap-8 text-center">
              {['HOME', 'PROJECTS', 'SERVICES', 'CONTACT'].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-6xl md:text-8xl font-display hover:italic transition-all duration-300 text-kanoe-black"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => setIsMenuOpen(false)}
              className="mt-12 p-4 border-2 border-kanoe-black rounded-full text-kanoe-black hover:bg-kanoe-black hover:text-kanoe-green transition-all font-mono text-sm"
            >
              CLOSE MENU [ESC]
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail View (Game-like Overlay) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            layoutId={`project-container-${selectedProject.id}`}
            className="fixed inset-0 z-[60] bg-kanoe-black flex flex-col md:flex-row overflow-y-auto md:overflow-hidden scrollbar-hide"
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Navigation Controls - Fixed and Non-overlapping */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="fixed top-1/2 left-4 -translate-y-1/2 z-[70] hidden xl:block"
            >
              <button 
                onClick={prevProject}
                className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-kanoe-green hover:text-kanoe-black transition-all"
              >
                <ChevronLeft size={32} />
              </button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="fixed top-1/2 right-4 -translate-y-1/2 z-[70] hidden xl:block"
            >
              <button 
                onClick={nextProject}
                className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-kanoe-green hover:text-kanoe-black transition-all"
              >
                <ChevronRight size={32} />
              </button>
            </motion.div>

            {/* Mobile/Tablet Nav */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="xl:hidden flex justify-between items-center p-6 bg-kanoe-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50"
            >
              <button onClick={prevProject} className="p-2 hover:text-kanoe-green transition-colors"><ChevronLeft size={24} /></button>
              <span className="font-mono text-[10px] text-kanoe-green uppercase tracking-widest">Project {PROJECTS.findIndex(p => p.id === selectedProject.id) + 1} / {PROJECTS.length}</span>
              <button onClick={nextProject} className="p-2 hover:text-kanoe-green transition-colors"><ChevronRight size={24} /></button>
            </motion.div>

            {/* Background Image (Full screen on mobile, half on desktop) */}
            <div className="fixed md:relative inset-0 md:inset-auto w-full md:w-1/2 h-full md:h-full overflow-hidden shrink-0">
              <motion.img 
                layoutId={`project-img-${selectedProject.id}`}
                src={selectedProject.image} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Darkening Overlays */}
              <div className="absolute inset-0 bg-kanoe-black/60 md:bg-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-kanoe-black via-transparent to-transparent hidden md:block"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-kanoe-black via-kanoe-black/20 to-transparent md:hidden"></div>
            </div>

            {/* Content Area */}
            <div className="relative w-full md:w-1/2 min-h-screen md:min-h-0 p-6 md:p-12 lg:p-20 flex flex-col justify-center overflow-y-auto scrollbar-hide">
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  setSelectedProject(null);
                  setShowLinks(false);
                  setIsGalleryOpen(false);
                }}
                className="absolute top-6 right-6 p-3 border border-white/20 rounded-full bg-kanoe-black/40 backdrop-blur-md hover:bg-white hover:text-kanoe-black transition-all z-[70]"
              >
                <X size={20} />
              </motion.button>

              <div className="max-w-xl mx-auto md:mx-0 w-full py-12 md:py-0">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-mono text-kanoe-green mb-4 tracking-[0.3em] uppercase text-[10px]"
                >
                  {selectedProject.category}
                </motion.p>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl md:text-5xl lg:text-6xl font-display leading-tight mb-6"
                >
                  {selectedProject.title}
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-base md:text-lg text-white/80 md:text-white/60 leading-relaxed mb-10"
                >
                  {selectedProject.description}
                </motion.p>

                {/* Gallery Toggle Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-10"
                >
                  <button 
                    onClick={() => setIsGalleryOpen(!isGalleryOpen)}
                    className="flex items-center gap-3 font-mono text-[10px] text-kanoe-green uppercase tracking-widest hover:opacity-70 transition-opacity"
                  >
                    {isGalleryOpen ? "[ CLOSE GALLERY ]" : "[ VIEW GALLERY ]"}
                    <div className={cn("w-2 h-2 rounded-full bg-kanoe-green animate-pulse", isGalleryOpen && "bg-white")} />
                  </button>

                  <AnimatePresence>
                    {isGalleryOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden mt-6"
                      >
                        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
                          {selectedProject.gallery?.map((img, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              className="min-w-[260px] h-[160px] rounded-lg overflow-hidden border border-white/10 snap-start shadow-2xl"
                            >
                              <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-3 relative"
                >
                  <button 
                    onClick={(e) => openForm(e)}
                    className="flex-1 py-5 bg-kanoe-green text-kanoe-black font-display text-xl rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                  >
                    LAUNCH PROJECT
                  </button>
                  
                  <div className="flex-1 relative">
                    <button 
                      onClick={() => setShowLinks(!showLinks)}
                      className="w-full py-5 border border-white/20 rounded-lg bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest"
                    >
                      MORE INFO {showLinks ? <X size={14} /> : <Plus size={14} />}
                    </button>

                    <AnimatePresence>
                      {showLinks && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full right-0 mb-4 w-64 bg-kanoe-black border border-white/10 rounded-xl p-4 shadow-2xl z-[80]"
                        >
                          <p className="text-[10px] font-mono text-white/40 uppercase mb-4 tracking-widest border-b border-white/10 pb-2">Project Links</p>
                          <div className="space-y-2">
                            {selectedProject.links?.map((link, idx) => (
                              <a 
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-kanoe-green hover:text-kanoe-black transition-all group"
                              >
                                <span className="font-display text-sm uppercase">{link.label}</span>
                                <ExternalLink size={14} className="opacity-40 group-hover:opacity-100" />
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Typeform-style Contact Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: formOrigin.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0), y: formOrigin.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0) }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            style={{ transformOrigin: `${formOrigin.x}px ${formOrigin.y}px` }}
            className="fixed inset-0 z-[100] bg-kanoe-black flex items-center justify-center p-6 md:p-12"
          >
            <button 
              onClick={() => {
                setIsFormOpen(false);
                setFormStep(0);
              }}
              className="absolute top-8 right-8 p-4 text-white/60 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <div className="max-w-2xl w-full">
              <div className="mb-12">
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((formStep + 1) / formQuestions.length) * 100}%` }}
                    className="h-full bg-kanoe-green"
                  />
                </div>
                <p className="font-mono text-[10px] mt-4 text-kanoe-green uppercase">STEP 0{formStep + 1} / 0{formQuestions.length}</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={formStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-4xl md:text-6xl font-display mb-8 uppercase">{formQuestions[formStep].question}</h2>
                  <input 
                    autoFocus
                    type="text" 
                    value={formData[formQuestions[formStep].key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [formQuestions[formStep].key]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleFormNext()}
                    placeholder={formQuestions[formStep].placeholder}
                    className="w-full bg-transparent border-b-2 border-white/20 py-4 text-2xl md:text-4xl focus:border-kanoe-green outline-none transition-colors font-sans"
                  />
                  <div className="mt-12 flex items-center gap-6">
                    <button 
                      onClick={handleFormNext}
                      className="px-8 py-4 bg-kanoe-green text-kanoe-black font-display text-lg rounded-lg hover:scale-105 transition-transform"
                    >
                      {formStep === formQuestions.length - 1 ? "FINISH ✓" : "OK ✓"}
                    </button>
                    <span className="font-mono text-xs text-white/40">press ENTER</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Canvas dpr={[1, 2]} performance={{ min: 0.5 }}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <HeroScene />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[20vw] md:text-[15vw] font-display leading-[0.8] tracking-tighter uppercase"
          >
            KANOÊ
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex flex-col md:flex-row items-center justify-center gap-4 text-sm md:text-base font-mono uppercase tracking-[0.2em]"
          >
            <span>Underground Creative Agency</span>
            <span className="hidden md:inline text-kanoe-green">•</span>
            <span>Est. 2024</span>
          </motion.div>
        </div>

        <motion.div 
          style={{ x: textX }}
          className="absolute bottom-12 left-0 whitespace-nowrap text-[10vh] font-display opacity-10 pointer-events-none select-none"
        >
          MOTHERFUCK*R AESTHETIC • BOLD DESIGN • GAME CHANGER • MOTHERFUCK*R AESTHETIC • BOLD DESIGN • GAME CHANGER
        </motion.div>
      </section>

      {/* About / Intro */}
      <section className="py-32 px-6 md:px-24">
        <div className="max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-medium leading-tight"
          >
            We don't follow trends. We <span className="text-kanoe-green italic">break</span> them. 
            Kanoê is a creative powerhouse focused on high-impact digital experiences that feel like a game and hit like a bass drop.
          </motion.p>
        </div>
      </section>

      {/* Cyberpunk Portfolio Section */}
      <section id="projects" className="py-32 px-6 md:px-12 bg-kanoe-black relative overflow-hidden">
        {/* Background Grid/Scanlines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px]"></div>

        <div className="relative z-10 mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-kanoe-green"></div>
            <span className="font-mono text-xs text-kanoe-green tracking-[0.5em] uppercase">Archive_01 // Portfolio</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-display leading-none tracking-tighter">
            DATA<br/><span className="text-stroke">STREAMS</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {PROJECTS.map((project, i) => (
            <motion.div 
              layoutId={`project-container-${project.id}`}
              key={project.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProject(project)}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-xl bg-white/5",
                project.className
              )}
            >
              {/* Glitch Frame */}
              <div className="absolute -inset-2 border border-kanoe-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-kanoe-green"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-kanoe-green"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-kanoe-green"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-kanoe-green"></div>
              </div>

              <div className="relative h-full min-h-[200px] md:min-h-[300px] overflow-hidden">
                <motion.img 
                  layoutId={`project-img-${project.id}`}
                  whileHover={{ scale: 1.05 }}
                  src={project.image} 
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
                
                {/* Color Overlay on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: project.color }}
                ></div>
                
                {/* Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-kanoe-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute top-4 left-4 font-mono text-[10px] text-kanoe-green opacity-0 group-hover:opacity-100 transition-opacity">
                  [ STATUS: ENCRYPTED ]<br/>
                  [ ID: 00{project.id} ]
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-mono text-xs text-kanoe-green mb-1 tracking-widest uppercase">{project.category}</p>
                  <h3 className="text-2xl md:text-4xl font-display group-hover:text-kanoe-green transition-colors leading-tight">{project.title}</h3>
                  <p className="font-mono text-[10px] text-white/40 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">{project.shortDesc}</p>
                </div>

                {/* Interactive Scanline */}
                <motion.div 
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-x-0 h-px bg-kanoe-green/30 pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dynamic Interactive Services Section */}
      <section id="services" className="py-32 px-6 md:px-24 bg-kanoe-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-kanoe-green/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="text-center mb-24 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display mb-4"
          >
            NEURAL LINK
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-sm text-white/40 uppercase tracking-[0.3em]"
          >
            Tap to activate services
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-px md:border md:border-white/10">
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* Marquee Section */}
      <div className="py-12 bg-kanoe-green overflow-hidden border-y border-white/20">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 items-center text-kanoe-black"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl font-display uppercase tracking-tighter flex items-center gap-12">
              KANOÊ AGENCY <Zap className="fill-current" /> BOLD AS F*CK <Zap className="fill-current" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* Team Section */}
      <section id="team" className="py-32 px-6 md:px-24 bg-kanoe-black relative">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-kanoe-green"></div>
            <span className="font-mono text-xs text-kanoe-green tracking-[0.5em] uppercase">The Squad // Neural Network</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-display leading-none tracking-tighter">
            THE<br/><span className="text-stroke">SQUAD</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TEAM.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5 border border-white/10"
            >
              <img 
                src={member.image} 
                alt={member.name}
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-kanoe-black via-kanoe-black/20 to-transparent opacity-80"></div>
              
              <div className="absolute bottom-12 left-12 right-12">
                <p className="font-mono text-kanoe-green mb-2 tracking-widest uppercase">{member.role}</p>
                <h3 className="text-4xl md:text-6xl font-display mb-4">{member.name}</h3>
                <p className="text-white/60 font-sans max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {member.bio}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-8 right-8 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:border-kanoe-green transition-colors">
                <Plus className="text-white/20 group-hover:text-kanoe-green transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-24 relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-kanoe-green/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-kanoe-gold/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-7xl md:text-[12vw] font-display leading-[0.9] mb-12"
          >
            LET'S START<br/><span className="text-stroke">A RIOT.</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <button 
              onClick={(e) => openForm(e)}
              className="px-12 py-6 bg-white text-kanoe-black font-display text-xl rounded-full hover:bg-kanoe-green hover:text-white transition-all duration-300 group flex items-center gap-4"
            >
              WORK WITH US
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <div className="flex gap-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-4 border border-white/20 rounded-full hover:bg-white hover:text-kanoe-black transition-all z-20">
                <Instagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-4 border border-white/20 rounded-full hover:bg-white hover:text-kanoe-black transition-all z-20">
                <Twitter size={24} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-4 border border-white/20 rounded-full hover:bg-white hover:text-kanoe-black transition-all z-20">
                <Github size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-white/40 font-mono text-xs uppercase tracking-widest">
        <div className="flex flex-col gap-4">
          <div>© 2024 KANOÊ AGENCY. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-4">
            {[Instagram, Twitter, Github].map((Icon, i) => (
              <a key={i} href="#" className="p-2 border border-white/10 rounded-full hover:bg-white hover:text-kanoe-black transition-all">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
        <div className="flex items-center gap-2">
          MADE WITH <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-kanoe-green">❤</motion.span> BY KANOÊ
        </div>
      </footer>
    </div>
  );
}
