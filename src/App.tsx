/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Droplets, 
  Building2, 
  HardHat, 
  Waves, 
  ArrowRight, 
  Menu, 
  X, 
  Mail, 
  Phone, 
  MapPin,
  Upload,
  Globe,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sun,
  Cog,
  Users,
  Briefcase,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Image as ImageIcon,
  Loader2,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { areasData } from './data/areas';
import { db, auth } from './lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  deleteDoc, 
  doc, 
  updateDoc, 
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { Project } from './types/Project';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  signOut,
  User
} from 'firebase/auth';

const RenderMainArea = ({ mainArea, className = "" }: { mainArea: string, className?: string }) => {
  if (!mainArea) return null;
  const areas = mainArea.split('/').map(a => a.trim());
  return (
    <div className={`flex items-center flex-wrap gap-x-1 ${className}`}>
      {areas.map((area, i) => (
        <React.Fragment key={i}>
          <span>{area}</span>
          {i < areas.length - 1 && (
            <span className="mx-2 opacity-30 font-light text-current">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// --- Helper Functions ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Components ---

const AnimatedLogo = ({ onClick, imgClassName, className }: { onClick?: () => void, imgClassName?: string, className?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    if (onClick) onClick();
  };
  
  return (
    <div className={`relative group cursor-pointer flex items-center ${className || ''}`} onClick={handleClick}>
      {/* Drafting/Technical background elements with continuous motion */}
      <div className="absolute -inset-x-16 -inset-y-8 pointer-events-none overflow-hidden">
        <motion.svg
          width="160%"
          height="160%"
          viewBox="0 0 320 140"
          className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileTap="tap"
        >
          {/* Subtle Dotted Grid Background */}
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-accent/10" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Burst Dotted Circles (Only appear on tap) */}
          <motion.circle
            cx="160" cy="70" r="0"
            stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" fill="none"
            className="text-accent"
            variants={{
              tap: { 
                r: [0, 150], 
                opacity: [1, 0],
                transition: { duration: 0.5, ease: "easeOut" }
              }
            }}
          />
          <motion.circle
            cx="160" cy="70" r="0"
            stroke="currentColor" strokeWidth="1" strokeDasharray="1 3" fill="none"
            className="text-accent/40"
            variants={{
              tap: { 
                r: [0, 200], 
                opacity: [0.8, 0],
                transition: { duration: 0.6, delay: 0.1, ease: "easeOut" }
              }
            }}
          />

          {/* Moving Vertical Grid Lines */}
          <motion.g
            animate={{ x: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            {[10, 30, 50, 70, 230, 250, 270, 290, 310].map((x, i) => (
              <line 
                key={i} 
                x1={x} y1="0" x2={x} y2="140" 
                stroke="currentColor" 
                strokeWidth="0.3" 
                className="text-accent/15" 
              />
            ))}
          </motion.g>
          
          {/* Dotted Horizontal Lines (Measurement Style) */}
          <motion.line
            x1="0" y1="35" x2="320" y2="35"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 4"
            className="text-accent/20"
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            variants={{
              tap: { strokeWidth: 1.5, opacity: 1, scaleY: 2 }
            }}
          />
          <motion.line
            x1="0" y1="105" x2="320" y2="105"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 4"
            className="text-accent/20"
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
            variants={{
              tap: { strokeWidth: 1.5, opacity: 1, scaleY: 2 }
            }}
          />

          {/* Principal Horizontal 'Fillete' with pulse and tick marks */}
          <motion.g
            initial={{ pathLength: 0 }}
            whileHover={{ 
              opacity: [0.4, 0.7, 0.4],
              transition: { opacity: { repeat: Infinity, duration: 2.5 } } 
            }}
            variants={{
              tap: { scale: 1.05, opacity: 1 }
            }}
          >
            <line x1="10" y1="70" x2="310" y2="70" stroke="currentColor" strokeWidth="0.8" className="text-accent/30" />
            {/* Tick marks along the line */}
            {[40, 80, 120, 160, 200, 240, 280].map((t, i) => (
              <line key={i} x1={t} y1="67" x2={t} y2="73" stroke="currentColor" strokeWidth="1" className="text-accent/50" />
            ))}
          </motion.g>

          {/* Technical Crosshairs (Reactive on tap) */}
          <motion.g
            animate={{ 
              rotate: [0, 90, 180, 270, 360],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ rotate: { repeat: Infinity, duration: 20, ease: "linear" }, opacity: { repeat: Infinity, duration: 2 } }}
            className="text-accent/40"
            variants={{
              tap: { scale: 2, opacity: 0.8, rotate: 720, transition: { duration: 0.5 } }
            }}
          >
            <circle cx="280" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
            <line x1="272" y1="30" x2="288" y2="30" stroke="currentColor" strokeWidth="0.5" />
            <line x1="280" y1="22" x2="280" y2="38" stroke="currentColor" strokeWidth="0.5" />
          </motion.g>

          {/* Scrolling Coordinate Data */}
          <motion.text
            x="15" y="15"
            fontSize="3.5"
            className="font-mono fill-accent/50 uppercase tracking-[0.2em]"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            variants={{
              tap: { scale: 1.2, fill: "#e11d48", transition: { duration: 0.2 } }
            }}
          >
            LN_AXIS_772 // READY
          </motion.text>
          
          <motion.text
            x="15" y="130"
            fontSize="3.5"
            className="font-mono fill-accent/50 uppercase tracking-[0.2em] opacity-0"
            variants={{
              tap: { opacity: 1, x: 20, transition: { duration: 0.2 } }
            }}
          >
            EXECUTING_RESET...
          </motion.text>

          {/* Corner Framing with thicker 'filletes' */}
          <motion.g
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            variants={{
              tap: { scale: 1.4, x: -10, y: -10, transition: { duration: 0.3 } }
            }}
          >
            <path d="M 15 30 L 15 15 L 30 15" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent/70" />
            <path d="M 290 125 L 305 125 L 305 110" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent/70" />
          </motion.g>

          {/* Vertical Technical Ruler */}
          <motion.g
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {[20, 40, 60, 80, 100, 120].map((y, i) => (
              <line 
                key={i} 
                x1="295" y1={y} x2="300" y2={y} 
                stroke="currentColor" 
                strokeWidth="0.5" 
                className="text-accent/30" 
              />
            ))}
          </motion.g>

          {/* High-speed scanning line (Spins fast on tap) */}
          <motion.rect
            x="0" y="0" width="0.5" height="140"
            className="fill-accent/40 shadow-[0_0_8px_rgba(var(--accent),0.5)]"
            animate={{ x: [10, 310, 10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "circIn" }}
            variants={{
              tap: { width: 5, opacity: 1, x: [10, 310], transition: { duration: 0.2 } }
            }}
          />
        </motion.svg>
      </div>

      {/* The Actual Logo - Solid and Professional */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative z-10"
      >
        <img 
          src="https://akhydra.com.ar/wp-content/uploads/2025/11/logo-akhydra-vect.svg" 
          alt="AKHYDRA Logo" 
          className={`h-12 md:h-14 w-auto drop-shadow-md transition-all duration-300 ${imgClassName || ''}`}
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      {/* Interactive Detail Highlight */}
      <motion.div 
        className="absolute -bottom-3 left-0 w-0 h-1.5 bg-accent/40"
        initial={{ width: 0 }}
        whileHover={{ width: '100%', transition: { duration: 0.5, ease: "circOut" } }}
      />
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-white/95 backdrop-blur-md border-b border-primary/10 py-4 shadow-md' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <AnimatedLogo />
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <a href={isHome ? "#nosotros" : "/#nosotros"} className="hover:text-accent transition-colors">Nosotros</a>
          
          {/* Areas Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setAreasOpen(true)}
            onMouseLeave={() => setAreasOpen(false)}
          >
            <button className={`flex items-center gap-1 hover:text-accent transition-colors ${areasOpen || location.pathname.startsWith('/area/') ? 'text-accent' : ''}`}>
              Áreas <ChevronDown size={14} className={`transition-transform duration-300 ${areasOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {areasOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full -left-1/2 mt-4 w-[450px] bg-white rounded-xl shadow-2xl border border-primary/5 p-6 grid grid-cols-2 gap-x-8 gap-y-2"
                >
                  {areasData.map((area) => (
                    <Link 
                      key={area.id} 
                      to={`/area/${area.id}`} 
                      className="text-primary/70 hover:text-accent hover:translate-x-1 transition-all py-1.5 text-xs font-semibold uppercase tracking-wider block border-b border-transparent hover:border-accent/10"
                      onClick={() => setAreasOpen(false)}
                    >
                      {area.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href={isHome ? "#proyectos" : "/#proyectos"} className="hover:text-accent transition-colors">Proyectos</a>
          <a href={isHome ? "#contacto" : "/#contacto"} className="hover:text-accent transition-colors">
            <Button variant="default" className="bg-accent hover:bg-accent/90 text-white font-bold">Contacto</Button>
          </a>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-white z-[60] p-6 flex flex-col overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <AnimatedLogo onClick={() => setMobileMenuOpen(false)} />
              <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            
            <div className="flex flex-col gap-6 font-display font-bold">
              <Link to="/" className="text-2xl" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <a href={isHome ? "#nosotros" : "/#nosotros"} className="text-2xl" onClick={() => setMobileMenuOpen(false)}>Nosotros</a>
              
              <div className="flex flex-col gap-4">
                <button 
                  className="text-2xl flex items-center justify-between"
                  onClick={() => setAreasOpen(!areasOpen)}
                >
                  Áreas <ChevronDown className={`transition-transform ${areasOpen ? 'rotate-180' : ''}`} />
                </button>
                {areasOpen && (
                  <div className="grid grid-cols-1 gap-2 pl-4 border-l-2 border-accent/20">
                    {areasData.map((area) => (
                      <Link key={area.id} to={`/area/${area.id}`} className="text-lg font-normal text-primary/60 hover:text-accent" onClick={() => setMobileMenuOpen(false)}>{area.name}</Link>
                    ))}
                  </div>
                )}
              </div>

              <a href={isHome ? "#proyectos" : "/#proyectos"} className="text-2xl" onClick={() => setMobileMenuOpen(false)}>Proyectos</a>
              <a href={isHome ? "#contacto" : "/#contacto"} onClick={() => setMobileMenuOpen(false)} className="mt-4">
                <Button size="lg" className="w-full bg-accent text-white font-bold">Contacto</Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: <>Ingeniería <br /> que <span className="text-accent italic">Fluye</span>.</>,
      subtitle: "Soluciones hídricas e infraestructura con visión de futuro.",
      description: "Desde 2020, transformando desafíos complejos en realidades resilientes mediante un enfoque interdisciplinario.",
      icon: <Droplets className="w-full h-full text-white" strokeWidth={1} />,
      color: "bg-[#1C75BC]", // Celeste from logo
      accentColor: "bg-[#2b388f]", // Dark blue
      decoration: "M 0 50 Q 50 0 100 50 T 200 50",
      markers: (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.g 
              key={i}
              initial={{ rotate: i * 60 }}
              animate={{ rotate: i * 120 + 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{ originX: 0, originY: 0 }}
            >
              {/* Outer floating bits - Larger orbit and more visible */}
              <rect x="-4" y="-220" width="8" height="8" className="fill-accent/30" transform="rotate(45 0 -216)" />
              <line x1="0" y1="-240" x2="0" y2="-210" className="stroke-accent/20" strokeWidth="1" />
            </motion.g>
          ))}
        </>
      )
    },
    {
      title: <>Innovación <br /> <span className="text-accent italic">Sustentable</span>.</>,
      subtitle: "Comprometidos con proyectos que respetan el medio ambiente.",
      description: "Desarrollamos ingeniería de vanguardia minimizando el impacto ambiental y optimizando recursos naturales.",
      icon: <Sun className="w-full h-full text-white" strokeWidth={1} />,
      color: "bg-accent", // Orange from logo
      accentColor: "bg-[#1C75BC]", // Celeste
      decoration: "M 10 10 L 90 10 L 90 90 L 10 10",
      markers: (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.g 
              key={i}
              initial={{ rotate: i * 72 }}
              animate={{ rotate: i * 72 - 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              style={{ originX: 0, originY: 0 }}
            >
              <rect x="-8" y="-200" width="16" height="16" className="fill-white/15" transform="rotate(45 0 -192)" />
              <circle cx="0" cy="-170" r="3" className="fill-accent/30" />
            </motion.g>
          ))}
        </>
      )
    },
    {
      title: <>Precisión <br /> <span className="text-accent italic">Técnica</span>.</>,
      subtitle: "Rigurosidad y excelencia en cada detalle de nuestros diseños.",
      description: "Nuestro equipo combina experiencia y tecnología para garantizar la máxima eficiencia en cada obra.",
      icon: <Cog className="w-full h-full text-white" strokeWidth={1} />,
      color: "bg-[#2b388f]", // Dark blue from logo
      accentColor: "bg-accent", // Orange
      decoration: "M 0 0 L 100 100 M 100 0 L 0 100",
      markers: (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.g 
              key={i}
              initial={{ rotate: i * 30 }}
              animate={{ rotate: i * 30 + 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              style={{ originX: 0, originY: 0 }}
            >
              <rect x="-2" y="-230" width="4" height="4" className="fill-accent/40" />
              <motion.rect 
                x="-1" y="-250" width="2" height="20" 
                className="fill-accent/15"
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
              />
            </motion.g>
          ))}
        </>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.15, 0.05]);
  const bgBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);
  const rotateLarge = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section ref={targetRef} id="home" className="relative h-[150vh] bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Background Image with Scroll Effects */}
        <motion.div 
          style={{ 
            backgroundImage: 'url("https://img.freepik.com/foto-gratis/imagen-objetos-ingenieria-punto-vista-top-construction-trabajo-herramientas-ingenieria-vintage-efecto-filtro-retro-tono-enfoque-suave-enfoque-selectivo_1418-704.jpg")',
            scale: bgScale, 
            opacity: bgOpacity,
            filter: bgBlur
          }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          referrerPolicy="no-referrer"
        />

        {/* Subtle Overlay Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#2b388f 1px, transparent 1px), linear-gradient(90deg, #2b388f 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        
        {/* Decorative Technical Element (Rotating Background) */}
        <motion.div 
          style={{ rotate: rotateLarge }}
          className="absolute -right-1/4 -bottom-1/4 w-[1200px] h-[1200px] border border-primary/[0.03] rounded-full pointer-events-none z-0"
        >
          <div className="w-full h-full relative">
            {[...Array(72)].map((_, i) => (
              <div 
                key={i} 
                className="absolute top-0 left-1/2 -translate-x-1/2 h-full py-2"
                style={{ transform: `translateX(-50%) rotate(${i * 5}deg)` }}
              >
                <div className="w-[1px] h-4 bg-primary/[0.1]" />
              </div>
            ))}
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[500px]">
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="h-[1px] bg-accent" 
                    />
                    <span className="text-xs font-mono tracking-[0.3em] uppercase text-accent font-bold">AKHYDRA // EXCELENCIA TÉCNICA</span>
                  </div>
                  
                  {/* Headline with Sweep Reveal and Floating Line */}
                  <div className="relative mb-8">
                    {/* Animated "Technical Line" */}
                    <motion.svg 
                      viewBox="0 0 200 100" 
                      className="absolute -top-10 -left-10 w-40 h-40 pointer-events-none opacity-20"
                    >
                      <motion.path
                        d={slides[currentSlide].decoration}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeDasharray="4 2"
                        className="text-accent"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                      />
                    </motion.svg>

                    <motion.h1 
                      initial={{ clipPath: 'inset(0 100% 0 0)' }}
                      animate={{ clipPath: 'inset(0 0 0 0)' }}
                      transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                      className="text-6xl md:text-8xl font-display font-bold leading-[0.85] text-primary tracking-tighter"
                    >
                      {slides[currentSlide].title}
                    </motion.h1>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="relative text-lg text-primary/60 mb-10 leading-relaxed max-w-2xl border-l-2 border-accent/20 pl-6"
                  >
                    {/* Moving technical points */}
                    <motion.div 
                      animate={{ y: [0, 20, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-accent"
                    />

                    <p className="mb-4 font-bold text-primary/80 text-xl">
                      {slides[currentSlide].subtitle}
                    </p>
                    <p className="text-sm text-primary/50">
                      {slides[currentSlide].description}
                    </p>
                  </motion.div>
                  
                  <div className="flex flex-wrap gap-6">
                    <Link to="/portfolio">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 h-16 px-10 text-lg text-white font-bold rounded-full transition-all hover:scale-105">
                        Explorar Proyectos <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </Link>
                    <a href="#nosotros" className="group flex items-center gap-3 text-primary font-bold hover:text-accent transition-colors">
                      <div className="w-12 h-12 rounded-full border-2 border-primary/10 flex items-center justify-center group-hover:border-accent transition-colors group-hover:rotate-12 duration-500">
                        <Waves size={20} />
                      </div>
                      <span>Nuestra Visión</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Branded Illustrative Element Side */}
            <div className="hidden lg:block lg:col-span-5 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="w-full aspect-square flex items-center justify-center relative"
                >
                  {/* The Branded Orb / Isologo placeholder */}
                  <div className="relative w-80 h-80 flex items-center justify-center">
                    {/* Rotating Technical Markers (Moved to background) */}
                    <svg 
                      viewBox="-250 -250 500 500"
                      className="absolute inset-[-100px] w-[calc(100%+200px)] h-[calc(100%+200px)] pointer-events-none overflow-visible z-0"
                    >
                       {slides[currentSlide].markers}
                    </svg>

                    {/* Large Colored background circle (Isologo concept) */}
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.9 }}
                      exit={{ scale: 1.1, opacity: 0 }}
                      className={`absolute inset-0 ${slides[currentSlide].color} shadow-[0_0_80px_rgba(43,56,143,0.15)] rounded-full z-10`}
                    />

                    {/* Secondary accent circle with pulsing effect */}
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.15, 1],
                        x: [0, 10, 0],
                        y: [0, -10, 0]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      className={`absolute -top-6 -right-6 w-36 h-36 ${slides[currentSlide].accentColor} rounded-full opacity-30 blur-3xl z-10`}
                    />

                    {/* Technical rings */}
                    <div className="absolute inset-[-40px] border border-primary/[0.05] rounded-full animate-[spin_40s_linear_infinite] z-10" />
                    <div className="absolute inset-[-20px] border border-dashed border-accent/20 rounded-full animate-[spin_25s_linear_infinite_reverse] z-10" />
                    
                    {/* Icon Container */}
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="w-32 h-32 relative z-20 flex items-center justify-center filter drop-shadow-xl"
                    >
                      {slides[currentSlide].icon}
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-primary/40 font-bold">Scroll</span>
          <div className="w-8 h-12 rounded-full border-2 border-primary/10 flex justify-center p-2">
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const [selectedMember, setSelectedMember] = useState<null | { name: string, role: string, image: string, cv: string }>(null);

  const team = [
    {
      name: "Álvarez Diego Raul",
      role: "Ing. Hidráulico / Socio Gerente",
      image: "https://akhydra.com.ar/wp-content/uploads/2021/05/diego.png",
      cv: "Profesional con amplia trayectoria en la gestión de recursos hídricos. Especialista en diseño de infraestructuras complejas y coordinación de equipos interdisciplinarios. Ha liderado más de 50 proyectos de saneamiento y plantas potabilizadoras en la región."
    },
    {
      name: "Korell Juan Pablo",
      role: "Ing. Hidráulico / Socio Gerente",
      image: "https://akhydra.com.ar/wp-content/uploads/2021/05/juan.png",
      cv: "Ingeniero Hidráulico especializado en modelación numérica y diseño de drenajes urbanos. Co-fundador de AKHYDRA, con foco en la implementación de soluciones tecnológicas para el aprovechamiento eficiente de recursos naturales e infraestructura resiliente."
    }
  ];

  return (
    <section id="nosotros" className="py-24 bg-surface/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column: Intro Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <Badge className="mb-4 bg-accent/10 text-accent border-none font-bold uppercase tracking-widest px-4 py-1">Área Directiva</Badge>
            <h2 className="text-4xl md:text-5xl mb-8 text-primary font-display font-bold tracking-tight leading-tight">
              Liderazgo con <span className="text-accent italic">Compromiso Técnico</span>
            </h2>
            <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
              <p>
                El equipo directivo de <span className="font-bold text-primary">AKHYDRA INGENIERÍA</span> está conformado por los <span className="text-accent font-bold">Ing. Alvarez, Diego R.</span> e <span className="text-accent font-bold">Ing. Korell, Juan P.</span>, socios y amigos, formados en el campo de la hidráulica y con una amplia y variada experiencia profesional.
              </p>
              <p>
                Ellos son quienes gestionan las ideas, los recursos y las personas para que cada proyecto sea único, cumpliendo con los estándares de trabajo y expectativas que cada cliente espera.
              </p>
            </div>
            
            {/* Prominent Call to Action for Staff */}
            <div className="mt-10 pt-10 border-t border-primary/5 flex flex-col items-start">
              <Link to="/staff">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-primary text-white font-bold rounded-xl py-4 px-7 transition-all shadow-lg shadow-primary/10 hover:shadow-accent/30 hover:bg-accent flex items-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <div className="relative flex items-center gap-3">
                    <div className="bg-white/10 p-2.5 rounded-lg group-hover:bg-white/20 transition-colors">
                      <motion.div
                        animate={{ 
                          y: [0, -2, 0],
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Users size={22} className="text-white" />
                      </motion.div>
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-widest text-white/50 mb-0.5 font-mono">Integrantes</div>
                      <div className="text-lg font-display tracking-tight leading-tight">Staff Completo</div>
                    </div>
                    <ArrowRight size={18} className="ml-2 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.button>
              </Link>
            </div>
          </motion.div>
          
          {/* Right Column: Founders */}
          <div className="space-y-12 lg:space-y-16">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                onClick={() => setSelectedMember(member)}
                className="flex items-center gap-6 md:gap-10 group cursor-pointer"
              >
                <div className="relative shrink-0">
                  <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white z-10 relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-0 border-2 border-dashed border-accent/30 rounded-full scale-110 group-hover:rotate-45 transition-transform duration-1000" />
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-accent font-bold tracking-[0.2em] mb-1">SOCIO GERENTE</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary leading-tight uppercase tracking-tight">{member.name.split(' ').map((word, idx) => idx === 0 ? <React.Fragment key={idx}>{word} <br /></React.Fragment> : <React.Fragment key={idx}>{word} </React.Fragment>)}</h3>
                  <div className="flex items-center gap-2 text-primary/50 font-bold italic text-sm md:text-base border-l-2 border-accent/20 pl-3">
                    Ing. Hidráulico
                    <ArrowRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CV PopUp Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-md"
            />
            <motion.div
              layoutId={`member-${selectedMember.name}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
            >
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface border border-primary/5 flex items-center justify-center text-primary group hover:bg-accent hover:text-white transition-all z-20"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-5 gap-0 h-full">
                <div className="md:col-span-2 bg-surface p-8 flex flex-col items-center justify-center text-center border-r border-primary/5">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white mb-6">
                    <img 
                      src={selectedMember.image} 
                      alt={selectedMember.name} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-2 leading-tight">{selectedMember.name}</h4>
                  <Badge variant="outline" className="border-accent/30 text-accent font-bold uppercase text-[10px] tracking-widest">{selectedMember.role.split(' / ')[1]}</Badge>
                </div>
                <div className="md:col-span-3 p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-[1px] w-8 bg-accent" />
                    <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest">Currículum Vitae</span>
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-6">Trayectoria Profesional</h3>
                  <div className="space-y-4 text-primary/70 leading-relaxed">
                    <p>{selectedMember.cv}</p>
                    <p className="text-sm italic">
                      Ha participado activamente en la consolidación de <span className="font-bold">AKHYDRA</span> como referente en soluciones de ingeniería hídrica en Argentina.
                    </p>
                  </div>
                  
                  <div className="mt-10 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-surface border border-primary/5">
                      <div className="text-[10px] font-mono text-primary/40 uppercase font-bold mb-1">Especialidad</div>
                      <div className="text-sm font-bold text-primary leading-tight">Hidráulica Avanzada</div>
                    </div>
                    <div className="p-4 rounded-xl bg-surface border border-primary/5">
                      <div className="text-[10px] font-mono text-primary/40 uppercase font-bold mb-1">Experiencia</div>
                      <div className="text-sm font-bold text-primary leading-tight">+15 Años en Sector</div>
                    </div>
                  </div>

                  <Button className="mt-8 bg-primary hover:bg-accent text-white font-bold h-12 rounded-xl group transition-all">
                    Consultar Perfil Completo
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Staff = () => {
  const categories = [
    {
      title: "STAFF / ASESORES",
      description: "Profesionales especializados en ingeniería, arquitectura y ciencias ambientales.",
      members: [
        { name: "Balduzzi Sofía", role: "Arquitecta", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Sofia_balduzzi.png" },
        { name: "Bazán Agustina", role: "Ing. Civil/Hidráulica", location: "Córdoba, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/agustina_bazan.png" },
        { name: "Bellomo Marina", role: "Contadora", location: "Olavarría, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Marina_BELLOMO.png" },
        { name: "Blasetti Renata", role: "Ing. Civil/Hidráulica", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2022/04/blasetti.png" },
        { name: "Cabrera Nahuel", role: "Arquitecto", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/11/Nahuel_Cabrera.png" },
        { name: "Camacho Richard", role: "Jefe de Proyectos", location: "Cochabamba, Bolivia", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Richard_CAMACHO.png" },
        { name: "Carbonetti J. Carlos", role: "Gerente Comercial", location: "Saladillo, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Juan_C_CARBONETTI.png" },
        { name: "Ciancio Magdalena", role: "Bióloga", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2025/06/magadalena_ciancio.png" },
        { name: "Decicilia Lucas", role: "Ing. Mecánico", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Lucas_DECICILIA.png" },
        { name: "Defelipe Guillermo", role: "Ing. Vías de Comunicación", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Guillermo_DEFELIPE.png" },
        { name: "Dionisio Delfina", role: "Arquitectura", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Delfina_DIONISIO.png" },
        { name: "Edwin Florencia Paula", role: "Recursos Naturales y Medio Ambiente", location: "Mendoza, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2024/09/f_edwin.png" },
        { name: "Escobar Loreine", role: "Ing. Ambiental y Sanitaria", location: "Santa Marta, Colombia", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Loreine_ESCOBAR.png" },
        { name: "Fernández Suyai", role: "Ing. Civil", location: "Neuquén, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Suyai_FERNANDEZ.png" },
        { name: "Gardella Martina", role: "Arquitecta", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Martina_GARDELLA.png" },
        { name: "Giustozzi Santiago", role: "Arquitectura / Gestión Ambiental", location: "Exaltación de la Cruz, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2023/10/Santiago_Giustozzi.png" },
        { name: "Guillen Amparo", role: "Ingeniera Civil", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2022/01/guillen_amparo.png" },
        { name: "Jurado Nayla", role: "Arquitecta", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Nayla_JURADO.png" },
        { name: "Lalli Lisandro", role: "Ing. Civil", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2022/06/lisandro_lali.png" },
        { name: "Larocca Gustavo", role: "Ing. Mecánico", location: "Barcelona, España", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Gustavo_LAROCCA_1.png" },
        { name: "López Jimena", role: "Lic. en Geología", location: "Florencio Varela, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Jimena_LOPEZ.png" },
        { name: "Machado Paula", role: "Ing. Construcciones", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/PaulaMACHADO.png" },
        { name: "Masson R. Julian", role: "Ing. Hidráulico", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2022/09/Julian_Masson_RODRIGUEZ.png" },
        { name: "Molina Soledad", role: "Arquitecta", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Soledad_MOLINA.png" },
        { name: "Neme Martín", role: "Ing. Hidráulico", location: "Chivilcoy, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/MartinNEME.png" },
        { name: "Panigatti Delfina", role: "Ing. Hidráulica", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/11/Delfina_Panigatti.png" },
        { name: "Pérez Miguel", role: "Ingeniero Civil", location: "Córdoba, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/miguel-perez.png" },
        { name: "Posse Fernando", role: "Proyecto y Construcción", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Fernando_POSSE.png" },
        { name: "Pugliese Irina", role: "Lic. en Geología", location: "Nayarit, México", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Irina_PUGLIESE.png" },
        { name: "Stoeff Belkenoff, Ian", role: "Ing. Electromecánico", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2022/05/ian.png" },
        { name: "Szychowski Selva", role: "Arquitecta", location: "San José, Costa Rica", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Selva_SZYCHOWSKI.png" },
        { name: "Terpolilli Diego", role: "Agrimensor", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Diego_TERPOLILLI.png" },
        { name: "Terré María Florencia", role: "Ingeniero Civil", location: "Córdoba, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2024/10/terre.png" },
        { name: "Tiseira Lucas", role: "Ingeniero Civil", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2022/06/lucas_tiseira.png" },
        { name: "Tkaczyk Carolina", role: "Ingeniera Ambiental", location: "Córdoba, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2022/01/tkaczyk_carolina.png" },
        { name: "Tornari Maximiliano", role: "Ing. Construcciones/Civil", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Maximiliani_TORNARI.png" },
        { name: "Villani J. Ignacio", role: "Ing. Industrial", location: "La Plata, Argentina", image: "https://akhydra.com.ar/wp-content/uploads/2021/06/Ignacio_VILLANI.png" }
      ]
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <section id="staff" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-primary/5 pb-12">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-accent/10 text-accent border-none font-bold">Talento Interdisciplinario</Badge>
            <h2 className="text-4xl md:text-5xl mb-6 text-primary">Nuestro <span className="text-accent italic">Equipo de Trabajo</span></h2>
            <p className="text-primary/70 text-lg leading-relaxed">
              En AKHYDRA, creemos que la sinergia de diferentes áreas de conocimiento es fundamental para la excelencia técnica. Contamos con un staff altamente comprometido en diversas regiones del mundo.
            </p>
          </div>
        </div>

        {/* Featured: Area Administrativa */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-12 items-center bg-surface/30 p-8 md:p-12 rounded-[40px] border border-primary/5 shadow-inner"
          >
            <div className="md:col-span-1 flex flex-col items-center text-center">
              <div className="w-48 h-48 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-white mb-6 relative group">
                <img 
                  src="https://akhydra.com.ar/wp-content/uploads/2025/06/magadalena_ciancio.png" 
                  alt="Ciancio Magdalena" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-2xl font-bold text-primary mb-1">Ciancio Magdalena</h4>
              <Badge className="bg-accent text-white border-none font-bold px-4 py-1">Encargada</Badge>
              <div className="flex items-center gap-2 mt-4 text-primary/40 font-mono text-[10px] font-bold uppercase tracking-widest">
                <MapPin size={12} className="text-accent" />
                La Plata, Argentina
              </div>
            </div>
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-primary flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20">
                    <Briefcase size={20} />
                  </div>
                  ÁREA ADMINISTRATIVA
                </h3>
                <div className="w-20 h-1 bg-accent rounded-full" />
              </div>
              <p className="text-primary/70 text-lg leading-relaxed font-medium">
                Este sector está liderado por Magdalena, bióloga egresada de la UNLP, quien se encarga de coordinar las áreas de administración, comunicación interna y externa, y gestiona la interacción de los recursos humanos dentro de la consultora. 
              </p>
              <p className="text-primary/70 text-lg leading-relaxed">
                Su labor es fundamental para garantizar el funcionamiento integral de <span className="text-primary font-bold">AKHYDRA</span>, promoviendo la articulación eficiente entre los distintos equipos y asegurando una dinámica de trabajo fluida y cohesionada.
              </p>
              <div className="pt-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/50 border border-primary/5 flex items-center gap-3">
                  <CheckCircle2 className="text-accent shrink-0" size={20} />
                  <span className="text-sm font-bold text-primary/70">Coordinación de RRHH</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/50 border border-primary/5 flex items-center gap-3">
                  <CheckCircle2 className="text-accent shrink-0" size={20} />
                  <span className="text-sm font-bold text-primary/70">Comunicación Institucional</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-24">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-12">
              <div className="space-y-2 border-l-4 border-accent pl-6">
                <h3 className="text-3xl font-bold text-primary flex items-center gap-3">
                  {cat.title}
                </h3>
                <p className="text-primary/50 text-base">{cat.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {cat.members.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 8) * 0.05 }}
                    className="p-5 rounded-3xl bg-surface/50 border border-primary/5 hover:border-accent/30 hover:bg-white hover:shadow-xl transition-all group relative"
                  >
                    <div className="flex items-center gap-5 mb-4">
                      <div className="w-16 h-16 shrink-0 rounded-full bg-white border-2 border-primary/10 flex items-center justify-center overflow-hidden group-hover:border-accent transition-all shadow-md group-hover:scale-105 duration-500">
                        {m.image ? (
                          <img 
                            src={m.image} 
                            alt={m.name} 
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="text-primary/40 text-sm font-mono font-bold group-hover:text-accent transition-colors">
                            {getInitials(m.name)}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-primary text-base group-hover:text-accent transition-colors leading-tight truncate">{m.name}</h4>
                        <div className="flex items-center gap-1.5 mt-1 text-accent font-bold">
                          {idx === 0 ? <Briefcase size={12} /> : <HardHat size={12} />}
                          <span className="text-[11px] uppercase tracking-wider truncate">{m.role}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-primary/5 flex items-center gap-2 text-primary/40">
                      <MapPin size={12} className="shrink-0" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-tight truncate">{m.location}</span>
                    </div>

                    {/* Decorative element (Technical coordinates) */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="text-[8px] font-mono text-accent/30 text-right leading-none">
                        LAT: {Math.floor(Math.random() * 90)}°<br />
                        LON: {Math.floor(Math.random() * 180)}°
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Sub-components for Services Animations (Enhanced & Robust) ---

const HydraulicAnimation = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 0.4, transition: { duration: 0.5 } }
  };

  const waveVariants = {
    initial: { y: "100%" },
    hover: { y: "70%", transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
    >
      <motion.div 
        variants={waveVariants}
        className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-accent/25 to-accent/10 backdrop-blur-[1px]"
      >
        <div className="absolute top-0 left-0 w-[200%] h-12 -translate-y-full overflow-hidden">
          <motion.svg viewBox="0 0 100 20" className="w-full h-full text-accent/30 fill-current" preserveAspectRatio="none">
            <motion.path 
              d="M 0 10 Q 12.5 0 25 10 T 50 10 T 75 10 T 100 10 V 20 H 0 Z" 
              animate={{ x: ["0%", "-50%"] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }} 
            />
            <motion.path 
              d="M 0 12 Q 12.5 2 25 12 T 50 12 T 75 12 T 100 12 V 20 H 0 Z" 
              animate={{ x: ["-50%", "0%"] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
              className="opacity-40" 
            />
          </motion.svg>
        </div>
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute bottom-4 w-2 h-2 bg-accent/40 rounded-full" 
            animate={{ y: [0, -160], opacity: [0, 0.8, 0], x: [0, (i-2)*15] }} 
            transition={{ duration: 2.5 + i*0.5, repeat: Infinity, delay: i*0.3 }} 
            style={{ left: `${20 + i*15}%` }} 
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

const UrbanAnimation = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 0.4, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    initial: { pathLength: 0, opacity: 0 },
    hover: (i: number) => ({
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1, delay: i * 0.2, ease: "easeInOut" }
    })
  };

  return (
    <motion.div 
      variants={containerVariants}
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl bg-primary/[0.04]"
    >
      <motion.svg 
        viewBox="0 0 240 120" 
        className="w-full h-full text-accent/50"
        variants={{
          hover: { y: [35, 30], transition: { repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "mirror" } }
        }}
        initial={{ y: 40 }}
      >
        {/* Pylon Left */}
        <motion.path d="M 40 100 L 50 40 L 60 100" stroke="currentColor" strokeWidth="3" fill="none" custom={0} variants={itemVariants} />
        {/* Pylon Right */}
        <motion.path d="M 180 100 L 190 40 L 200 100" stroke="currentColor" strokeWidth="3" fill="none" custom={1} variants={itemVariants} />
        {/* Main Deck */}
        <motion.path d="M 10 85 L 230 85" stroke="currentColor" strokeWidth="2.5" fill="none" custom={2} variants={itemVariants} />
        {/* Suspension Cables */}
        <motion.path d="M 50 40 Q 120 -5 190 40" stroke="currentColor" strokeWidth="1.2" fill="none" custom={3} variants={itemVariants} strokeDasharray="4 2" />
        <motion.path d="M 50 40 L 10 85" stroke="currentColor" strokeWidth="0.8" fill="none" custom={4} variants={itemVariants} />
        <motion.path d="M 190 40 L 230 85" stroke="currentColor" strokeWidth="0.8" fill="none" custom={4} variants={itemVariants} />
        
        {/* Continuous traffic line */}
        <motion.rect
          width="30" height="3" className="fill-accent/80"
          initial={{ x: -40, y: 83.5, opacity: 0 }}
          variants={{
            hover: { opacity: [0, 1, 1, 0], x: [-40, 240], transition: { delay: 1.5, duration: 3, repeat: Infinity, ease: "linear" } }
          }}
        />
        <motion.text 
          x="120" y="25" textAnchor="middle"
          className="fill-accent font-mono text-[7px] font-black opacity-0" 
          variants={{ hover: { opacity: 1, transition: { delay: 2 } } }}
        >
          INFRA_GRID: ONLINE
        </motion.text>
      </motion.svg>
    </motion.div>
  );
};

const TechnicalAnimation = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 0.4, transition: { duration: 0.5 } }
  };

  const lineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    hover: (i: number) => ({
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1.2, delay: i * 0.25, ease: "easeInOut" }
    })
  };

  return (
    <motion.div 
      variants={containerVariants}
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl bg-white/60"
    >
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'linear-gradient(currentColor 1.5px, transparent 1.5px), linear-gradient(90deg, currentColor 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }} />
      <motion.svg 
        viewBox="0 0 200 200" 
        className="w-full h-full text-accent/40"
        variants={{
          hover: { rotate: [0, 1.5, 0], scale: [1, 1.03, 1], transition: { repeat: Infinity, duration: 8, ease: "easeInOut" } }
        }}
      >
        {/* Frame */}
        <motion.path d="M 30 30 H 170 V 170 H 30 Z" stroke="currentColor" strokeWidth="2" fill="none" custom={0} variants={lineVariants} />
        {/* Internal Walls */}
        <motion.path d="M 30 70 H 170" stroke="currentColor" strokeWidth="1.5" fill="none" custom={1} variants={lineVariants} />
        <motion.path d="M 100 70 V 170" stroke="currentColor" strokeWidth="1.5" fill="none" custom={2} variants={lineVariants} />
        {/* Callout circle */}
        <motion.circle cx="130" cy="120" r="18" stroke="currentColor" strokeWidth="1.5" fill="none" custom={3} variants={lineVariants} strokeDasharray="4 2" />
        
        {/* Continuous scanning beam */}
        <motion.line
          x1="-80" y1="0" x2="280" y2="200" 
          stroke="currentColor" strokeWidth="1.2" className="opacity-0 text-accent/50"
          variants={{
             hover: { opacity: [0, 0.5, 0], x: [-80, 80], transition: { repeat: Infinity, duration: 4.5, ease: "linear" } }
          }}
        />
        <motion.g variants={{ hover: { opacity: 1, transition: { delay: 2.2 } } }} className="opacity-0 fill-accent font-mono text-[8px] font-black">
          <text x="40" y="25">DATA_STREAM: CONNECTED</text>
          <motion.text x="40" y="185" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>PROCESS_SYNC: OK</motion.text>
        </motion.g>
      </motion.svg>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Waves className="text-accent" />,
      title: "Ingeniería Hidráulica",
      desc: "Diseño de redes de agua, alcantarillado, plantas de tratamiento y gestión de recursos hídricos.",
      tags: ["Drenaje", "Riego", "Plantas de Tratamiento"],
      animation: <HydraulicAnimation />
    },
    {
      icon: <Building2 className="text-accent" />,
      title: "Infraestructura Urbana",
      desc: "Desarrollo de proyectos viales, urbanizaciones y estructuras civiles de alta complejidad.",
      tags: ["Vialidad", "Puentes", "Urbanismo"],
      animation: <UrbanAnimation />
    },
    {
      icon: <HardHat className="text-accent" />,
      title: "Consultoría Técnica",
      desc: "Estudios de factibilidad, auditorías de proyectos y supervisión especializada de obra.",
      tags: ["Peritajes", "Factibilidad", "Supervisión"],
      animation: <TechnicalAnimation />
    }
  ];

  return (
    <section id="areas" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 text-primary">Soluciones de Ingeniería <span className="text-accent">Integrales</span></h2>
          <p className="text-primary/80 text-lg">Combinamos experiencia técnica con tecnología de vanguardia para ofrecer resultados excepcionales en cada disciplina.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial="initial"
              whileHover="hover"
              variants={{
                initial: { y: 0 },
                hover: { y: -10 }
              }}
              className="group p-8 rounded-2xl border border-primary/10 bg-surface hover:bg-white hover:shadow-2xl transition-all duration-500 relative cursor-pointer"
            >
              {/* Custom Animation Layer */}
              {s.animation}

              <div className="relative z-10">
                <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center mb-6 border border-primary/5 group-hover:scale-110 transition-transform duration-500">
                  {s.icon}
                </div>
                <h3 className="text-2xl mb-4 text-primary group-hover:text-accent transition-colors duration-300">{s.title}</h3>
                <p className="text-primary/70 mb-6 leading-relaxed group-hover:text-primary transition-colors duration-300">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t, j) => (
                    <Badge key={j} variant="secondary" className="bg-white text-primary/60 font-bold border border-primary/5 group-hover:border-accent/20 group-hover:text-accent transition-all duration-300">{t}</Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackProject: Project = {
    id: 'placeholder-camping',
    title: "CAMPING SADOP (Ejemplo)",
    location: "SAN VICENTE, BUENOS AIRES",
    mainArea: "Hidráulica / Vial / Ambiental",
    description: "Cargando datos desde la base de datos...",
    mainImage: "https://akhydra.com.ar/wp-content/uploads/2026/04/Camping-4-768x576.jpeg",
    gallery: [],
    details: {},
    createdAt: null,
    updatedAt: null
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), limit(3));
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        
        // Sort in memory to include docs without createdAt
        projectsData.sort((a, b) => {
          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          return timeB - timeA;
        });
        
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="proyectos" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl mb-6 text-primary">Proyectos que <span className="text-accent">Definen</span> el Futuro</h2>
            <p className="text-primary/70 font-medium">Una muestra de nuestro compromiso con la excelencia técnica y la sostenibilidad en cada obra.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/portfolio">
              <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 font-bold">Ver todos los proyectos</Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-accent" size={40} />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((p) => (
                <Link key={p.id} to={`/proyecto/${p.id}`} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-xl">
                    <img 
                      src={p.mainImage} 
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/95 text-accent backdrop-blur-sm border-none font-bold shadow-md">
                        <RenderMainArea mainArea={p.mainArea} />
                      </Badge>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary group-hover:text-accent transition-colors">{p.title}</h3>
                  <p className="text-sm text-primary/50 font-mono font-bold">{p.location}</p>
                </Link>
              ))
            ) : (
              <div className="col-span-3">
                <Link to="/admin" className="block p-12 bg-white rounded-3xl border-2 border-dashed border-primary/20 text-center hover:border-accent group transition-all">
                  <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                    <Plus size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Aún no hay proyectos cargados</h3>
                  <p className="text-primary/60 mb-6">Accede al panel para cargar el primer proyecto real.</p>
                  <Button className="bg-accent text-white font-bold">Ir al Panel de Autogestión</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setContactFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    tipo: 'Ingeniería Hidráulica',
    mensaje: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit triggered", formData);
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/mesfede@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Nueva consulta AKHYDRA: ${formData.nombre}`,
          _template: 'table'
        })
      });

      console.log("Response received", response.status);

      if (response.ok) {
        setIsSuccess(true);
        setContactFormData({
          nombre: '',
          empresa: '',
          email: '',
          tipo: 'Ingeniería Hidráulica',
          mensaje: ''
        });
      } else {
        const errorData = await response.json();
        console.error("Submission failed", errorData);
        throw new Error("Error en el envío");
      }
    } catch (error) {
      console.error("Catch error:", error);
      alert("Hubo un problema al enviar tu consulta. Por favor, reintenta.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl mb-8 text-primary">¿Tienes un <span className="text-accent">Desafío</span> Técnico?</h2>
            <p className="text-primary/80 text-lg mb-12">Estamos listos para aportar nuestra experiencia a tu próximo proyecto. Contáctanos para una consulta técnica inicial.</p>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="font-bold text-primary">Email</div>
                  <div className="text-primary/60 font-bold">contacto@akhydra.com.ar</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="font-bold text-primary">Teléfono</div>
                  <div className="text-primary/60 font-bold">+54 (11) 1234-5678</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="font-bold text-primary">Ubicación</div>
                  <div className="text-primary/60 font-bold">Buenos Aires, Argentina</div>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-8 shadow-2xl border-primary/5 bg-surface/30 relative overflow-hidden">
            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-primary/60 mb-8">Gracias por contactarnos. Te responderemos a la brevedad.</p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full">Enviar otro mensaje</Button>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Nombre</label>
                  <Input 
                    required
                    placeholder="Tu nombre" 
                    className="border-primary/20 focus:border-accent"
                    value={formData.nombre}
                    onChange={(e) => setContactFormData({...formData, nombre: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Empresa</label>
                  <Input 
                    placeholder="Nombre de empresa" 
                    className="border-primary/20 focus:border-accent"
                    value={formData.empresa}
                    onChange={(e) => setContactFormData({...formData, empresa: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Email Corporativo</label>
                <Input 
                  required
                  type="email" 
                  placeholder="email@empresa.com" 
                  className="border-primary/20 focus:border-accent"
                  value={formData.email}
                  onChange={(e) => setContactFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Tipo de Proyecto</label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-primary/20 bg-white text-sm focus:border-accent outline-none"
                  value={formData.tipo}
                  onChange={(e) => setContactFormData({...formData, tipo: e.target.value})}
                >
                  <option>Ingeniería Hidráulica</option>
                  <option>Infraestructura Vial</option>
                  <option>Consultoría Técnica</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Mensaje</label>
                <Textarea 
                  required
                  placeholder="Cuéntanos sobre tu proyecto..." 
                  className="min-h-[120px] border-primary/20 focus:border-accent"
                  value={formData.mensaje}
                  onChange={(e) => setContactFormData({...formData, mensaje: e.target.value})}
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 h-12 text-lg text-white font-bold shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Enviando...
                  </>
                ) : (
                  'Enviar Consulta'
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white/70 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center text-white mb-6">
              <AnimatedLogo imgClassName="brightness-0 invert" />
            </div>
            <p className="max-w-sm mb-8 text-white/80 font-medium">Líderes en ingeniería de fluidos e infraestructura resiliente. Comprometidos con la innovación técnica y el desarrollo sostenible.</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors cursor-pointer">
                <Globe size={20} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Servicios</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/area/hidraulica" className="hover:text-accent transition-colors">Hidráulica Urbana</Link></li>
              <li><Link to="/area/eng-renovables" className="hover:text-accent transition-colors">Sistemas de Riego</Link></li>
              <li><Link to="/area/vial" className="hover:text-accent transition-colors">Infraestructura Vial</Link></li>
              <li><Link to="/area/sanitaria" className="hover:text-accent transition-colors">Gestión de Aguas</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Compañía</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/#nosotros" className="hover:text-accent transition-colors">Sobre Nosotros</Link></li>
              <li><Link to="/#proyectos" className="hover:text-accent transition-colors">Proyectos</Link></li>
              <li><Link to="/#contacto" className="hover:text-accent transition-colors">Contacto</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <p>© 2026 AKHYDRA S.A. Todos los derechos reservados.</p>
            <Link to="/admin" className="opacity-10 hover:opacity-100 transition-opacity">
              <Lock size={10} />
            </Link>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PortfolioPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'));
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        
        // Sort in memory to include docs without createdAt
        projectsData.sort((a, b) => {
          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          return timeB - timeA;
        });
        
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-none font-bold uppercase tracking-widest px-4 py-1">Historial</Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">Nuestros <span className="text-accent underline decoration-accent/20 underline-offset-8">Proyectos</span></h1>
          <p className="text-primary/60 text-lg max-w-2xl leading-relaxed">
            Explora la diversidad de desafíos técnicos que AKHYDRA ha resuelto con éxito a lo largo del país. 
            Desde saneamiento urbano hasta infraestructuras complejas.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="animate-spin text-accent" size={48} />
            <p className="text-primary/40 font-mono text-sm animate-pulse">CARGANDO_PORTFOLIO...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.length > 0 ? (
              projects.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/proyecto/${p.id}`} className="group block">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-2xl transition-all duration-500 group-hover:shadow-accent/10 group-hover:-translate-y-2">
                      <img 
                        src={p.mainImage} 
                        alt={p.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-white text-accent border-none font-bold shadow-xl">
                          <RenderMainArea mainArea={p.mainArea} />
                        </Badge>
                      </div>
                      <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white shadow-lg">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 px-2">
                      <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors leading-tight">
                        {p.title}
                      </h3>
                      <div className="flex items-center gap-2 text-primary/40 font-mono text-xs uppercase tracking-widest font-bold">
                        <MapPin size={12} className="text-accent" />
                        {p.location}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-24 text-center bg-surface rounded-3xl border-2 border-dashed border-primary/5">
                <p className="text-xl text-primary/40 font-medium">No se han cargado proyectos todavía.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      try {
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() } as Project);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-accent" size={48} />
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h2 className="text-3xl font-bold text-primary">Proyecto no encontrado</h2>
      <Link to="/portfolio">
        <Button className="bg-accent text-white font-bold h-12 px-8 rounded-full">
          Volver al Portfolio
        </Button>
      </Link>
    </div>
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null && project?.gallery) {
      setSelectedImage((selectedImage - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null && project?.gallery) {
      setSelectedImage((selectedImage + 1) % project.gallery.length);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-white">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && project?.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={48} strokeWidth={1} />
            </motion.button>

            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all"
              onClick={handlePrev}
            >
              <ChevronLeft size={32} />
            </button>

            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all"
              onClick={handleNext}
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              layoutId={`gallery-${selectedImage}`}
              className="max-w-5xl w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <img 
                src={project.gallery[selectedImage]} 
                alt="Fullscreen" 
                className="w-full h-full object-contain md:object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white/80 font-mono text-sm">
                {selectedImage + 1} / {project.gallery.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden mb-16">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={project.mainImage} 
            alt={project.title} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-6 flex justify-start">
              <Badge className="bg-accent text-white border-none font-bold px-4 py-1.5 text-sm uppercase tracking-wide">
                <RenderMainArea mainArea={project.mainArea} />
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tighter leading-[0.9]">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90 font-bold mb-8">
              <MapPin className="text-accent" size={20} />
              <span className="text-xl md:text-2xl">{project.location}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-16">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
              <div className="w-8 h-1 bg-accent" />
              Resumen del Proyecto
            </h2>
            <div className="prose prose-lg text-primary/70 leading-relaxed max-w-none">
              <p className="whitespace-pre-wrap text-lg">{project.description}</p>
            </div>
          </section>

          {(project.details.hidraulica || project.details.vial || project.details.ambiental) && (
            <section className="space-y-8">
              <h2 className="text-3xl font-bold text-primary mb-8 underline decoration-accent/20">Especialidades Aplicadas</h2>
              <div className="grid gap-6">
                {project.details.hidraulica && (
                  <Card className="p-8 border-primary/5 bg-surface/30 rounded-3xl group hover:border-accent/20 transition-colors">
                    <div className="flex items-center gap-4 mb-4 text-accent">
                      <Waves size={32} />
                      <h3 className="text-2xl font-bold text-primary">Área Hidráulica</h3>
                    </div>
                    <div className="text-primary/70 leading-relaxed whitespace-pre-wrap pl-12 border-l border-primary/10">
                      {project.details.hidraulica}
                    </div>
                  </Card>
                )}
                {project.details.vial && (
                  <Card className="p-8 border-primary/5 bg-surface/30 rounded-3xl group hover:border-accent/20 transition-colors">
                    <div className="flex items-center gap-4 mb-4 text-accent">
                      <Building2 size={32} />
                      <h3 className="text-2xl font-bold text-primary">Área Vial</h3>
                    </div>
                    <div className="text-primary/70 leading-relaxed whitespace-pre-wrap pl-12 border-l border-primary/10">
                      {project.details.vial}
                    </div>
                  </Card>
                )}
                {project.details.ambiental && (
                  <Card className="p-8 border-primary/5 bg-surface/30 rounded-3xl group hover:border-accent/20 transition-colors">
                    <div className="flex items-center gap-4 mb-4 text-accent">
                      <HardHat size={32} />
                      <h3 className="text-2xl font-bold text-primary">Área Ambiental</h3>
                    </div>
                    <div className="text-primary/70 leading-relaxed whitespace-pre-wrap pl-12 border-l border-primary/10">
                      {project.details.ambiental}
                    </div>
                  </Card>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar / Gallery */}
        <div className="space-y-12">
          {project.gallery && project.gallery.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-primary mb-6 uppercase tracking-wider font-mono">Registro_Fotográfico</h3>
              <div className="grid gap-4">
                {project.gallery.map((img, idx) => (
                  <motion.div
                    key={idx}
                    layoutId={`gallery-${idx}`}
                    whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
                    className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-primary/5 cursor-zoom-in relative group"
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img 
                      src={img} 
                      alt={`Galeria ${idx}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Waves size={24} className="animate-pulse" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          <Card className="p-10 bg-primary text-white rounded-[2rem] border-none shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">¿Te interesa este tipo de soluciones?</h3>
            <p className="text-white/70 mb-8 leading-relaxed relative z-10">Consúltanos cómo podemos adaptar nuestra experiencia técnica a las necesidades específicas de tu empresa.</p>
            <Link to="/#contacto">
              <Button className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-14 rounded-2xl relative z-10 shadow-xl shadow-accent/20">
                Iniciar Consulta
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Project>({
    title: '',
    location: '',
    mainArea: 'Hidráulica',
    description: '',
    mainImage: '',
    gallery: [],
    details: {
      hidraulica: '',
      vial: '',
      ambiental: ''
    },
    createdAt: null,
    updatedAt: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) fetchProjects();
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, 'projects'));
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Project);
      
      // Ordenar en memoria por fecha (descendente)
      projectsData.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
      
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Error al iniciar sesión: " + (error instanceof Error ? error.message : "Error desconocido"));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      if (editingId) {
        const docRef = doc(db, 'projects', editingId);
        await updateDoc(docRef, { ...formData, updatedAt: serverTimestamp() });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'projects'), { ...formData, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      }
      setFormData({
        title: '', location: '', mainArea: 'Hidráulica', description: '', mainImage: '', gallery: [],
        details: { hidraulica: '', vial: '', ambiental: '' }, createdAt: null, updatedAt: null
      });
      await fetchProjects();
      alert("¡Éxito! Proyecto guardado correctamente.");
    } catch (error) {
      console.error("Save failed:", error);
      alert("Error al guardar: " + (error instanceof Error ? error.message : "Error desconocido"));
    } finally {
      setSaving(false);
    }
  };

  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    console.log("Ejecutando borrado final para ID:", id);
    try {
      setSaving(true);
      const docRef = doc(db, 'projects', id);
      await deleteDoc(docRef);
      await fetchProjects();
      setConfirmingDeleteId(null);
      alert("Proyecto eliminado con éxito.");
    } catch (error) {
      console.error("Delete failed in handler:", error);
      alert("Error técnico al eliminar: " + (error instanceof Error ? error.message : "Error de red o permisos"));
    } finally {
      setSaving(false);
    }
  };

  const seedSampleData = async () => {
    if (saving) return;
    
    if (projects.some(p => p.title === "CAMPING SADOP")) {
      if (!window.confirm("Ya existe un proyecto llamado 'CAMPING SADOP'. ¿Deseas cargar otro igual?")) {
        return;
      }
    }

    setSaving(true);
    const sample = {
      title: "CAMPING SADOP",
      location: "SAN VICENTE, BUENOS AIRES",
      mainArea: "Hidráulica / Vial / Ambiental",
      description: `Proyecto Ejecutivo Hidrológico – Hidráulico para el Camping ubicado en la ciudad de San Vicente. Se definieron las cotas de las calles internas y de las obras de arte a construir conjuntamente con todo el sistema de drenaje pluvial para evacuar los excedentes hídricos.\nTRAMITACIONES EN LA AUTORIDAD DEL AGUA (ADA).\nCumplimiento con la Resolución 1746/25.`,
      mainImage: "https://akhydra.com.ar/wp-content/uploads/2026/04/Camping-4-768x576.jpeg",
      gallery: [
        "https://akhydra.com.ar/wp-content/uploads/2026/04/Camping-2.jpg",
        "https://akhydra.com.ar/wp-content/uploads/2026/04/Camping-3.jpg",
        "https://akhydra.com.ar/wp-content/uploads/2026/04/Camping-5-1024x768.jpeg",
        "https://akhydra.com.ar/wp-content/uploads/2026/04/Camping-1-1024x715.jpg"
      ],
      details: {
        hidraulica: `Prefactibilidades:\n- Prefactibilidad Hidráulica.\n- Prefactibilidad de Explotación del Recurso Hídrico Subterráneo (Disponibilidad).\n- Prefactibilidad de Vertido de Efluentes Líquidos.\nPermisos:\n- Permiso Hidráulica de Obra.`,
        vial: `Estudios de suelos para calles internas.\n- Estudios Geotécnicos, a partir de sondeos con barreno de mano.\n- Ensayo con Penetrómetro Dinámico de Cono (DCP).\n- Medición de Espesores`,
        ambiental: `Realización del Estudio de Impacto Ambiental para ser presentado en las diferentes reparticiones Municipales y/ o Provinciales.\n- Asesoramiento Legal y Normativo\n- Relevamiento Ambiental Inicial\n- Asesoramiento en Diseño Sustentable\n- Plan de Manejo Ambiental de Obra\n- Sistema de Gestión de Residuos\n- Programa de Educación y Sensibilización Ambiental`
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    try {
      await addDoc(collection(db, 'projects'), sample);
      await fetchProjects();
      alert("¡Éxito! Proyecto de ejemplo 'CAMPING SADOP' cargado correctamente.");
    } catch (e) {
      console.error(e);
      alert("Error al cargar el ejemplo: " + (e instanceof Error ? e.message : "Error desconocido."));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-40"><Loader2 className="animate-spin text-accent" size={40} /></div>;

  if (!user) {
    return (
      <div className="pt-40 pb-24 flex flex-col items-center justify-center min-h-[60vh]">
        <Lock size={64} className="text-primary/20 mb-6" />
        <h2 className="text-3xl font-bold text-primary mb-2">Panel de Administración</h2>
        <p className="text-primary/60 mb-8 px-6 text-center">Debes iniciar sesión con tu cuenta de Google autorizada para gestionar los proyectos.</p>
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Button onClick={handleLogin} className="bg-primary hover:bg-accent text-white font-bold h-14 px-10 rounded-xl flex items-center gap-3">
            <Globe size={20} />
            Iniciar con Google
          </Button>
          <Link to="/" className="text-center text-primary/40 text-sm hover:text-accent flex items-center justify-center gap-2">
            <ArrowRight size={14} className="rotate-180" /> Volver a la web
          </Link>
        </div>
      </div>
    );
  }

  const isAuthorized = user.email === "mesfede@gmail.com";
  if (!isAuthorized) {
    return (
      <div className="pt-40 pb-24 flex flex-col items-center justify-center min-h-[60vh]">
        <Lock size={64} className="text-red-500/20 mb-6" />
        <h2 className="text-3xl font-bold text-primary mb-2">Acceso Denegado</h2>
        <p className="text-primary/60 mb-8 px-6 text-center">Tu cuenta ({user.email}) no tiene permisos para gestionar proyectos.</p>
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Button onClick={() => signOut(auth)} variant="outline" className="h-14 rounded-xl">Cerrar Sesión</Button>
          <Link to="/" className="text-center text-primary/40 text-sm hover:text-accent flex items-center justify-center gap-2">
            <ArrowRight size={14} className="rotate-180" /> Volver a la web
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Link to="/" className="p-2 bg-primary/5 rounded-lg text-primary/40 hover:text-accent transition-colors">
              <ArrowRight size={20} className="rotate-180" />
            </Link>
            <h1 className="text-4xl font-bold text-primary">Gestión de Proyectos</h1>
          </div>
          <p className="text-primary/60">Agrega, edita o elimina los proyectos que se muestran en la web.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button onClick={seedSampleData} disabled={saving} variant="outline" className="border-accent text-accent hover:bg-accent/5">
            {saving ? 'Procesando...' : 'Cargar Ejemplo Automático'}
          </Button>
          <Button onClick={() => signOut(auth)} variant="ghost" className="text-red-500/60 hover:text-red-500 hover:bg-red-50">Cerrar Sesión</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* Formulario */}
        <div className="lg:col-span-3">
          <Card className="p-8 border-primary/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-accent" />
            <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
              {editingId ? <Edit className="text-accent" /> : <Plus className="text-accent" />}
              {editingId ? 'Editando Proyecto Seleccionado' : 'Crear Nuevo Proyecto'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-60 uppercase tracking-widest">Título de la Obra</label>
                  <Input 
                    placeholder="Ej: Camping Sadop"
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    required 
                    className="border-primary/10 h-12 rounded-xl focus:ring-accent" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-60 uppercase tracking-widest">Localidad y Provincia</label>
                  <Input 
                    placeholder="Ej: San Vicente, Buenos Aires"
                    value={formData.location} 
                    onChange={e => setFormData({...formData, location: e.target.value})} 
                    required 
                    className="border-primary/10 h-12 rounded-xl focus:ring-accent" 
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-60 uppercase tracking-widest">Área(s) Técnica(s)</label>
                  <Input 
                    placeholder="Ej: Hidráulica / Vial"
                    value={formData.mainArea} 
                    onChange={e => setFormData({...formData, mainArea: e.target.value})} 
                    required 
                    className="border-primary/10 h-12 rounded-xl focus:ring-accent" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-60 uppercase tracking-widest">URL Imagen Portada</label>
                  <Input 
                    placeholder="https://..."
                    value={formData.mainImage} 
                    onChange={e => setFormData({...formData, mainImage: e.target.value})} 
                    required 
                    className="border-primary/10 h-12 rounded-xl focus:ring-accent" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold opacity-60 uppercase tracking-widest">Descripción del Proyecto (Cuerpo de texto)</label>
                <Textarea 
                  placeholder="Describe los objetivos y alcances generales..."
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  className="min-h-[160px] border-primary/10 rounded-2xl resize-none focus:ring-accent" 
                />
              </div>

              <div className="space-y-6 pt-6 border-t border-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Cog size={16} />
                  </div>
                  <h3 className="font-bold text-primary">Detalles Específicos por Área</h3>
                </div>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold opacity-40 uppercase tracking-widest flex items-center gap-2">
                      <Waves size={12} className="text-accent" /> Hidráulica
                    </label>
                    <Textarea 
                      placeholder="Listado de prefactibilidades, permisos hidráulicos..."
                      value={formData.details.hidraulica} 
                      onChange={e => setFormData({...formData, details: {...formData.details, hidraulica: e.target.value}})} 
                      className="border-primary/10 rounded-xl focus:ring-accent" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold opacity-40 uppercase tracking-widest flex items-center gap-2">
                      <Building2 size={12} className="text-accent" /> Vial
                    </label>
                    <Textarea 
                      placeholder="Estudios de suelo, ensayos geotécnicos..."
                      value={formData.details.vial} 
                      onChange={e => setFormData({...formData, details: {...formData.details, vial: e.target.value}})} 
                      className="border-primary/10 rounded-xl focus:ring-accent" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold opacity-40 uppercase tracking-widest flex items-center gap-2">
                      <HardHat size={12} className="text-accent" /> Ambiental
                    </label>
                    <Textarea 
                      placeholder="Estudios de impacto ambiental, planes de manejo..."
                      value={formData.details.ambiental} 
                      onChange={e => setFormData({...formData, details: {...formData.details, ambiental: e.target.value}})} 
                      className="border-primary/10 rounded-xl focus:ring-accent" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold opacity-60 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon size={14} /> Galería de Fotos
                </label>
                
                <div className="flex gap-2">
                  <Input 
                    id="newGalleryImage"
                    placeholder="Pega la URL de una imagen para la galería..."
                    className="border-primary/10 h-10 rounded-xl focus:ring-accent"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.currentTarget;
                        const url = input.value.trim();
                        if (url) {
                          setFormData({ ...formData, gallery: [...formData.gallery, url] });
                          input.value = '';
                        }
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    onClick={() => {
                      const input = document.getElementById('newGalleryImage') as HTMLInputElement;
                      const url = input?.value.trim();
                      if (url) {
                        setFormData({ ...formData, gallery: [...formData.gallery, url] });
                        input.value = '';
                      }
                    }}
                    className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 h-10 px-4"
                  >
                    Agregar
                  </Button>
                </div>
                
                {formData.gallery.length > 0 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-3 p-4 bg-primary/5 rounded-2xl border border-primary/5">
                    {formData.gallery.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-primary/10 group bg-white">
                        <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, gallery: formData.gallery.filter((_, i) => i !== idx)})}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-[10px] text-primary/40 italic">Puedes agregar imágenes una por una pegando el link y presionando Enter o el botón Agregar.</p>
              </div>

              <div className="flex gap-4 pt-6">
                <Button 
                  type="submit" 
                  disabled={saving} 
                  className="flex-grow bg-accent hover:bg-accent/90 text-white font-bold h-16 rounded-2xl shadow-xl shadow-accent/20 text-lg"
                >
                  {saving ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="animate-spin" size={24} />
                      <span>Procesando...</span>
                    </div>
                  ) : (
                    editingId ? 'Guardar Cambios Actuales' : 'Publicar Nuevo Proyecto'
                  )}
                </Button>
                {editingId && (
                  <Button type="button" onClick={() => {
                    setEditingId(null);
                    setFormData({
                      title: '', location: '', mainArea: 'Hidráulica', description: '', mainImage: '', gallery: [],
                      details: { hidraulica: '', vial: '', ambiental: '' }, createdAt: null, updatedAt: null
                    });
                  }} variant="outline" className="h-16 px-8 rounded-2xl">
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>

        {/* Lista Lateral */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-primary flex items-center gap-3 mb-2">
              <CheckCircle2 className="text-accent" />
              Proyectos Publicados
            </h2>
            <p className="text-primary/40 text-sm mb-6">Gestiona los {projects.length} proyectos actuales.</p>
          </div>
          
          <div className="space-y-4">
            {projects.length > 0 ? (
              projects.map(p => (
                <div 
                  key={p.id} 
                  className={`group p-4 flex items-center gap-4 rounded-3xl border-2 transition-all duration-300 ${
                    editingId === p.id 
                    ? 'bg-white border-accent shadow-xl scale-[1.02]' 
                    : 'bg-surface/50 border-transparent hover:bg-white hover:border-primary/10'
                  }`}
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-primary/5 shadow-inner">
                    <img src={p.mainImage} alt={p.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-primary truncate leading-tight">{p.title}</h4>
                    <div className="text-[10px] text-primary/40 font-bold uppercase tracking-wider mt-1">{p.location}</div>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0 opacity-100 z-10">
                    {confirmingDeleteId === p.id ? (
                      <div className="flex flex-col gap-1 animate-in fade-in slide-in-from-right-2">
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(p.id!);
                          }}
                          className="h-10 px-3 text-[10px] font-bold uppercase"
                        >
                          Confirmar
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setConfirmingDeleteId(null);
                          }}
                          className="h-10 px-3 text-[10px] font-bold uppercase opacity-60"
                        >
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => { 
                            e.preventDefault();
                            e.stopPropagation();
                            setFormData(p); 
                            setEditingId(p.id!); 
                            window.scrollTo({ top: 300, behavior: 'smooth' }); 
                          }}
                          className="h-12 w-12 p-0 text-primary/80 hover:text-accent hover:bg-accent/5 rounded-xl border-primary/20 shadow-sm"
                        >
                          <Edit size={22} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setConfirmingDeleteId(p.id!);
                          }}
                          className="h-12 w-12 p-0 text-red-500/80 hover:text-red-600 hover:bg-red-50 rounded-xl border-red-200 shadow-sm"
                        >
                          <Trash2 size={22} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-primary/5 rounded-[2rem]">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 text-primary/20">
                  <ImageIcon size={32} />
                </div>
                <p className="text-primary/40 font-bold">Sin proyectos en la base</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPanelPlaceholder = () => {
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/area/:areaId" element={<AreaDetail />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/proyecto/:projectId" element={<ProjectDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </>
  );
};

const StaffPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="bg-surface py-16 border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 text-xs font-mono font-bold text-accent mb-4 uppercase tracking-widest">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary/40">Staff</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-4 uppercase tracking-tighter">
            Capital <span className="text-accent italic">Humano</span>
          </h1>
          <p className="text-lg text-primary/60 max-w-2xl font-medium">
            Conocé al equipo interdisciplinario de profesionales que integran AKHYDRA Ingeniería.
          </p>
        </div>
      </div>
      <Staff />
      
      {/* Footer CTA specifically for staff page */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-8 italic">¿Te gustaría formar parte de nuestro equipo?</h3>
          <p className="text-xl text-white/70 mb-12">
            Estamos en constante búsqueda de talentos apasionados por la ingeniería y el medio ambiente.
          </p>
          <a href="mailto:info@akhydra.com.ar">
            <Button size="lg" className="bg-white text-primary hover:bg-accent hover:text-white font-bold h-16 px-12 rounded-full shadow-2xl transition-all">
              Enviar mi CV
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

const AreaDetail = () => {
  const { areaId } = useParams();
  const area = areasData.find(a => a.id === areaId);

  if (!area) return <div className="py-40 text-center text-2xl font-bold">Área no encontrada</div>;

  return (
    <div className="pt-32 pb-24">
      {/* Hero for the Area */}
      <section className="relative h-[60vh] overflow-hidden mb-24">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={area.image} 
            alt={area.name} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-accent text-white border-none font-bold px-4 py-1">Área de Especialidad</Badge>
            <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-6 uppercase tracking-tighter">
              {area.name}
            </h1>
            <div className="w-24 h-1 bg-accent mb-8" />
            <p className="text-xl md:text-3xl text-white/90 max-w-3xl font-medium leading-tight">
              {area.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-start mb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold text-primary">Nuestra Visión en <span className="text-accent">{area.name}</span></h2>
          <div className="prose prose-lg text-primary/70 leading-relaxed max-w-none">
            <p className="text-xl font-medium text-primary/90 mb-6">
              {area.fullDescription}
            </p>
            <p>
              En AKHYDRA, entendemos que cada desafío en {area.name} requiere una combinación única de rigurosidad científica, innovación tecnológica y compromiso ético. Nuestro equipo multidisciplinario trabaja integrando todas las variables para ofrecer soluciones eficientes y sostenibles.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-surface rounded-2xl border border-primary/5">
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <div className="text-xs uppercase tracking-widest font-bold text-primary/40">Compromiso Técnico</div>
            </div>
            <div className="p-6 bg-surface rounded-2xl border border-primary/5">
              <div className="text-3xl font-bold text-accent mb-2">ISO 9001</div>
              <div className="text-xs uppercase tracking-widest font-bold text-primary/40">Calidad Certificada</div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative group">
            <img 
              src={`https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800`} 
              alt="Detalle Técnico" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white font-mono text-xs uppercase tracking-widest font-bold">
              Detalle_Técnico_01
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
              <img 
                src={`https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600`} 
                alt="Obra" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
              <img 
                src={`https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600`} 
                alt="Laboratorio" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section Placeholder */}
      <section className="bg-primary py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tighter">Proyectos de {area.name}</h2>
              <p className="text-white/60 text-lg max-w-xl">Descubre cómo aplicamos nuestra experiencia en {area.name} para resolver problemas de infraestructura en el mundo real.</p>
            </div>
            <Button className="bg-white text-primary hover:bg-white/90 font-bold px-8 h-14 rounded-full">Próximamente Proyectos</Button>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 opacity-30">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center font-mono text-xs uppercase tracking-widest">
                Placeholder_Project_{i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 text-center max-w-3xl mx-auto px-6">
        <h3 className="text-3xl md:text-5xl font-bold mb-8 text-primary">¿Buscas una solución en <span className="text-accent">{area.name}</span>?</h3>
        <p className="text-xl text-primary/60 mb-12 leading-relaxed">
          Nuestros especialistas están listos para analizar tu requerimiento y proveer una propuesta técnica de excelencia.
        </p>
        <Link to="/#contacto">
          <Button size="lg" className="bg-accent h-20 px-12 text-xl text-white font-bold rounded-full shadow-2xl shadow-accent/20">
            Solicitar Consulta <ArrowRight className="ml-3" />
          </Button>
        </Link>
      </section>
    </div>
  );
};
