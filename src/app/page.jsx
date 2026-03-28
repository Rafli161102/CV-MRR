"use client";
/* eslint-disable @next/next/no-img-element */

'use strict';

import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  Mail,
  Phone,
  Linkedin,
  Github,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

// ============================================================================
// CV DATA - ALL ACTUAL DATA (NO PLACEHOLDERS)
// ============================================================================

const cvData = {
  personal: {
    name: 'Muhammad Rafli Ramadhan',
    role: 'Graphic Designer',
    email: 'raflisoenter@gmail.com',
    phone: '6285155020363',
    linkedin: 'https://linkedin.com/in/muhammad-rafli-ramadhan-0209b1211',
    github: 'https://github.com/Rafli161102',
    profileImage: '/profile.jpg',
    summary:
      'Desainer grafis berpengalaman lebih dari 1 tahun dengan keahlian dalam menciptakan desain visual yang menarik dan efektif. Memiliki keahlian dalam penggunaan perangkat lunak desain seperti Adobe Creative Suite (Photoshop, Illustrator, InDesign) dan mampu mengoperasikan kamera DLSR dengan baik. Berpengalaman dalam desain cetak dan digital, termasuk pembuatan logo, dan materi pemasaran.',
  },
  skills: {
    designTools: [
      'Adobe Illustrator',
      'Adobe Photoshop',
      'Adobe InDesign',
      'DSLR Photography',
      'Print Design',
      'Digital Design',
      'Brand Identity',
    ],
    officeTools: ['Microsoft Word', 'Microsoft Excel'],
  },
  experience: [
    {
      title: 'Graphic Design Printing',
      company: 'PT Wellen Brother',
      duration: 'Sep 2024 - Sep 2025',
      duties:
        'Designed banners, brochures, flyers, business cards, stickers, posters, and merchandise. Prepared print-ready files (CMYK, bleed, crop marks, 300 DPI). Performed quality control and proofing before printing. Coordinated with production team.',
    },
    {
      title: 'Business Development Officer',
      company: 'PT Megatama Jaya Makmur',
      duration: 'Feb 2024 - Aug 2024',
      duties:
        'Identified B2B opportunities. Prepared business proposals and commercial offers. Created visual materials and mockups to support pitches.',
    },
    {
      title: 'Freelance Designer',
      company: 'Bstation Indonesia',
      duration: 'Dec 2023 - Jan 2024',
      duties:
        'Head of equipment coordination team. Graphic designer for event flyers on Bstation social media at Anime Carnival 2023 in Mall Artha Gading.',
    },
    {
      title: 'Customer Service Associate',
      company: 'MineskiInfinity Sunter',
      duration: 'Mar 2023 - Dec 2023',
      duties:
        'Serving top-up transactions, F&B purchases, and maintaining cleanliness during night shifts.',
    },
    {
      title: 'Counter Retail',
      company: 'PT Berlian Busana Cemerlang',
      duration: 'Jan 2022 - Dec 2022',
      duties: 'Checking dirty clothes, serving payments, and organizing clean clothes to racks.',
    },
  ],
  education: [
    {
      school: 'Universitas Indraprasta PGRI',
      degree: 'Desain Komunikasi Visual',
      duration: 'Sep 2022 - Jan 2024',
      status: 'Incomplete',
    },
    {
      school: 'SMK Hang Tuah 2 Jakarta',
      degree: 'Teknik Komputer dan Jaringan',
      duration: 'Jun 2018 - Jul 2021',
      highlights: 'Wakil Ketua OSIS 2020-2021, Lulusan Terbaik 2021',
    },
  ],
  projects: [
    {
      title: 'Pertamina Packing Box',
      category: 'Packaging Design',
      description: 'Designing Pertamina One Solution souvenir boxes.',
      image: '/projects/packing-box.jpg',
    },
    {
      title: 'Cover Buku Langganan Bunker',
      category: 'Print Design',
      description: 'Designing cover books for Pertamina Patra Niaga BBM Subsidi.',
      image: '/projects/cover-book.jpg',
    },
    {
      title: 'Logo BEST',
      category: 'Brand Identity',
      description: 'Construction of Bumi Eka Sukses Tridaya "BEST" company logo.',
      image: '/projects/logo-best.jpg',
    },
    {
      title: 'Event Kumpul Wibu',
      category: 'Social Media Design',
      description: 'Pamphlet design for event at Bella Terra Lifestyle Center.',
      image: '/projects/kumpul-wibu.jpg',
    },
    {
      title: 'Bstation Anime Carnival 2023',
      category: 'Social Media Design',
      description: 'Visual promotion and social media designer for the event.',
      image: '/projects/anime-carnival.jpg',
    },
    {
      title: 'AquaNime Community',
      category: 'Community Design',
      description:
        'Founder of AquaNime, handling visual identity, mascots, and social media layout.',
      image: '/projects/aquanime.jpg',
    },
  ],
};

// ============================================================================
// DECRYPT TEXT COMPONENT - SCROLLYTELLING EFFECT
// ============================================================================

