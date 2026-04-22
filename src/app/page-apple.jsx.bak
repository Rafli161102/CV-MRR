'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import HomeVisualEditor from '@/components/HomeVisualEditor';
import { PROJECT_LIST, PHOTO_GALLERY } from '../data/store';

// =========================================================================
// DEFAULT UI CONFIG UNTUK HOMEPAGE VISUAL CMS
// =========================================================================
const DEFAULT_HOME_PAGE_UI = {
  version: 1,
  theme: {
    pageBg: '#030712',
    surface: '#0A1329',
    text: '#cbd5e1',
    muted: '#94a3b8',
    accent: '#67e8f9',
    accentStrong: '#06b6d4',
    accentMid: '#3b82f6',
    accentEnd: '#4f46e5',
    whatsapp: '#25D366'
  },
  hero: {
    statusLabel: 'Graphic Design & Community Development',
    titleLead: 'Menerjemahkan',
    titleAccent: 'Imajinasi',
    titleTrail: 'Menjadi Realitas Visual.',
    description:
      'Halo, saya Rafli. Membantu brand dan entitas mencapai potensi maksimalnya melalui desain identitas yang presisi, estetis, dan strategis.',
    primaryButtonLabel: 'Lihat CV Saya',
    primaryButtonHref: '/cv-print',
    secondaryButtonLabel: 'Mulai Diskusi',
    secondaryButtonHref:
      'https://wa.me/6285155020363?text=Halo%20Rafli%2C%20saya%20telah%20melihat%20portofolio%20Anda%20dan%20tertarik%20untuk%20berdiskusi%20mengenai%20proyek%20desain.',
    founderLabel: 'Founder of',
    founderName: 'AquaNime',
    experienceValue: '3+',
    experienceText: 'Years Experience',
    profileImage: '/profile.jpg'
  },
  sections: {
    toolkitEyebrow: 'Micro-SaaS Buatan Saya',
    toolkitTitle: 'MRR Toolkit Ecosystem',
    toolkitDescription:
      'Kumpulan aplikasi web dan utilitas desain gratis. Mulai dari ATS CV Maker, generator tautan WhatsApp premium, hingga ekstraktor palet warna untuk mempercepat alur kerja kreatif Anda.',
    toolkitButtonLabel: 'Eksplorasi Toolkit',
    toolkitButtonHref: '/toolkit',
    portfolioEyebrow: 'Portofolio Desain',
    portfolioTitleLead: 'Karya',
    portfolioTitleAccent: 'Unggulan',
    portfolioLinkLabel: 'Lihat Seluruh Karya',
    portfolioLinkHref: '/projects',
    galleryEyebrow: 'Lensa Kamera',
    galleryTitleLead: 'Sudut',
    galleryTitleAccent: 'Pandang',
    galleryLinkLabel: 'Lihat Seluruh Foto',
    galleryLinkHref: '/photography'
  }
};

function mergeHomePageUIConfig(input = {}) {
  const source = input && typeof input === 'object' ? input : {};

  return {
    ...DEFAULT_HOME_PAGE_UI,
    ...source,
    theme: {
      ...DEFAULT_HOME_PAGE_UI.theme,
      ...(source.theme && typeof source.theme === 'object' ? source.theme : {})
    },
    hero: {
      ...DEFAULT_HOME_PAGE_UI.hero,
      ...(source.hero && typeof source.hero === 'object' ? source.hero : {})
    },
    sections: {
      ...DEFAULT_HOME_PAGE_UI.sections,
      ...(source.sections && typeof source.sections === 'object'
        ? source.sections
        : {})
    }
  };
}

function hexToRgba(hex, alpha) {
  if (!hex || typeof hex !== 'string') return `rgba(255,255,255,${alpha})`;

  const normalized = hex.replace('#', '');
  const fullHex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized;

  if (fullHex.length !== 6) return `rgba(255,255,255,${alpha})`;

  const r = Number.parseInt(fullHex.slice(0, 2), 16);
  const g = Number.parseInt(fullHex.slice(2, 4), 16);
  const b = Number.parseInt(fullHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function isExternalLink(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url);
}

// =========================================================================
// HOOK CUSTOM UNTUK ANIMASI SCROLL - Apple Style
// =========================================================================
const useScrollReveal = (options = {}) => {
  const { threshold = 0.15, triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return [ref, isVisible, scrollProgress];
};

// Mouse parallax hook for Apple-style depth
const useMouseParallax = (intensity = 20) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = ((e.clientX - centerX) / rect.width) * intensity;
        const y = ((e.clientY - centerY) / rect.height) * intensity;
        setPosition({ x, y });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [intensity]);

  return [ref, position];
};

