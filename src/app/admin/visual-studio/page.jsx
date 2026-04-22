/**
 * ============================================================================
 * Visual Studio - God-Mode CMS Dashboard
 * ============================================================================
 * Dashboard admin dengan antarmuka Sci-Fi Industrial.
 * Panel kiri: Data Editor untuk OwnerProfile.
 * Panel kanan: Theme Controller dengan CustomColorPicker.
 * ============================================================================
 */

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { EndfieldCard, EndfieldButton, GlitchText } from '@/components/ui';
import CustomColorPicker from '@/components/visual-editor/CustomColorPicker';

export default function VisualStudio() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  
  // Data states
  const [ownerData, setOwnerData] = useState({
    name: 'MUHAMMAD RAFLI RAMADHAN',
    title: 'SYSTEM ARCHITECT: VISUAL & COMMUNITY',
    bio: '',
    designArsenal: [],
    communityArsenal: [],
    careerHistory: [],
  });
  
  const [accentColor, setAccentColor] = useState('#ff4500');
  const [newCareer, setNewCareer] = useState({
    company: '',
    role: '',
    period: '',
    type: 'FULLTIME',
    description: '',
    isCurrent: false,
  });
  
  // Check auth
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);
  
  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/cms');
        const result = await response.json();
        
        if (result.success) {
          if (result.data.ownerProfile) {
            setOwnerData(result.data.ownerProfile);
          }
          if (result.data.siteConfig?.themeVars?.accent) {
            setAccentColor(result.data.siteConfig.themeVars.accent);
          }
        }
      } catch (error) {
        console.error('Failed to fetch CMS data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (status === 'authenticated') {
      fetchData();
    }
  }, [status]);
  
  // Handle deploy changes
  const handleDeploy = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
      const response = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerProfile: ownerData,
          siteConfig: {
            themeVars: {
              accent: accentColor,
              accentHover: accentColor,
            }
          }
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSaveStatus({ type: 'success', message: 'DEPLOYMENT SUCCESSFUL' });
        
        // Update CSS variable in real-time
        document.documentElement.style.setProperty('--color-accent', accentColor);
      } else {
        setSaveStatus({ type: 'error', message: result.error || 'DEPLOYMENT FAILED' });
      }
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'CONNECTION ERROR' });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Add career item
  const addCareer = () => {
    if (!newCareer.company || !newCareer.role) return;
    
    setOwnerData(prev => ({
      ...prev,
      careerHistory: [...(prev.careerHistory || []), { ...newCareer, id: Date.now() }]
    }));
    
    setNewCareer({
      company: '',
      role: '',
      period: '',
      type: 'FULLTIME',
      description: '',
      isCurrent: false,
    });
  };
  
  // Remove career item
  const removeCareer = (id) => {
    setOwnerData(prev => ({
      ...prev,
      careerHistory: prev.careerHistory.filter(job => job.id !== id)
    }));
  };
  
  // Handle color change
  const handleColorChange = (hexColor) => {
    setAccentColor(hexColor);
    // Real-time preview
    document.documentElement.style.setProperty('--color-accent', hexColor);
    document.documentElement.style.setProperty('--color-accent-glow', `${hexColor}66`);
  };
  
  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-endfieldBg flex items-center justify-center">
        <div className="font-mono text-endfieldAccent animate-pulse">
          // LOADING_VISUAL_STUDIO...
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-endfieldBg text-endfieldText">
      {/* Header */}
      <header className="border-b border-endfieldBorder bg-endfieldSurface px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <GlitchText 
              text="VISUAL_STUDIO" 
              className="text-2xl font-display font-bold"
            />
            <p className="font-mono text-xs text-endfieldTextMuted mt-1">
              // GOD_MODE_CMS // SESSION: {session?.user?.name?.toUpperCase()}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-endfieldAccent">
              SYSTEM: ONLINE
            </span>
            <div className="w-2 h-2 bg-endfieldAccent animate-pulse" />
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Bar */}
        {saveStatus && (
          <div className={`
            mb-6 px-4 py-3 font-mono text-sm border
            ${saveStatus.type === 'success' 
              ? 'bg-endfieldSuccess/10 border-endfieldSuccess text-endfieldSuccess' 
              : 'bg-endfieldError/10 border-endfieldError text-endfieldError'}
          `}>
            {saveStatus.type === 'success' ? '✓' : '✗'} {saveStatus.message}
          </div>
        )}
        
        {/* Two Panel Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* LEFT PANEL - Data Editor */}
          <div>
            <div className="mb-4">
              <span className="font-mono text-xs text-endfieldAccent tracking-widest">
                // DATA_EDITOR_PANEL
              </span>
            </div>
            
            {/* Hero Section Form */}
            <EndfieldCard className="mb-6">
              <h3 className="font-mono text-sm text-endfieldAccent mb-4 tracking-wider">
                // HERO_CONFIGURATION
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-endfieldTextMuted mb-2">
                    DISPLAY_NAME
                  </label>
                  <input
                    type="text"
                    value={ownerData.name}
                    onChange={(e) => setOwnerData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-endfieldSurface border border-endfieldBorder px-3 py-2 font-mono text-sm text-endfieldText focus:border-endfieldAccent focus:outline-none clip-beveled-sm"
                  />
                </div>
                
                <div>
                  <label className="block font-mono text-xs text-endfieldTextMuted mb-2">
                    SYSTEM_TITLE
                  </label>
                  <input
                    type="text"
                    value={ownerData.title}
                    onChange={(e) => setOwnerData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-endfieldSurface border border-endfieldBorder px-3 py-2 font-mono text-sm text-endfieldText focus:border-endfieldAccent focus:outline-none clip-beveled-sm"
                  />
                </div>
              </div>
            </EndfieldCard>
            
            {/* Bio Form */}
            <EndfieldCard className="mb-6">
              <h3 className="font-mono text-sm text-endfieldAccent mb-4 tracking-wider">
                // BIOGRAPHY_LOG
              </h3>
              
              <textarea
                value={ownerData.bio}
                onChange={(e) => setOwnerData(prev => ({ ...prev, bio: e.target.value }))}
                rows={6}
                className="w-full bg-endfieldSurface border border-endfieldBorder px-3 py-2 font-sans text-sm text-endfieldText focus:border-endfieldAccent focus:outline-none resize-none"
                placeholder="Enter biography content..."
              />
            </EndfieldCard>
            
            {/* Career History Form */}
            <EndfieldCard>
              <h3 className="font-mono text-sm text-endfieldAccent mb-4 tracking-wider">
                // OPERATION_HISTORY
              </h3>
              
              {/* Existing Careers */}
              <div className="space-y-3 mb-6">
                {ownerData.careerHistory?.map((job) => (
                  <div 
                    key={job.id} 
                    className="flex justify-between items-start p-3 bg-endfieldSurface border border-endfieldBorder"
                  >
                    <div>
                      <div className="font-mono text-sm text-endfieldText">{job.company}</div>
                      <div className="font-mono text-xs text-endfieldAccent">{job.role}</div>
                      <div className="font-mono text-xs text-endfieldTextMuted">{job.period}</div>
                    </div>
                    <button
                      onClick={() => removeCareer(job.id)}
                      className="font-mono text-xs text-endfieldError hover:text-endfieldError/80"
                    >
                      [REMOVE]
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Add New Career */}
              <div className="border-t border-endfieldBorder pt-4">
                <div className="font-mono text-xs text-endfieldTextMuted mb-3">
                  // ADD_NEW_OPERATION
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="COMPANY_NAME"
                    value={newCareer.company}
                    onChange={(e) => setNewCareer(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full bg-endfieldSurface border border-endfieldBorder px-3 py-2 font-mono text-xs text-endfieldText focus:border-endfieldAccent focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="ROLE_POSITION"
                    value={newCareer.role}
                    onChange={(e) => setNewCareer(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full bg-endfieldSurface border border-endfieldBorder px-3 py-2 font-mono text-xs text-endfieldText focus:border-endfieldAccent focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="PERIOD (e.g., 2023 - PRESENT)"
                    value={newCareer.period}
                    onChange={(e) => setNewCareer(prev => ({ ...prev, period: e.target.value }))}
                    className="w-full bg-endfieldSurface border border-endfieldBorder px-3 py-2 font-mono text-xs text-endfieldText focus:border-endfieldAccent focus:outline-none"
                  />
                  <textarea
                    placeholder="DESCRIPTION"
                    value={newCareer.description}
                    onChange={(e) => setNewCareer(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                    className="w-full bg-endfieldSurface border border-endfieldBorder px-3 py-2 font-sans text-xs text-endfieldText focus:border-endfieldAccent focus:outline-none resize-none"
                  />
                  <EndfieldButton 
                    variant="secondary" 
                    size="sm" 
                    onClick={addCareer}
                    className="w-full"
                  >
                    // ADD_OPERATION
                  </EndfieldButton>
                </div>
              </div>
            </EndfieldCard>
          </div>
          
          {/* RIGHT PANEL - Theme Controller */}
          <div>
            <div className="mb-4">
              <span className="font-mono text-xs text-endfieldAccent tracking-widest">
                // THEME_CONTROLLER_PANEL
              </span>
            </div>
            
            {/* Color Picker */}
            <CustomColorPicker
              initialColor={accentColor}
              onColorChange={handleColorChange}
              className="mb-6"
            />
            
            {/* Preview Panel */}
            <EndfieldCard>
              <h3 className="font-mono text-sm text-endfieldAccent mb-4 tracking-wider">
                // LIVE_PREVIEW
              </h3>
              
              <div className="space-y-4">
                {/* Accent Preview */}
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 border border-endfieldBorder"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div>
                    <div className="font-mono text-xs text-endfieldTextMuted">ACCENT_COLOR</div>
                    <div className="font-mono text-sm text-endfieldText">{accentColor.toUpperCase()}</div>
                  </div>
                </div>
                
                {/* Component Previews */}
                <div className="border-t border-endfieldBorder pt-4 space-y-3">
                  <div className="font-mono text-xs text-endfieldTextMuted mb-2">
                    COMPONENT_PREVIEW
                  </div>
                  
                  {/* Button Preview */}
                  <div className="flex gap-2">
                    <button 
                      className="px-4 py-2 border font-mono text-xs uppercase tracking-wider transition-all"
                      style={{ 
                        borderColor: accentColor,
                        color: accentColor,
                        backgroundColor: 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = accentColor;
                        e.target.style.color = '#050505';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = accentColor;
                      }}
                    >
                      BUTTON
                    </button>
                  </div>
                  
                  {/* Text Preview */}
                  <div 
                    className="font-display text-lg"
                    style={{ color: accentColor }}
                  >
                    GLITCH_TEXT_EFFECT
                  </div>
                  
                  {/* Border Preview */}
                  <div 
                    className="p-3 border"
                    style={{ borderColor: accentColor }}
                  >
                    <span className="font-mono text-xs" style={{ color: accentColor }}>
                      HUD_PANEL_BORDER
                    </span>
                  </div>
                </div>
              </div>
            </EndfieldCard>
            
            {/* Deploy Button */}
            <div className="mt-8">
              <EndfieldButton
                variant="primary"
                size="lg"
                onClick={handleDeploy}
                disabled={isSaving}
                className="w-full"
              >
                {isSaving ? '// DEPLOYING...' : '// DEPLOY_CHANGES'}
              </EndfieldButton>
              
              <p className="font-mono text-xs text-endfieldTextMuted mt-3 text-center">
                This will update OwnerProfile and SiteConfig in MongoDB
              </p>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