const DecryptText = ({ children, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [isScrambled, setIsScrambled] = useState(true);
  const elementRef = useRef(null);
  const animationFrameRef = useRef(null);

  const generateScrambled = (text) => {
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`₿₿₿ＭＡＴＲＩＸ₿₿₿';
    return text
      .split('')
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');
  };

  const isInCenter = () => {
    if (!elementRef.current) return false;

    const rect = elementRef.current.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const threshold = window.innerHeight * 0.25;

    return Math.abs(elementCenter - viewportCenter) < threshold;
  };

  const updateText = () => {
    const inCenter = isInCenter();
    if (inCenter && isScrambled) {
      setIsScrambled(false);
      setDisplayText(children);
    } else if (!inCenter && !isScrambled) {
      setIsScrambled(true);
      setDisplayText(generateScrambled(children) + '_');
    } else if (isScrambled) {
      setDisplayText(generateScrambled(children) + '_');
    }

    animationFrameRef.current = requestAnimationFrame(updateText);
  };

  useEffect(() => {
    setDisplayText(generateScrambled(children) + '_');
    setIsScrambled(true);

    animationFrameRef.current = requestAnimationFrame(updateText);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [children]);

  return (
    <span
      ref={elementRef}
      className={`${
        isScrambled
          ? 'font-mono text-cyan-400 animate-pulse'
          : 'font-sans text-black transition-all duration-300'
      } ${className}`}
    >
      {displayText}
    </span>
  );
};

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

const HeroSection = () => {
  const [isRotated, setIsRotated] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Profile Image with Rotate Effect */}
          <div className="flex justify-center md:justify-start">
            <div
              className="cursor-pointer transform transition-transform duration-500 hover:scale-105"
              onMouseEnter={() => setIsRotated(true)}
              onMouseLeave={() => setIsRotated(false)}
            >
              <img
                src={cvData.personal.profileImage}
                alt={cvData.personal.name}
                className={`w-64 h-64 sm:w-80 sm:h-80 rounded-3xl object-cover shadow-2xl transition-transform duration-500 ${
                  isRotated ? 'rotate-6' : 'rotate-0'
                }`}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold text-cyan-600 uppercase tracking-widest mb-4">
              Welcome to my portfolio
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
              <DecryptText className="block">
                {cvData.personal.name}
              </DecryptText>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              <DecryptText className="text-cyan-600">
                {cvData.personal.role}
              </DecryptText>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              {cvData.personal.summary}
            </p>

            {/* Contact Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
              <a
                href={`mailto:${cvData.personal.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Mail size={18} /> Email
              </a>
              <a
                href={`https://wa.me/${cvData.personal.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors"
              >
                <Phone size={18} /> WhatsApp
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href={cvData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-200 rounded-lg hover:bg-cyan-500 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={cvData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-200 rounded-lg hover:bg-black hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-gray-400" size={32} />
        </div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-black mb-12 text-center">
          <DecryptText>Skills & Expertise</DecryptText>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Design Tools */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 hover:border-cyan-400 transition-colors">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Design Tools</h3>
            <div className="flex flex-wrap gap-3">
              {cvData.skills.designTools.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-white border-2 border-black rounded-lg text-sm font-semibold hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Office Tools */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 hover:border-cyan-400 transition-colors">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Office Tools</h3>
            <div className="flex flex-wrap gap-3">
              {cvData.skills.officeTools.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-white border-2 border-black rounded-lg text-sm font-semibold hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-black mb-12 text-center">
          <DecryptText>Work Experience</DecryptText>
        </h2>

        <div className="space-y-8">
          {cvData.experience.map((exp, idx) => (
            <div
              key={idx}
              className="bg-white border-l-4 border-cyan-500 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {exp.title}
                  </h3>
                  <p className="text-base font-semibold text-cyan-600">{exp.company}</p>
                </div>
                <p className="text-sm font-medium text-gray-500 mt-2 sm:mt-0">
                  {exp.duration}
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">{exp.duties}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EducationSection = () => {
  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-black mb-12 text-center">
          <DecryptText>Education</DecryptText>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cvData.education.map((edu, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-200 hover:border-cyan-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{edu.school}</h3>
              <p className="text-lg font-semibold text-cyan-600 mb-2">{edu.degree}</p>
              <p className="text-sm text-gray-600 mb-4">{edu.duration}</p>
              {edu.status && (
                <p className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                  {edu.status}
                </p>
              )}
              {edu.highlights && (
                <p className="text-sm text-gray-700 mt-4">{edu.highlights}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-black mb-12 text-center">
          <DecryptText>Portfolio Projects</DecryptText>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cvData.projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <p className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-2">
                  {project.category}
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                  <DecryptText>{project.title}</DecryptText>
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FooterSection = () => {
  return (
    <footer className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Passionate graphic designer crafting visual experiences that stand out.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#skills" className="text-gray-400 hover:text-cyan-400 transition">
                  Skills
                </a>
              </li>
              <li>
                <a href="#experience" className="text-gray-400 hover:text-cyan-400 transition">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-cyan-400 transition">
                  Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="font-semibold">Email:</span>{' '}
                <a href={`mailto:${cvData.personal.email}`} className="text-cyan-400 hover:underline">
                  {cvData.personal.email}
                </a>
              </p>
              <p className="text-gray-400">
                <span className="font-semibold">Phone:</span> {cvData.personal.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            © 2026 {cvData.personal.name}. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a
              href={cvData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              LinkedIn
            </a>
            <a
              href={cvData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function Home() {
  return (
    <main className="bg-white overflow-x-hidden">
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <FooterSection />
    </main>
  );
}