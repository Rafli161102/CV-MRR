/**
 * ============================================================================
 * Toolkit Page - Endfield Brutalist Design with WinRAR Soft-Paywall
 * ============================================================================
 * Halaman /toolkit dengan:
 * - EndfieldCard untuk setiap tool
 * - Label [PREMIUM] dan [FREE] tajam
 * - Integrasi SoftPaywallModal (WinRAR Protocol)
 * - Database integration dari MongoDB (Toolkit schema)
 * ============================================================================
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { EndfieldCard, EndfieldButton, GlitchText } from '@/components/ui';
import SoftPaywallModal from '@/components/ui/SoftPaywallModal';
import { useSoftPaywall } from '@/hooks/useSoftPaywall';

// Mock data - akan diganti dengan fetch dari API /api/toolkit
const TOOLS_DATA = [
  {
    id: 'freelance-invoice',
    title: 'FREELANCE INVOICE',
    subtitle: 'GENERATOR',
    category: 'Business Utility',
    isPremium: false,
    description: 'Generate professional invoices for your freelance projects with auto-calculations.',
    features: ['PDF Export', 'Auto-calculation', 'Client database'],
    route: '/toolkit/freelance-invoice',
    status: 'active',
  },
  {
    id: 'project-timeline',
    title: 'PROJECT TIMELINE',
    subtitle: 'PLANNER',
    category: 'Productivity',
    isPremium: true,
    description: 'Visual timeline planner with Gantt chart for complex project management.',
    features: ['Gantt charts', 'Milestone tracking', 'Team sync'],
    route: '/toolkit/project-timeline',
    status: 'active',
  },
  {
    id: 'brand-guideline',
    title: 'BRAND GUIDELINE',
    subtitle: 'CHECKER',
    category: 'Design Utility',
    isPremium: false,
    description: 'Validate brand consistency across assets with automated checks.',
    features: ['Color validator', 'Font checker', 'Logo grid'],
    route: '/toolkit/brand-checker',
    status: 'beta',
  },
  {
    id: 'social-content',
    title: 'SOCIAL CONTENT',
    subtitle: 'CALENDAR',
    category: 'Community Tool',
    isPremium: true,
    description: 'Plan and schedule community content across multiple platforms.',
    features: ['Multi-platform', 'Auto-schedule', 'Analytics preview'],
    route: '/toolkit/content-calendar',
    status: 'active',
  },
  {
    id: 'event-budget',
    title: 'EVENT BUDGET',
    subtitle: 'CALCULATOR',
    category: 'Community Tool',
    isPremium: false,
    description: 'Calculate event costs with vendor comparison and contingency planning.',
    features: ['Vendor DB', 'Cost breakdown', 'Contingency calc'],
    route: '/toolkit/event-budget',
    status: 'active',
  },
  {
    id: 'portfolio-analyzer',
    title: 'PORTFOLIO',
    subtitle: 'ANALYZER',
    category: 'Design Utility',
    isPremium: true,
    description: 'AI-powered portfolio feedback and improvement suggestions.',
    features: ['AI critique', 'Layout suggestions', 'Typography check'],
    route: '/toolkit/portfolio-analyzer',
    status: 'development',
  },
];

// Icons untuk setiap tool
const ToolIcon = ({ category, className = "h-6 w-6" }) => {
  const iconPaths = {
    'Business Utility': (
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    ),
    'Productivity': (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
    'Design Utility': (
      <>
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </>
    ),
    'Community Tool': (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  };

  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      {iconPaths[category] || iconPaths['Design Utility']}
    </svg>
  );
};

// Status Badge Component
const StatusBadge = ({ status, isPremium }) => {
  if (isPremium) {
    return (
      <span className="px-2 py-1 bg-endfieldAccent/10 border border-endfieldAccent/30 text-endfieldAccent text-[10px] font-mono font-bold tracking-wider">
        [PREMIUM]
      </span>
    );
  }
  
  if (status === 'beta') {
    return (
      <span className="px-2 py-1 bg-endfieldWarning/10 border border-endfieldWarning/30 text-endfieldWarning text-[10px] font-mono font-bold tracking-wider">
        [BETA]
      </span>
    );
  }
  
  return (
    <span className="px-2 py-1 bg-endfieldSurface border border-endfieldBorder text-endfieldTextMuted text-[10px] font-mono font-bold tracking-wider">
      [FREE]
    </span>
  );
};

// Tool Card Component
const ToolCard = ({ tool, onLaunch }) => {
  const isDevelopment = tool.status === 'development';
  
  return (
    <EndfieldCard className="h-full flex flex-col group">
      {/* Header with Icon and Badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-endfieldSurface border border-endfieldBorder flex items-center justify-center text-endfieldAccent group-hover:border-endfieldAccent/50 transition-colors">
          <ToolIcon category={tool.category} />
        </div>
        <StatusBadge status={tool.status} isPremium={tool.isPremium} />
      </div>
      
      {/* Title */}
      <div className="mb-3">
        <h3 className="font-display text-lg text-endfieldText leading-tight">
          {tool.title}
        </h3>
        <p className="font-mono text-xs text-endfieldAccent tracking-wider">
          {tool.subtitle}
        </p>
      </div>
      
      {/* Description */}
      <p className="font-sans text-sm text-endfieldTextMuted mb-4 flex-grow line-clamp-3">
        {tool.description}
      </p>
      
      {/* Features */}
      <div className="mb-4 space-y-1">
        {tool.features.slice(0, 2).map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs">
            <span className="text-endfieldAccent">›</span>
            <span className="font-mono text-endfieldTextMuted">{feature}</span>
          </div>
        ))}
      </div>
      
      {/* Action Button */}
      <div className="mt-auto pt-4 border-t border-endfieldBorder">
        {isDevelopment ? (
          <button 
            disabled
            className="w-full px-4 py-2 bg-endfieldSurface border border-endfieldBorder text-endfieldTextMuted font-mono text-xs uppercase tracking-wider cursor-not-allowed"
          >
            // IN_DEVELOPMENT
          </button>
        ) : (
          <EndfieldButton
            variant={tool.isPremium ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onLaunch(tool)}
            className="w-full"
          >
            {tool.isPremium ? '// LAUNCH_PREMIUM' : '// LAUNCH'}
          </EndfieldButton>
        )}
      </div>
    </EndfieldCard>
  );
};

