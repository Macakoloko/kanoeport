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
  ArrowUpRight,
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
import { translations, Language } from './translations';
import { cn } from './utils/cn';

const PROJECTS = [
  {
    id: 1,
    type: "site",
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
    ]
  },
  {
    id: 4,
    type: "site",
    title: "AB BARBER",
    category: "Branding & Social",
    shortDesc: "Complete visual overhaul for barber shops.",
    image: "https://picsum.photos/seed/barber-shop/1200/1600",
    color: "#ffffff",
    description: "The ultimate barber shop experience. A complete visual overhaul including site, social media, and brand identity.",
    className: "col-span-1 row-span-1",
    links: [
      { label: "AB Barber Site", url: "https://abbarber-topaz.vercel.app/" }
    ]
  },
  {
    id: 5,
    type: "video",
    title: "AB BARBER - EPISODE 1",
    category: "Cinematography",
    shortDesc: "The art of the cut.",
    image: "https://picsum.photos/seed/barber-video-1/1200/1600",
    videoUrl: "https://drive.google.com/file/d/1s5NHskpVtxwciy34Q9Aj47OZuajCb9XV/preview",
    color: "#ff00ff",
    description: "A cinematic look at the AB Barber experience. Precision, style, and tradition.",
    className: "col-span-1 row-span-1"
  },
  {
    id: 6,
    type: "video",
    title: "AB BARBER - EPISODE 2",
    category: "Cinematography",
    shortDesc: "Style in motion.",
    image: "https://picsum.photos/seed/barber-video-2/1200/1600",
    videoUrl: "https://drive.google.com/file/d/1CyRiS6pM2oF5iIPOB8H-seJmfLi-t2IG/preview",
    color: "#00ff00",
    description: "Continuing the journey through the world of AB Barber. Where every detail matters.",
    className: "col-span-1 row-span-1"
  },
  {
    id: 8,
    type: "video",
    title: "CHESTER CERVEJARIA - CRAFT",
    category: "Cinematography",
    shortDesc: "The brewing process revealed.",
    image: "https://picsum.photos/seed/beer-video-1/1200/1600",
    videoUrl: "https://drive.google.com/file/d/1lkRTSv5xsvenFk_JY6FfxrT9dDzJIptn/preview",
    color: "#ff0080",
    description: "A deep dive into the craft of brewing at Chester Cervejaria. From grain to glass.",
    className: "col-span-1 row-span-1"
  },
  {
    id: 9,
    type: "video",
    title: "CHESTER CERVEJARIA - LIFESTYLE",
    category: "Cinematography",
    shortDesc: "Good times, great beer.",
    image: "https://picsum.photos/seed/beer-video-2/1200/1600",
    videoUrl: "https://drive.google.com/file/d/1CVm413VS00tGfMtGygOPeyZ-XJAiwY0i/preview",
    color: "#00ffff",
    description: "Capturing the atmosphere and lifestyle surrounding Chester Cervejaria.",
    className: "col-span-1 row-span-1"
  },
  {
    id: 11,
    type: "video",
    title: "DORIGEM & LOJA DAS LIAS",
    category: "Fashion Film",
    shortDesc: "Elegance in every frame.",
    image: "https://picsum.photos/seed/fashion-video/1200/1600",
    videoUrl: "https://drive.google.com/file/d/1Zmi_55L9h1BCnUeHBkwBerxWxm4eAD9I/preview",
    color: "#ffcc00",
    description: "A high-fashion visual journey for Dorigem Boutique and Loja das Lias.",
    className: "col-span-1 row-span-1"
  },
  {
    id: 12,
    type: "video",
    title: "CHESTER CERVEJARIA - FINALE",
    category: "Cinematography",
    shortDesc: "The ultimate beer experience.",
    image: "https://picsum.photos/seed/beer-video-3/1200/1600",
    videoUrl: "https://drive.google.com/file/d/1BMZlgTjh83KIjfpmDCXdal-x5wp5rjYR/preview",
    color: "#ff3300",
    description: "The final chapter in our exploration of Chester Cervejaria.",
    className: "col-span-1 row-span-1"
  },
  {
    id: 10,
    type: "site",
    title: "CREATIVE STUDIO",
    category: "Portfolio & Branding",
    shortDesc: "Minimalist portfolio for creative professionals.",
    image: "https://picsum.photos/seed/studio-site/1200/1600",
    color: "#ff3300",
    description: "A clean, minimalist portfolio designed to let the work speak for itself. High focus on typography and white space.",
    className: "col-span-1 row-span-1",
    links: [
      { label: "Studio Live", url: "#" }
    ]
  }
];

