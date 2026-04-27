'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { EndfieldCard, EndfieldButton, GlitchText } from '@/components/ui';

// ============================================================================
// MOCK DATA - OWNER PROFILE (Static untuk Fase 3)
// ============================================================================
const OWNER_DATA = {
  name: 'MUHAMMAD RAFLI RAMADHAN',
  shortName: 'RAFLI',
  title: 'SYSTEM ARCHITECT: VISUAL & COMMUNITY',
  bio: `Specialized in Brand Identity Systems and Community Development Architecture. Operating at the intersection of visual precision and strategic engagement.

Current deployment: Building end-to-end identity systems for regional entities while architecting community engagement frameworks that scale.

Core directive: Transform abstract vision into tangible visual reality through systematic design methodology.`,
  
  designArsenal: [
    'Adobe Illustrator',
    'Adobe Photoshop', 
    'Figma',
    'After Effects',
    'Blender 3D'
  ],
  
  communityArsenal: [
    'Strategic Planning',
    'Event Architecture',
    'Community Engagement',
    'Digital Campaign'
  ],
  
  careerHistory: [
    {
      id: 1,
      company: 'PT. WELLENBROTHER INDONESIA',
      role: 'GRAPHIC DESIGNER',
      period: '2024 - PRESENT',
      type: 'FULLTIME',
      description: 'Leading visual operations for construction & development sector. Deploying comprehensive brand identity systems across multiple project units.',
      isCurrent: true
    },
    {
      id: 2,
      company: 'MEGATAMA PERKASA',
      role: 'VISUAL DESIGNER',
      period: '2023 - 2024',
      type: 'CONTRACT',
      description: 'Executed tactical branding campaigns and industrial photography operations. Specialized in heavy machinery sector visual documentation.',
      isCurrent: false
    },
    {
      id: 3,
      company: 'AQUANIME COMMUNITY',
      role: 'FOUNDER & LEAD ARCHITECT',
      period: '2020 - PRESENT',
      type: 'OPERATION',
      description: 'Architected and deployed community ecosystem with 10,000+ active units. Established event protocols and engagement frameworks.',
      isCurrent: true
    }
  ]
};

// ============================================================================
// MOCK DATA - PROJECTS (Separated by Category)
// ============================================================================
const PROJECTS_VISUAL_IDENTITY = [
  {
    id: 'brand-wellens',
    title: 'WELLENS LIVING',
    category: 'VISUAL IDENTITY',
    year: '2024',
    thumbnail: '/projects/wellens-thumb.jpg',
    description: 'Complete brand identity system for luxury living development.'
  },
  {
    id: 'brand-edk',
    title: 'EDK ARCHITECTS',
    category: 'VISUAL IDENTITY',
    year: '2023',
    thumbnail: '/projects/edk-thumb.jpg',
    description: 'Architectural firm branding with precision geometric systems.'
  },
  {
    id: 'brand-velsie',
    title: 'VELSIE CAFÉ',
    category: 'VISUAL IDENTITY',
    year: '2023',
    thumbnail: '/projects/velsie-thumb.jpg',
    description: 'Industrial-themed café branding with tactical aesthetic.'
  },
  {
    id: 'brand-megatama',
    title: 'MEGATAMA PERKASA',
    category: 'VISUAL IDENTITY',
    year: '2023',
    thumbnail: '/projects/megatama-thumb.jpg',
    description: 'Heavy machinery company rebranding with bold industrial identity.'
  }
];

const PROJECTS_UIUX_DIGITAL = [
  {
    id: 'digital-cvport',
    title: 'CV PORTFOLIO SYSTEM',
    category: 'UI/UX & DIGITAL',
    year: '2024',
    thumbnail: '/projects/cvsystem-thumb.jpg',
    description: 'Interactive portfolio system with brutalist interface design.'
  },
  {
    id: 'digital-toolkit',
    title: 'MRR TOOLKIT ECOSYSTEM',
    category: 'UI/UX & DIGITAL',
    year: '2024',
    thumbnail: '/projects/toolkit-thumb.jpg',
    description: 'Micro-SaaS collection with tactical HUD interface design.'
  },
  {
    id: 'digital-mrrweb',
    title: 'MRR.WEB PORTAL',
    category: 'UI/UX & DIGITAL',
    year: '2024',
    thumbnail: '/projects/mrrweb-thumb.jpg',
    description: 'Personal brand website with endfield sci-fi aesthetic.'
  }
];