// Main Toolkit Page
export default function ToolkitPage() {
  const [tools, setTools] = useState(TOOLS_DATA);
  const [selectedTool, setSelectedTool] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Soft Paywall Hook
  const {
    showModal,
    handleBypass,
    handleDonate,
    executeWithPaywall,
    usageCount,
    getStats,
  } = useSoftPaywall(selectedTool?.id || 'toolkit');

  // Load tools from database (will be implemented with real API)
  useEffect(() => {
    // TODO: Fetch from /api/toolkit
    // const fetchTools = async () => {
    //   const res = await fetch('/api/toolkit');
    //   const data = await res.json();
    //   setTools(data);
    // };
    // fetchTools();
  }, []);

  // Handle tool launch with paywall
  const handleLaunch = (tool) => {
    setSelectedTool(tool);
    
    if (tool.isPremium) {
      // For premium tools, always show paywall on 3rd use
      executeWithPaywall(() => {
        window.location.href = tool.route;
      });
    } else {
      // Free tools - direct access
      window.location.href = tool.route;
    }
  };

  const stats = getStats();

  return (
    <main className="min-h-screen bg-endfieldBg text-endfieldText">
      {/* Hero Section */}
      <section className="py-24 px-4 md:px-8 lg:px-16 border-b border-endfieldBorder">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="font-mono text-xs text-endfieldAccent tracking-widest">
              // TOOLKIT_ECOSYSTEM
            </span>
          </div>
          
          <GlitchText 
            text="MRR TOOLKIT" 
            className="text-5xl md:text-6xl lg:text-7xl mb-6"
          />
          
          <p className="font-sans text-lg text-endfieldTextMuted max-w-2xl mb-8">
            Productivity utilities for designers, freelancers, and community architects. 
            Free tools for everyone, premium features for professionals.
          </p>
          
          {/* Stats Bar */}
          <div className="flex flex-wrap gap-6">
            <div className="px-4 py-2 bg-endfieldSurface border border-endfieldBorder">
              <span className="font-mono text-xs text-endfieldTextMuted block">TOTAL TOOLS</span>
              <span className="font-display text-2xl text-endfieldText">{tools.length}</span>
            </div>
            <div className="px-4 py-2 bg-endfieldSurface border border-endfieldBorder">
              <span className="font-mono text-xs text-endfieldTextMuted block">FREE</span>
              <span className="font-display text-2xl text-endfieldSuccess">
                {tools.filter(t => !t.isPremium).length}
              </span>
            </div>
            <div className="px-4 py-2 bg-endfieldSurface border border-endfieldBorder">
              <span className="font-mono text-xs text-endfieldTextMuted block">PREMIUM</span>
              <span className="font-display text-2xl text-endfieldAccent">
                {tools.filter(t => t.isPremium).length}
              </span>
            </div>
            
            {/* Usage Stats (if any) */}
            {usageCount > 0 && (
              <div className="px-4 py-2 bg-endfieldSurface border border-endfieldBorder">
                <span className="font-mono text-xs text-endfieldTextMuted block">YOUR USAGE</span>
                <span className="font-display text-2xl text-endfieldText">{usageCount}</span>
                <span className="font-mono text-xs text-endfieldTextMuted ml-2">
                  (next: {stats.nextTrigger})
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <span className="font-mono text-xs text-endfieldAccent tracking-widest">
              // AVAILABLE_TOOLS
            </span>
            <div className="w-16 h-[1px] bg-endfieldAccent mt-2" />
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                onLaunch={handleLaunch}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PWA Install CTA */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-endfieldSurface border-t border-endfieldBorder">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="font-mono text-xs text-endfieldAccent tracking-widest">
              // MOBILE_INSTALLATION
            </span>
          </div>
          
          <h2 className="font-display text-2xl md:text-3xl text-endfieldText mb-4">
            ADD TO HOME SCREEN
          </h2>
          
          <p className="font-sans text-endfieldTextMuted mb-8 max-w-xl mx-auto">
            Install MRR Toolkit as a standalone app on your mobile device for quick access 
            without browser chrome. Works offline for critical features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EndfieldButton variant="primary" size="lg">
              // INSTALL_PWA
            </EndfieldButton>
            <Link href="/">
              <EndfieldButton variant="ghost" size="lg">
                // RETURN_HOME
              </EndfieldButton>
            </Link>
          </div>
          
          <p className="font-mono text-xs text-endfieldTextMuted mt-6">
            Requires browser with PWA support (Chrome, Safari, Edge)
          </p>
        </div>
      </section>

      {/* Soft Paywall Modal */}
      <SoftPaywallModal
        isOpen={showModal}
        onClose={handleBypass}
        onDonate={handleDonate}
        toolName={selectedTool?.title}
      />
    </main>
  );
}