// =========================================================================
// KOMPONEN IKON
// =========================================================================
const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const ToolsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.827M15.75 12.75l-2.456-2.456M7.102 18.324a3.75 3.75 0 01-5.304 0 3.75 3.75 0 010-5.304l6.187-6.187a3.75 3.75 0 015.304 0l2.455 2.456" />
  </svg>
);

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
);

function ActionButton({ href, label, variant, theme, children }) {
  const isExternal = isExternalLink(href);
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    buttonRef.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'translate(0, 0) scale(1)';
    }
    setIsHovered(false);
  };

  const baseClassName =
    'w-full sm:w-auto px-8 py-4 rounded-2xl tracking-wide flex justify-center items-center gap-2 group relative overflow-hidden transition-all duration-300 ease-out';

  if (variant === 'primary') {
    const style = {
      backgroundColor: '#ffffff',
      color: theme.pageBg,
      boxShadow: isHovered
        ? `0 10px 40px ${hexToRgba(theme.accentStrong, 0.4)}, 0 0 60px ${hexToRgba(theme.accentStrong, 0.2)}`
        : `0 4px 20px ${hexToRgba(theme.accentStrong, 0.28)}`,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    };

    const ButtonContent = () => (
      <>
        {/* Shimmer effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        {children}
        <span className="relative z-10">{label}</span>
      </>
    );

    if (isExternal) {
      return (
        <a
          ref={buttonRef}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClassName} font-black`}
          style={style}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          <ButtonContent />
        </a>
      );
    }

    return (
      <Link
        ref={buttonRef}
        href={href}
        className={`${baseClassName} font-black`}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <ButtonContent />
      </Link>
    );
  }

  const secondaryStyle = {
    borderColor: hexToRgba(theme.whatsapp, 0.6),
    backgroundColor: hexToRgba(theme.whatsapp, 0.08),
    color: '#ffffff',
    boxShadow: isHovered
      ? `0 10px 30px ${hexToRgba(theme.whatsapp, 0.25)}`
      : 'none',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClassName} border font-bold`}
      style={secondaryStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      {children}
      <span className="relative z-10">{label}</span>
    </a>
  );
}

export default function Home() {
  const [gridIndices, setGridIndices] = useState([0, 1, 2]);
  const [fadingIndex, setFadingIndex] = useState(null);
  const nextItemIndexRef = useRef(3);

  const [projects, setProjects] = useState(PROJECT_LIST || []);
  const [photoGallery, setPhotoGallery] = useState(PHOTO_GALLERY || []);
  const [uiContent, setUiContent] = useState(DEFAULT_HOME_PAGE_UI);

  useEffect(() => {
    if (!projects || projects.length <= 3) return;

    let updateSlot = 0;
    nextItemIndexRef.current = 3 % projects.length;

    const intervalId = setInterval(() => {
      setFadingIndex(updateSlot);

      setTimeout(() => {
        setGridIndices((prevIndices) => {
          const newIndices = [...prevIndices];
          newIndices[updateSlot] = nextItemIndexRef.current;
          return newIndices;
        });

        nextItemIndexRef.current = (nextItemIndexRef.current + 1) % projects.length;
        setFadingIndex(null);
        updateSlot = (updateSlot + 1) % 3;
      }, 500);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [projects]);

  useEffect(() => {
    let mounted = true;

    async function loadCMS() {
      try {
        const [projectsRes, galleryRes, uiRes] = await Promise.all([
          fetch('/api/cms/projects'),
          fetch('/api/cms/photo-gallery'),
          fetch('/api/cms/page-content?id=homepage-ui')
        ]);

        if (projectsRes.ok) {
          const data = await projectsRes.json();
          if (mounted && Array.isArray(data) && data.length) {
            setProjects(data);
          }
        }

        if (galleryRes.ok) {
          const data = await galleryRes.json();
          if (mounted && Array.isArray(data) && data.length) {
            setPhotoGallery(data);
          }
        }

        if (uiRes.ok) {
          const data = await uiRes.json();
          if (mounted && data?.content) {
            setUiContent(mergeHomePageUIConfig(data.content));
          }
        }
      } catch (error) {
        console.error('Failed to load CMS data', error);
      }
    }

    loadCMS();

    return () => {
      mounted = false;
    };
  }, []);

  const [refToolkit, inViewToolkit, scrollProgressToolkit] = useScrollReveal();
  const [refPortfolio, inViewPortfolio, scrollProgressPortfolio] = useScrollReveal();
  const [refCamera, inViewCamera, scrollProgressCamera] = useScrollReveal();
  const [heroParallaxRef, heroMousePos] = useMouseParallax(15);

  const theme = uiContent.theme;
  const hero = uiContent.hero;
  const sections = uiContent.sections;

  return (
    <div
      className="min-h-screen font-sans selection:text-white relative w-full overflow-x-hidden"
      style={{
        backgroundColor: theme.pageBg,
        color: theme.text
      }}
    >
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Dynamic gradient orbs with mouse parallax */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[120vw] md:w-[50rem] h-[120vw] md:h-[50rem] rounded-full blur-[100px] md:blur-[120px] transition-transform duration-1000 ease-out"
          style={{
            backgroundColor: hexToRgba(theme.accentStrong, 0.14),
            transform: `translate(${heroMousePos.x * 0.5}px, ${heroMousePos.y * 0.5}px)`
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[100vw] md:w-[40rem] h-[100vw] md:h-[40rem] rounded-full blur-[100px] md:blur-[150px] transition-transform duration-1000 ease-out"
          style={{
            backgroundColor: hexToRgba(theme.accentEnd, 0.14),
            transform: `translate(${-heroMousePos.x * 0.3}px, ${-heroMousePos.y * 0.3}px)`
          }}
        />
        {/* Additional accent orb */}
        <div
          className="absolute top-[30%] right-[20%] w-[40vw] md:w-[25rem] h-[40vw] md:h-[25rem] rounded-full blur-[80px] md:blur-[100px] transition-transform duration-1000 ease-out"
          style={{
            backgroundColor: hexToRgba(theme.accentMid, 0.08),
            transform: `translate(${heroMousePos.x * 0.2}px, ${heroMousePos.y * 0.2}px)`
          }}
        />

        {/* Grid lines with subtle animation */}
        <div
          className="hidden md:block absolute left-[10%] top-0 bottom-0 w-[1px] transition-opacity duration-700"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.03) 80%, transparent)'
          }}
        />
        <div
          className="hidden md:block absolute left-[50%] top-0 bottom-0 w-[1px] transition-opacity duration-700"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.03) 80%, transparent)'
          }}
        />
        <div
          className="hidden md:block absolute right-[10%] top-0 bottom-0 w-[1px] transition-opacity duration-700"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.03) 80%, transparent)'
          }}
        />
      </div>

      <div className="relative z-10 pt-24 md:pt-36 pb-24 w-full">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 min-h-[auto] lg:min-h-[70vh] w-full py-10">
            <div className="w-full lg:w-[61.8%] flex flex-col justify-center text-center lg:text-left z-20">
              <div className="anim-fade-in-up inline-flex items-center justify-center lg:justify-start gap-3 mb-6 mx-auto lg:mx-0">
                <div
                  className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border shrink-0"
                  style={{
                    backgroundColor: hexToRgba('#22c55e', 0.12),
                    borderColor: hexToRgba('#22c55e', 0.45)
                  }}
                >
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#4ade80' }} />
                </div>
                <span
                  className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide border px-4 py-1.5 rounded-full backdrop-blur-sm"
                  style={{
                    color: theme.text,
                    borderColor: 'rgba(255,255,255,0.08)',
                    backgroundColor: 'rgba(255,255,255,0.04)'
                  }}
                >
                  {hero.statusLabel}
                </span>
              </div>

              <h1 className="anim-fade-in-up anim-delay-100 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-tighter text-white mb-6 leading-[1.1] drop-shadow-lg break-words">
                {hero.titleLead}{' '}
                <span
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${theme.accent}, ${theme.accentMid}, ${theme.accentEnd})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {hero.titleAccent}
                </span>{' '}
                <br className="hidden lg:block" />
                {hero.titleTrail}
              </h1>

              <p className="anim-fade-in-up anim-delay-200 text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0" style={{ color: theme.muted }}>
                {hero.description}
              </p>

              <div className="anim-fade-in-up anim-delay-300 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full sm:w-auto">
                <ActionButton href={hero.primaryButtonHref} label={hero.primaryButtonLabel} variant="primary" theme={theme}>
                  <span className="group-hover:-translate-y-1 transition-transform duration-300">
                    <DocumentIcon />
                  </span>
                </ActionButton>

                <ActionButton href={hero.secondaryButtonHref} label={hero.secondaryButtonLabel} variant="secondary" theme={theme}>
                  <span className="group-hover:scale-110 transition-transform" style={{ color: theme.whatsapp }}>
                    <WhatsAppIcon />
                  </span>
                </ActionButton>
              </div>
            </div>

            <div className="w-full lg:w-[38.2%] flex justify-center lg:justify-end relative z-10">
              <div
                ref={heroParallaxRef}
                className="relative w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] aspect-[4/5] group mx-auto lg:mx-0"
                style={{
                  transform: `perspective(1000px) rotateY(${heroMousePos.x * 0.3}deg) rotateX(${-heroMousePos.y * 0.3}deg)`,
                  transition: 'transform 0.2s ease-out'
                }}
              >
                {/* Animated glow effect */}
                <div
                  className="absolute inset-0 rounded-[2rem] opacity-40 blur-2xl transition-all duration-700 group-hover:opacity-60"
                  style={{
                    background: `linear-gradient(135deg, ${theme.accentStrong}, ${theme.accentMid}, ${theme.accentEnd})`,
                    transform: `translate(${heroMousePos.x * 0.8}px, ${heroMousePos.y * 0.8}px) rotate(6deg) scale(0.95)`
                  }}
                />
                {/* Secondary glow */}
                <div
                  className="absolute inset-0 rounded-[2rem] opacity-20 blur-xl transition-all duration-700"
                  style={{
                    background: `linear-gradient(225deg, ${theme.accent}, ${theme.accentStrong})`,
                    transform: `translate(${-heroMousePos.x * 0.5}px, ${-heroMousePos.y * 0.5}px) rotate(-3deg) scale(0.9)`
                  }}
                />

                {/* Main card with glass effect */}
                <div
                  className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl z-10 border transition-all duration-300"
                  style={{
                    backgroundColor: theme.surface,
                    borderColor: 'rgba(255,255,255,0.1)',
                    boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 100px ${hexToRgba(theme.accentStrong, 0.1)}`
                  }}
                >
                  <img
                    src={hero.profileImage}
                    alt="Muhammad Rafli Ramadhan"
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  {/* Glass overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-90" />
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Founder badge with glass effect */}
                <div
                  className="absolute -bottom-5 left-[-10px] lg:-left-10 z-20 p-3 sm:p-5 rounded-2xl border transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${hexToRgba(theme.surface, 0.95)}, ${hexToRgba(theme.surface, 0.8)})`,
                    backdropFilter: 'blur(20px) saturate(180%)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)`,
                    transform: `translate(${heroMousePos.x * 0.2}px, ${heroMousePos.y * 0.2}px)`
                  }}
                >
                  <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: theme.muted }}>
                    {hero.founderLabel}
                  </div>
                  <div className="text-base sm:text-xl font-black text-white flex items-center gap-2">
                    {hero.founderName}
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: theme.accent }} />
                  </div>
                </div>

                {/* Experience badge */}
                <div
                  className="absolute -top-5 right-[-10px] lg:-right-8 z-20 p-3 sm:p-4 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3"
                  style={{
                    background: `linear-gradient(135deg, ${theme.accentStrong}, ${theme.accentMid})`,
                    boxShadow: `0 10px 30px ${hexToRgba(theme.accentStrong, 0.4)}, 0 0 0 1px rgba(255,255,255,0.1)`,
                    transform: `translate(${heroMousePos.x * 0.15}px, ${heroMousePos.y * 0.15}px)`
                  }}
                >
                  <div className="text-xl sm:text-3xl font-black text-white">{hero.experienceValue}</div>
                  <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider leading-tight text-cyan-50">
                    {hero.experienceText}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={refToolkit}
            className={`mt-20 lg:mt-32 w-full transition-all duration-1000 ease-out ${
              inViewToolkit ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              transform: `translateY(${(1 - scrollProgressToolkit) * 20}px)`
            }}
          >
            <div
              className="relative rounded-3xl overflow-hidden border p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl group transition-all duration-500 hover:border-opacity-20"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                background: `linear-gradient(135deg, ${hexToRgba(theme.surface, 0.95)}, ${hexToRgba(theme.surface, 0.8)})`,
                backdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`
              }}
            >
              {/* Animated gradient orbs */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -z-10 group-hover:opacity-100 transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, ${hexToRgba(theme.accentStrong, 0.2)}, ${hexToRgba(theme.accentMid, 0.1)})`,
                  transform: `translate(${scrollProgressToolkit * 20}px, ${-scrollProgressToolkit * 10}px)`
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-[60px] -z-10"
                style={{
                  background: `linear-gradient(225deg, ${hexToRgba(theme.accentMid, 0.15)}, ${hexToRgba(theme.accentEnd, 0.1)})`,
                  transform: `translate(${-scrollProgressToolkit * 15}px, ${scrollProgressToolkit * 5}px)`
                }}
              />

              <div className="flex items-start gap-4 sm:gap-5 z-10 text-center md:text-left w-full md:w-auto flex-col sm:flex-row">
                <div
                  className="p-3 border rounded-2xl hidden md:block transition-all duration-500 mx-auto sm:mx-0 shrink-0 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `linear-gradient(135deg, ${hexToRgba(theme.accentStrong, 0.2)}, ${hexToRgba(theme.accentStrong, 0.1)})`,
                    borderColor: hexToRgba(theme.accentStrong, 0.3),
                    color: theme.accent,
                    boxShadow: `0 10px 30px ${hexToRgba(theme.accentStrong, 0.2)}`
                  }}
                >
                  <ToolsIcon />
                </div>
                <div className="w-full">
                  <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: theme.accent }}>
                    {sections.toolkitEyebrow}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
                    {sections.toolkitTitle}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed mx-auto md:mx-0" style={{ color: theme.muted }}>
                    {sections.toolkitDescription}
                  </p>
                </div>
              </div>

              <Link
                href={sections.toolkitButtonHref}
                className="w-full md:w-auto z-10 whitespace-nowrap px-6 sm:px-8 py-3.5 sm:py-4 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 hover:-translate-x-1"
                style={{
                  backgroundColor: theme.accentStrong,
                  boxShadow: `0 0 30px ${hexToRgba(theme.accentStrong, 0.4)}`
                }}
              >
                {sections.toolkitButtonLabel}
                <ArrowRightIcon />
              </Link>
            </div>
          </div>

          <div
            ref={refPortfolio}
            className={`mt-20 lg:mt-32 pt-16 border-t transition-all duration-1000 ease-out ${
              inViewPortfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              borderColor: 'rgba(255,255,255,0.05)',
              transform: `translateY(${(1 - scrollProgressPortfolio) * 15}px)`
            }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6 w-full">
              <div className="w-full sm:w-auto">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm rotate-45 shrink-0 animate-pulse" style={{ backgroundColor: theme.accentStrong }} />
                  <span className="font-bold uppercase tracking-widest text-[10px] sm:text-xs" style={{ color: theme.accent }}>
                    {sections.portfolioEyebrow}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  {sections.portfolioTitleLead}{' '}
                  <span style={{ color: theme.accentStrong }}>{sections.portfolioTitleAccent}</span>
                </h2>
              </div>
              <Link
                href={sections.portfolioLinkHref}
                className="w-full sm:w-auto font-bold tracking-widest uppercase text-[10px] sm:text-sm group flex items-center justify-between sm:justify-start gap-2 transition-all duration-300 pb-1 border-b border-transparent hover:border-current"
                style={{ color: theme.accent }}
              >
                <span className="group-hover:tracking-wider transition-all duration-300">{sections.portfolioLinkLabel}</span>
                <span className="bg-white/10 p-1.5 rounded-full transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 shrink-0">
                  <ArrowRightIcon />
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 auto-rows-[300px] sm:auto-rows-[350px] lg:auto-rows-[450px]">
              {gridIndices.map((projectIndex, slotIndex) => {
                const project =
                  (projects && projects[projectIndex]) ||
                  projects[0] ||
                  PROJECT_LIST[projectIndex] ||
                  PROJECT_LIST[0];

                if (!project) return null;

                return (
                  <Link
                    href={`/projects/${project.id}`}
                    key={slotIndex}
                    className={`group relative rounded-3xl sm:rounded-[2rem] overflow-hidden border transition-all duration-700 ease-out ${
                      slotIndex === 0 ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                    } ${fadingIndex === slotIndex ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                    style={{
                      backgroundColor: theme.surface,
                      borderColor: 'rgba(255,255,255,0.05)',
                      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
                      transform: `translateY(${(1 - scrollProgressPortfolio) * (slotIndex * 5)}px)`
                    }}
                  >
                    {/* Glass overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${hexToRgba(theme.accentStrong, 0.05)}, transparent)`,
                        backdropFilter: 'blur(2px)'
                      }}
                    />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-70 group-hover:opacity-100"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-500" />

                    <div
                      className={`absolute bottom-0 left-0 w-full flex flex-col justify-end transform translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-all duration-500 ${
                        slotIndex === 0 ? 'p-8 sm:p-10' : 'p-6 sm:p-8'
                      }`}
                    >
                      <div
                        className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mb-3 backdrop-blur-xl border px-3.5 py-1.5 rounded-full w-fit transition-all duration-300 group-hover:scale-105"
                        style={{
                          color: theme.accent,
                          background: `linear-gradient(135deg, ${hexToRgba(theme.accentStrong, 0.25)}, ${hexToRgba(theme.accentStrong, 0.1)})`,
                          borderColor: hexToRgba(theme.accentStrong, 0.35),
                          boxShadow: `0 8px 32px ${hexToRgba(theme.accentStrong, 0.15)}`
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: theme.accent }} />
                        {project.category}
                      </div>
                      <h3
                        className={`font-bold text-white transition-all duration-300 tracking-tight line-clamp-2 group-hover:tracking-tight ${
                          slotIndex === 0 ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl' : 'text-xl sm:text-2xl lg:text-3xl'
                        }`}
                      >
                        {project.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div
            ref={refCamera}
            className={`mt-20 lg:mt-32 pt-16 border-t transition-all duration-1000 ease-out ${
              inViewCamera ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              borderColor: 'rgba(255,255,255,0.05)',
              transform: `translateY(${(1 - scrollProgressCamera) * 10}px)`
            }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6 w-full">
              <div className="w-full sm:w-auto">
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: theme.accent }} className="shrink-0 transition-transform duration-300 hover:scale-110">
                    <CameraIcon />
                  </span>
                  <span className="font-bold uppercase tracking-widest text-[10px] sm:text-xs" style={{ color: theme.accent }}>
                    {sections.galleryEyebrow}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  {sections.galleryTitleLead}{' '}
                  <span style={{ color: theme.accentStrong }}>{sections.galleryTitleAccent}</span>
                </h2>
              </div>
              <Link
                href={sections.galleryLinkHref}
                className="w-full sm:w-auto font-bold tracking-widest uppercase text-[10px] sm:text-sm group flex items-center justify-between sm:justify-start gap-2 transition-all duration-300 pb-1 border-b border-transparent hover:border-current"
                style={{ color: theme.accent }}
              >
                <span className="group-hover:tracking-wider transition-all duration-300">{sections.galleryLinkLabel}</span>
                <span className="bg-white/10 p-1.5 rounded-full transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 shrink-0">
                  <ArrowRightIcon />
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {photoGallery &&
                photoGallery.slice(0, 4).map((photo, i) => (
                  <div
                    key={photo.id || i}
                    className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:shadow-2xl ${
                      i === 0 || i === 3 ? 'aspect-[4/5]' : 'aspect-square'
                    }`}
                    style={{
                      backgroundColor: theme.surface,
                      borderColor: 'rgba(255,255,255,0.05)',
                      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
                      transform: `translateY(${(1 - scrollProgressCamera) * (i % 2 === 0 ? 5 : -5)}px)`,
                      transitionDelay: `${i * 50}ms`
                    }}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title || 'Fotografi'}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-115 transition-all duration-700"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop';
                      }}
                    />
                    {/* Glass overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${hexToRgba(theme.accent, 0.05)}, transparent)`,
                        backdropFilter: 'blur(1px)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 z-10">
                      <span className="text-white text-xs font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 tracking-wide line-clamp-1 drop-shadow-lg">
                        {photo.title}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <HomeVisualEditor
        initialContent={uiContent}
        onSaved={(nextContent) => {
          setUiContent(mergeHomePageUIConfig(nextContent));
        }}
      />
    </div>
  );
}