// ============================================================================
// TERMINAL BOOT SEQUENCE COMPONENT
// ============================================================================
function TerminalBoot() {
  const [bootLines, setBootLines] = useState([]);
  
  useEffect(() => {
    const lines = [
      { text: '> SYSTEM BOOT SEQUENCE INITIATED...', status: '[OK]' },
      { text: '> LOADING CORE MODULES...', status: '[OK]' },
      { text: '> MOUNTING FILESYSTEM...', status: '[OK]' },
      { text: '> CONNECTING TO DATABASE...', status: '[OK]' },
      { text: '> LOADING OWNER_PROFILE...', status: '[OK]' },
      { text: '> RENDERING INTERFACE...', status: '[DONE]' },
    ];
    
    let delay = 0;
    lines.forEach((line, index) => {
      setTimeout(() => {
        setBootLines(prev => [...prev, line]);
      }, delay);
      delay += 400;
    });
  }, []);
  
  return (
    <div className="font-mono text-xs text-endfieldTextMuted space-y-1">
      {bootLines.map((line, index) => (
        <div key={index} className="flex justify-between w-72">
          <span>{line.text}</span>
          <span className="text-endfieldAccent">{line.status}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// HERO SECTION - Endfield Style
// ============================================================================
function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative px-4 py-32 overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Decorative Lines - Endfield Style */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#fffa00]/30 to-transparent" />

      {/* Main Title - Large Bold Endfield Style */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-black text-white tracking-tighter leading-none uppercase">
          RAFLI
        </h1>
        <div className="h-4" />
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-[2px] bg-[#fffa00]" />
          <h2 className="font-mono text-sm md:text-base text-[#888] tracking-[0.3em] uppercase">
            {OWNER_DATA.title}
          </h2>
          <div className="w-12 h-[2px] bg-[#fffa00]" />
        </div>
      </div>

      {/* Accent Bar - Endfield Style */}
      <div className="w-64 h-1 bg-[#fffa00] mb-12" />

      {/* Subtitle */}
      <p className="text-center text-[#888] text-sm md:text-base max-w-lg mb-12 font-mono uppercase tracking-wider">
        Graphic Designer & Community Founder
        <br />
        <span className="text-[#fffa00]">Melintasi Perbatasan, ke Garis Depan</span>
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/projects">
          <EndfieldButton variant="primary" size="lg">
            VIEW ARSENAL
          </EndfieldButton>
        </Link>
        <Link href="/contact">
          <EndfieldButton variant="secondary" size="lg">
            INITIATE CONTACT
          </EndfieldButton>
        </Link>
      </div>

      {/* Scroll Indicator - Endfield Style */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] text-[#666] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#fffa00] to-transparent" />
      </div>
    </section>
  );
}

// ============================================================================
// BIOGRAPHY SECTION - Endfield Style
// ============================================================================
function BiographySection() {
  return (
    <section className="py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Section Header - Endfield Bold */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-12 bg-[#fffa00]" />
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              Biography
            </h2>
          </div>
          <span className="font-mono text-xs text-[#fffa00] tracking-[0.3em] uppercase">
            BIOGRAPHY_LOG // CLASSIFICATION: PUBLIC
          </span>
        </div>

        {/* Bio Content in EndfieldCard */}
        <EndfieldCard variant="elevated" className="relative">
          {/* Timestamp Header */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#2a2a2a]">
            <span className="font-mono text-xs text-[#888]">
              TIMESTAMP: {new Date().toISOString().split('T')[0]}
            </span>
            <span className="font-mono text-xs text-[#fffa00]">
              CLASSIFICATION: PUBLIC
            </span>
          </div>

          {/* Bio Text */}
          <div className="font-sans text-lg leading-relaxed text-white whitespace-pre-line mb-8">
            {OWNER_DATA.bio}
          </div>

          {/* Arsenal Lists */}
          <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-[#2a2a2a]">
            <div>
              <h4 className="font-mono text-xs text-[#fffa00] mb-3 tracking-[0.3em] uppercase">
                DESIGN ARSENAL
              </h4>
              <ul className="space-y-1">
                {OWNER_DATA.designArsenal.map((tool, index) => (
                  <li key={index} className="font-mono text-sm text-[#888] flex items-center gap-2">
                    <span className="text-[#fffa00]">›</span>
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs text-[#fffa00] mb-3 tracking-[0.3em] uppercase">
                COMMUNITY ARSENAL
              </h4>
              <ul className="space-y-1">
                {OWNER_DATA.communityArsenal.map((skill, index) => (
                  <li key={index} className="font-mono text-sm text-[#888] flex items-center gap-2">
                    <span className="text-[#fffa00]">›</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </EndfieldCard>
      </div>
    </section>
  );
}

// ============================================================================
// CAREER TIMELINE SECTION - Endfield Style
// ============================================================================
function CareerSection() {
  return (
    <section className="py-32 px-4 md:px-8 lg:px-16 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header - Endfield Bold */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-12 bg-[#fffa00]" />
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              Operation History
            </h2>
          </div>
          <span className="font-mono text-xs text-[#fffa00] tracking-[0.3em] uppercase">
            OPERATION_HISTORY // CAREER TIMELINE
          </span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[2px] bg-[#2a2a2a]" />

          {/* Career Items */}
          <div className="space-y-12">
            {OWNER_DATA.careerHistory.map((job) => (
              <div key={job.id} className="relative pl-8 md:pl-20">
                {/* Timeline Node */}
                <div className={`
                  absolute left-0 md:left-8 top-0
                  w-3 h-3 -translate-x-[5px]
                  ${job.isCurrent ? 'bg-[#fffa00]' : 'bg-[#2a2a2a]'}
                  clip-beveled-sm
                `} />

                {/* Job Card */}
                <EndfieldCard variant={job.isCurrent ? 'elevated' : 'default'}>
                  {/* Job Meta */}
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-mono">
                    <span className="text-[#fffa00] tracking-wider">
                      {job.period}
                    </span>
                    <span className="px-2 py-0.5 bg-[#0a0a0a] text-[#888] border border-[#2a2a2a]">
                      {job.type}
                    </span>
                    {job.isCurrent && (
                      <span className="px-2 py-0.5 bg-[#fffa00]/10 text-[#fffa00] border border-[#fffa00]/30">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  {/* Job Title */}
                  <h3 className="font-display text-xl text-white mb-1">
                    {job.company}
                  </h3>
                  <p className="font-mono text-sm text-[#fffa00] mb-3">
                    {job.role}
                  </p>

                  {/* Job Description */}
                  <p className="font-sans text-sm text-[#888] leading-relaxed">
                    {job.description}
                  </p>
                </EndfieldCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PROJECT GRID COMPONENT
// ============================================================================
function ProjectGrid({ projects, categoryLabel }) {
  return (
    <div className="mb-16">
      {/* Category Label */}
      <div className="mb-8 flex items-center gap-4">
        <span className="font-mono text-sm text-endfieldAccent tracking-widest">
          {categoryLabel}
        </span>
        <div className="flex-1 h-[1px] bg-endfieldBorder" />
        <span className="font-mono text-xs text-endfieldTextMuted">
          [{projects.length} UNITS]
        </span>
      </div>
      
      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <EndfieldCard className="group cursor-pointer h-full">
              {/* Thumbnail */}
              <div className="aspect-video bg-endfieldSurface mb-4 overflow-hidden clip-beveled-sm">
                <div className="w-full h-full bg-gradient-to-br from-endfieldPanel to-endfieldSurface flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <span className="font-mono text-xs text-endfieldTextMuted">
                    [ {project.id.toUpperCase()} ]
                  </span>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-display text-lg text-endfieldText group-hover:text-endfieldAccent transition-colors">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-endfieldTextMuted">
                  {project.year}
                </span>
              </div>
              
              <p className="font-mono text-xs text-endfieldAccent mb-2">
                {project.category}
              </p>
              
              <p className="font-sans text-sm text-endfieldTextMuted line-clamp-2">
                {project.description}
              </p>
            </EndfieldCard>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// PORTFOLIO SECTION - Endfield Style
// ============================================================================
function PortfolioSection() {
  return (
    <section className="py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Endfield Bold */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-12 bg-[#fffa00]" />
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              Deployed Projects
            </h2>
          </div>
          <span className="font-mono text-xs text-[#fffa00] tracking-[0.3em] uppercase">
            DEPLOYED_PROJECTS // VISUAL ARCHIVES
          </span>
        </div>

        {/* Visual Identity Category */}
        <ProjectGrid
          projects={PROJECTS_VISUAL_IDENTITY}
          categoryLabel="VISUAL IDENTITY / BRANDING"
        />

        {/* Separator */}
        <div className="my-20 flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-[#2a2a2a]" />
          <span className="font-mono text-xs text-[#666]">
            CATEGORY_SEPARATION
          </span>
          <div className="flex-1 h-[1px] bg-[#2a2a2a]" />
        </div>

        {/* UI/UX Category */}
        <ProjectGrid
          projects={PROJECTS_UIUX_DIGITAL}
          categoryLabel="UI/UX & DIGITAL PRODUCT"
        />
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <HeroSection />
      <BiographySection />
      <CareerSection />
      <PortfolioSection />
    </main>
  );
}