const TEAM = [
  {
    name: "GILSU",
    role: "The One-Man Army",
    image: "https://i.ibb.co/qMb17LMV/Gabriel-Ferreira-Fundadore-Tecnologia-e-webdesign.jpg",
    bio: "Designer, dev, strategist, and master of pretending there's a whole team behind the scenes. If it's good, it was me. If there's a bug, it was the intern (who is also me)."
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

function ServiceCard({ service, index, t }: { service: typeof SERVICES[0], index: number, t: any }) {
  const [isActive, setIsActive] = useState(false);
  const Icon = isActive ? service.activeIcon : service.icon;
  const serviceT = t.services.items[index];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setIsActive(!isActive)}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative p-6 md:p-12 border border-white/10 transition-all duration-500 cursor-pointer overflow-hidden group aspect-square md:aspect-auto",
        isActive ? "bg-gilsu-green text-gilsu-black border-gilsu-green" : "bg-transparent hover:border-gilsu-green/50"
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
            isActive ? "text-gilsu-black" : "text-gilsu-green"
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
            {isActive ? serviceT.activeTitle : serviceT.title}
          </h3>
          <p className={cn(
            "text-[10px] md:text-lg leading-tight md:leading-relaxed transition-colors duration-300 line-clamp-3 md:line-clamp-none",
            isActive ? "text-gilsu-black/80" : "text-white/60"
          )}>
            {isActive ? serviceT.activeDesc : serviceT.desc}
          </p>
        </motion.div>

        <div className="flex items-center gap-2 mt-auto md:mt-4">
          <div className={cn(
            "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse",
            isActive ? "bg-gilsu-black" : "bg-gilsu-green"
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
        className="absolute bottom-0 left-0 h-1 bg-gilsu-black"
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
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'foto' | 'video' | 'site'>('all');
  const [lang, setLang] = useState<Language>('pt');

  const t = translations[lang];

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
    { key: 'vision', question: t.form.vision, placeholder: t.form.placeholderVision },
    { key: 'name', question: t.form.name, placeholder: t.form.placeholderName },
    { key: 'email', question: t.form.email, placeholder: t.form.placeholderEmail },
    { key: 'budget', question: t.form.budget, placeholder: t.form.placeholderBudget },
  ];

  const handleFormNext = () => {
    if (formStep < formQuestions.length - 1) {
      setFormStep(prev => prev + 1);
    } else {
      // Final Step: WhatsApp Integration
      const message = `*GILSU AGENCY - NEW LEAD*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Vision:* ${formData.vision}%0A*Budget:* ${formData.budget}`;
      window.open(`https://wa.me/351936356199?text=${message}`, '_blank');
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
      "relative min-h-screen bg-gilsu-black text-white font-sans selection:bg-gilsu-green transition-colors duration-700 overflow-x-hidden"
    )}>
      <motion.div 
        key="main-app"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
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
          GILSU<span className="text-gilsu-green">.</span>
        </motion.div>
        
        <div className="flex items-center gap-8">
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 p-2 hover:scale-110 transition-transform bg-gilsu-black/20 backdrop-blur-sm rounded-full"
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
            className="fixed inset-0 z-40 bg-gilsu-green flex flex-col items-center justify-center p-12"
          >
            {/* Top Right Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 p-4 text-gilsu-black hover:scale-110 transition-transform"
            >
              <X size={48} />
            </motion.button>

            {/* Close button for mobile explicitly handled by the nav button above, but adding a secondary one here for clarity if needed */}
        <div className="flex flex-col gap-6 text-center">
              {['WORK', 'SERVICES', 'ABOUT', 'CONTACT'].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-5xl md:text-8xl font-display hover:italic transition-all duration-300 text-gilsu-black"
                >
                  {t.nav[item.toLowerCase() as keyof typeof t.nav]}
                </motion.a>
              ))}
            </div>
            
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => setIsMenuOpen(false)}
              className="mt-8 p-4 border-2 border-gilsu-black rounded-full text-gilsu-black hover:bg-gilsu-black hover:text-gilsu-green transition-all font-mono text-[10px] tracking-widest"
            >
              {t.nav.close}
            </motion.button>

            {/* Language Selection in Menu */}
            <div className="mt-12 flex gap-4 flex-wrap justify-center">
              {(['pt', 'en', 'es', 'fr'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "px-4 py-2 border border-gilsu-black rounded-full text-gilsu-black font-mono text-[10px] tracking-widest transition-all",
                    lang === l ? "bg-gilsu-black text-gilsu-green" : "hover:bg-gilsu-black/10"
                  )}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail View (Game-like Overlay) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            layoutId={`project-container-${selectedProject.id}`}
            className="fixed inset-0 z-[60] bg-gilsu-black flex flex-col md:flex-row overflow-y-auto md:overflow-hidden scrollbar-hide"
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {selectedProject.type === 'video' ? (
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <motion.button 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => {
                    setSelectedProject(null);
                    setShowLinks(false);
                    setIsGalleryOpen(false);
                  }}
                  className="absolute top-6 right-6 p-3 border border-white/20 rounded-full bg-gilsu-black/40 backdrop-blur-md hover:bg-white hover:text-gilsu-black transition-all z-[70]"
                >
                  <X size={20} />
                </motion.button>

                <div className="absolute top-6 left-6 z-[70] pointer-events-none">
                  <span className="font-mono text-gilsu-green mb-2 tracking-[0.3em] uppercase text-[10px] block">{selectedProject.category}</span>
                  <h2 className="text-3xl md:text-5xl font-display uppercase">{selectedProject.title}</h2>
                </div>

                {selectedProject.videoUrl.includes('drive.google.com') ? (
                  <iframe 
                    src={selectedProject.videoUrl} 
                    className="w-full h-full border-0" 
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={selectedProject.title}
                  />
                ) : (
                  <video 
                    src={selectedProject.videoUrl} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            ) : (
              <>
                {/* Navigation Controls - Fixed and Non-overlapping */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="fixed top-1/2 left-4 -translate-y-1/2 z-[70] hidden xl:block"
                >
                  <button 
                    onClick={prevProject}
                    className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-gilsu-green hover:text-gilsu-black transition-all"
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
                    className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-gilsu-green hover:text-gilsu-black transition-all"
                  >
                    <ChevronRight size={32} />
                  </button>
                </motion.div>

                {/* Mobile/Tablet Nav */}
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="xl:hidden flex justify-between items-center p-6 bg-gilsu-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50"
                >
                  <button onClick={prevProject} className="p-2 hover:text-gilsu-green transition-colors"><ChevronLeft size={24} /></button>
                  <span className="font-mono text-[10px] text-gilsu-green uppercase tracking-widest">Project {PROJECTS.findIndex(p => p.id === selectedProject.id) + 1} / {PROJECTS.length}</span>
                  <button onClick={nextProject} className="p-2 hover:text-gilsu-green transition-colors"><ChevronRight size={24} /></button>
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
                  <div className="absolute inset-0 bg-gilsu-black/60 md:bg-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-gilsu-black via-transparent to-transparent hidden md:block"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gilsu-black via-gilsu-black/20 to-transparent md:hidden"></div>
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
                    className="absolute top-6 right-6 p-3 border border-white/20 rounded-full bg-gilsu-black/40 backdrop-blur-md hover:bg-white hover:text-gilsu-black transition-all z-[70]"
                  >
                    <X size={20} />
                  </motion.button>

                  <div className="max-w-xl mx-auto md:mx-0 w-full py-12 md:py-0">
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-mono text-gilsu-green mb-4 tracking-[0.3em] uppercase text-[10px]"
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

                    {/* Project Links - Shown directly for sites */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="grid grid-cols-1 gap-2">
                        {selectedProject.links?.map((link, idx) => (
                          <a 
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-gilsu-green hover:text-gilsu-black transition-all group"
                          >
                            <span className="font-mono text-xs uppercase tracking-widest">{link.label}</span>
                            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </>
            )}
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
            className="fixed inset-0 z-[100] bg-gilsu-black flex items-center justify-center p-6 md:p-12"
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
                    className="h-full bg-gilsu-green"
                  />
                </div>
                <p className="font-mono text-[10px] mt-4 text-gilsu-green uppercase">STEP 0{formStep + 1} / 0{formQuestions.length}</p>
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
                    className="w-full bg-transparent border-b-2 border-white/20 py-4 text-2xl md:text-4xl focus:border-gilsu-green outline-none transition-colors font-sans"
                  />
                  <div className="mt-12 flex items-center gap-6">
                    <button 
                      onClick={handleFormNext}
                      className="px-8 py-4 bg-gilsu-green text-gilsu-black font-display text-lg rounded-lg hover:scale-105 transition-transform"
                    >
                      {formStep === formQuestions.length - 1 ? t.contact.finish : t.contact.ok}
                    </button>
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{t.contact.pressEnter}</span>
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

        <div className="relative z-10 text-center px-4 w-full">
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] md:text-[15vw] font-display leading-[0.8] tracking-tighter uppercase"
          >
            {t.hero.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em]"
          >
            <span className="text-white/60">{t.hero.subtitle}</span>
            <span className="hidden md:inline text-gilsu-green">•</span>
            <span className="text-white/40">{t.hero.est}</span>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => {
              const showcase = document.getElementById('video-showcase');
              showcase?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-12 group flex flex-col items-center gap-4 mx-auto"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-gilsu-green transition-colors">{t.hero.discover}</span>
            <div className="w-px h-12 bg-gradient-to-b from-gilsu-green to-transparent" />
          </motion.button>
        </div>

        <motion.div 
          style={{ x: textX }}
          className="absolute bottom-8 left-0 whitespace-nowrap text-[8vh] font-display opacity-5 pointer-events-none select-none uppercase"
        >
          {t.hero.marquee}{t.hero.marquee}{t.hero.marquee}
        </motion.div>
      </section>

      {/* About / Intro */}
      <section className="py-20 md:py-32 px-6 md:px-24">
        <div className="max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-5xl font-medium leading-tight"
            dangerouslySetInnerHTML={{ __html: t.about.description }}
          />
        </div>
      </section>

      {/* Cyberpunk Portfolio Section */}
      <section id="projects" className="py-32 px-6 md:px-12 bg-gilsu-black relative overflow-hidden">
        {/* Background Grid/Scanlines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px]"></div>

        <div className="relative z-10 mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-gilsu-green"></div>
                <span className="font-mono text-[10px] text-gilsu-green tracking-[0.3em] md:tracking-[0.5em] uppercase">{t.work.archive}</span>
              </div>
              <h2 className="text-5xl md:text-9xl font-display leading-none tracking-tighter uppercase">
                {t.work.dataStreams}
              </h2>
            </div>

            {/* Category Selector */}
            <div className="flex flex-wrap gap-2 md:gap-4">
              {(['all', 'site', 'video'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-6 py-2 border rounded-full font-mono text-[10px] tracking-widest transition-all duration-300",
                    selectedCategory === cat 
                      ? "bg-gilsu-green border-gilsu-green text-gilsu-black" 
                      : "border-white/20 text-white/60 hover:border-white hover:text-white"
                  )}
                >
                  {t.work.categories[cat]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedCategory === 'video' ? (
            <motion.div 
              key="video-slider"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="relative z-10 flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x px-4 md:px-0 perspective-1000"
            >
              {PROJECTS.filter(p => p.type === 'video').map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, rotateY: 45, x: 100 }}
                  whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, z: 50 }}
                  onClick={() => setSelectedProject(project)}
                  className="min-w-[320px] md:min-w-[700px] aspect-video bg-white/5 rounded-[2rem] overflow-hidden cursor-pointer relative group snap-center border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-gilsu-green/20 transition-all duration-500"
                >
                  <img 
                    src={project.image} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gilsu-black via-gilsu-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-gilsu-green shadow-[0_0_15px_rgba(0,255,65,1)] animate-pulse" />
                      <span className="font-mono text-xs text-gilsu-green tracking-[0.4em] uppercase font-bold">{project.category}</span>
                    </div>
                    <h3 className="text-4xl md:text-7xl font-display leading-none uppercase tracking-tighter">{project.title}</h3>
                    <div className="mt-6 overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                      <p className="font-mono text-sm text-white/60 uppercase tracking-widest">{project.shortDesc}</p>
                    </div>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-24 h-24 rounded-full bg-gilsu-green/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_50px_rgba(0,255,65,0.6)]"
                    >
                      <Plus className="text-gilsu-black w-12 h-12" />
                    </motion.div>
                  </div>

                  {/* Cyberpunk Borders */}
                  <div className="absolute top-0 left-0 w-full h-full border border-white/5 group-hover:border-gilsu-green/30 transition-colors pointer-events-none"></div>
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gilsu-green/0 group-hover:border-gilsu-green transition-all duration-500"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gilsu-green/0 group-hover:border-gilsu-green transition-all duration-500"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : selectedCategory === 'site' ? (
            <motion.div 
              key="site-links"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {PROJECTS.filter(p => p.type === 'site').map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className="group flex items-center justify-between p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-gilsu-green hover:border-gilsu-green transition-all duration-500 cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-gilsu-green group-hover:text-gilsu-black mb-2 tracking-widest uppercase">{project.category}</span>
                    <h3 className="text-2xl md:text-4xl font-display group-hover:text-gilsu-black transition-colors">{project.title}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 group-hover:border-gilsu-black flex items-center justify-center transition-all">
                    <ArrowUpRight className="text-white group-hover:text-gilsu-black transition-all" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10"
            >
              {PROJECTS.filter(p => selectedCategory === 'all' || p.type === selectedCategory).map((project, i) => {
                const projectT = t.projects[PROJECTS.findIndex(p => p.id === project.id)] || project;
                return (
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
                      selectedCategory === 'all' ? project.className : "col-span-2 row-span-1"
                    )}
                  >
                    {/* Glitch Frame */}
                    <div className="absolute -inset-2 border border-gilsu-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gilsu-green"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gilsu-green"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gilsu-green"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gilsu-green"></div>
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
                      <div className="absolute inset-0 bg-gradient-to-t from-gilsu-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                      
                      <div className="absolute top-4 left-4 font-mono text-[10px] text-gilsu-green opacity-0 group-hover:opacity-100 transition-opacity">
                        [ STATUS: ENCRYPTED ]<br/>
                        [ ID: 00{project.id} ]
                      </div>

                      <div className="absolute bottom-6 left-6 right-6">
                        <p className="font-mono text-xs text-gilsu-green mb-1 tracking-widest uppercase">{projectT.category}</p>
                        <h3 className="text-2xl md:text-4xl font-display group-hover:text-gilsu-green transition-colors leading-tight">{projectT.title}</h3>
                        <p className="font-mono text-[10px] text-white/40 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">{projectT.shortDesc}</p>
                      </div>

                      {/* Interactive Scanline */}
                      <motion.div 
                        animate={{ y: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="absolute inset-x-0 h-px bg-gilsu-green/30 pointer-events-none"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Dynamic Interactive Services Section */}
      <section id="services" className="py-32 px-6 md:px-24 bg-gilsu-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gilsu-green/5 blur-[150px] rounded-full pointer-events-none"></div>
        
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
            className="font-mono text-[10px] md:text-sm text-white/40 uppercase tracking-[0.3em]"
          >
            {lang === 'pt' ? 'Toque para ativar serviços' : 
             lang === 'en' ? 'Tap to activate services' :
             lang === 'es' ? 'Toque para activar servicios' :
             'Appuyez pour activer les services'}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-px md:border md:border-white/10">
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} t={t} />
          ))}
        </div>
      </section>

      {/* Marquee Section */}
      <div className="py-8 md:py-12 bg-gilsu-green overflow-hidden border-y border-white/20">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap gap-8 md:gap-12 items-center text-gilsu-black"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-3xl md:text-6xl font-display uppercase tracking-tighter flex items-center gap-8 md:gap-12">
              {t.hero.marquee} <Zap className="fill-current" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* Team Section */}
      <section id="team" className="py-32 px-6 md:px-24 bg-gilsu-black relative">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gilsu-green"></div>
            <span className="font-mono text-xs text-gilsu-green tracking-[0.5em] uppercase">The Brain // Neural Network</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-display leading-none tracking-tighter">
            THE<br/><span className="text-stroke">BRAIN</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TEAM.map((member, i) => {
            const memberT = t.team[i];
            return (
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
                  alt={memberT.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gilsu-black via-gilsu-black/20 to-transparent opacity-80"></div>
                
                <div className="absolute bottom-12 left-12 right-12">
                  <p className="font-mono text-gilsu-green mb-2 tracking-widest uppercase">{memberT.role}</p>
                  <h3 className="text-4xl md:text-6xl font-display mb-4">{memberT.name}</h3>
                  <p className="text-white/60 font-sans max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {memberT.bio}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:border-gilsu-green transition-colors">
                  <Plus className="text-white/20 group-hover:text-gilsu-green transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-24 relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gilsu-green/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gilsu-gold/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-7xl md:text-[12vw] font-display leading-[0.9] mb-12"
          >
            {t.contact.title.split('?')[0]}<br/><span className="text-stroke">{t.contact.title.includes('?') ? '?' : 'A RIOT.'}</span>
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
              className="px-12 py-6 bg-white text-gilsu-black font-display text-xl rounded-full hover:bg-gilsu-green hover:text-white transition-all duration-300 group flex items-center gap-4"
            >
              {t.hero.cta}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <div className="flex gap-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-4 border border-white/20 rounded-full hover:bg-white hover:text-gilsu-black transition-all z-20">
                <Instagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-4 border border-white/20 rounded-full hover:bg-white hover:text-gilsu-black transition-all z-20">
                <Twitter size={24} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-4 border border-white/20 rounded-full hover:bg-white hover:text-gilsu-black transition-all z-20">
                <Github size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-white/40 font-mono text-xs uppercase tracking-widest">
        <div className="flex flex-col gap-4">
          <div>© 2024 GILSU AGENCY. {lang === 'pt' ? 'TODOS OS DIREITOS RESERVADOS.' : lang === 'es' ? 'TODOS LOS DERECHOS RESERVADOS.' : lang === 'fr' ? 'TOUS DROITS RÉSERVÉS.' : 'ALL RIGHTS RESERVED.'}</div>
          <div className="flex gap-4">
            {[Instagram, Twitter, Github].map((Icon, i) => (
              <a key={i} href="#" className="p-2 border border-white/10 rounded-full hover:bg-white hover:text-gilsu-black transition-all">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">{lang === 'pt' ? 'Privacidade' : lang === 'es' ? 'Privacidad' : lang === 'fr' ? 'Confidentialité' : 'Privacy'}</a>
          <a href="#" className="hover:text-white transition-colors">{lang === 'pt' ? 'Termos' : lang === 'es' ? 'Términos' : lang === 'fr' ? 'Conditions' : 'Terms'}</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
        <div className="flex items-center gap-2">
          {lang === 'pt' ? 'FEITO COM' : lang === 'es' ? 'HECHO CON' : lang === 'fr' ? 'FAIT AVEC' : 'MADE WITH'} <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-gilsu-green">❤</motion.span> BY GILSU
        </div>
      </footer>
    </motion.div>
  </div>
);
}
