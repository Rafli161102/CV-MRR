'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  Palette, 
  Briefcase, 
  GraduationCap, 
  Camera, 
  ExternalLink, 
  LogOut, 
  Shield,
  LayoutGrid,
  Eye
} from 'lucide-react';
import ProjectsManager from './components/ProjectsManager';
import ExperienceManager from './components/ExperienceManager';
import EducationManager from './components/EducationManager';
import GalleryManager from './components/GalleryManager';

const TABS = [
  { id: 'projects', label: 'Projects', icon: Palette, color: 'cyan' },
  { id: 'experience', label: 'Work Experience', icon: Briefcase, color: 'violet' },
  { id: 'education', label: 'Education', icon: GraduationCap, color: 'emerald' },
  { id: 'gallery', label: 'Photo Gallery', icon: Camera, color: 'amber' }
];

const colorClasses = {
  cyan: {
    active: 'border-cyan-500 text-cyan-400 bg-cyan-500/5',
    hover: 'hover:text-cyan-300',
    icon: 'text-cyan-400'
  },
  violet: {
    active: 'border-violet-500 text-violet-400 bg-violet-500/5',
    hover: 'hover:text-violet-300',
    icon: 'text-violet-400'
  },
  emerald: {
    active: 'border-emerald-500 text-emerald-400 bg-emerald-500/5',
    hover: 'hover:text-emerald-300',
    icon: 'text-emerald-400'
  },
  amber: {
    active: 'border-amber-500 text-amber-400 bg-amber-500/5',
    hover: 'hover:text-amber-300',
    icon: 'text-amber-400'
  }
};

export default function AdminDashboard({ token, onLogout }) {
  const [activeTab, setActiveTab] = useState('projects');
  const [previewOpen, setPreviewOpen] = useState(false);

  const ActiveIcon = TABS.find(t => t.id === activeTab)?.icon || LayoutGrid;
  const activeColor = TABS.find(t => t.id === activeTab)?.color || 'cyan';

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col lg:flex-row">
      {/* Golden Ratio Sidebar - 38.2% width on desktop */}
      <aside className="lg:w-[38.2%] xl:w-[30%] lg:min-h-screen bg-white/[0.02] border-r border-white/10 
                       flex flex-col">
        {/* Header - Golden Ratio: 61.8% content */}
        <div className="p-6 lg:p-8 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 
                          border border-white/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MRR CMS</h1>
              <p className="text-white/40 text-xs">Content Management</p>
            </div>
          </div>
        </div>

        {/* Navigation - 38.2% visual */}
        <nav className="flex-1 p-4 lg:p-6 space-y-2 overflow-y-auto">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-4 px-2">
            Manage Content
          </p>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const colors = colorClasses[tab.color];
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl 
                           transition-all duration-300 group text-left
                           border-2 ${
                  isActive 
                    ? `${colors.active} border-b-2` 
                    : `border-transparent text-white/60 ${colors.hover} hover:bg-white/5`
                }`}
              >
                <Icon className={`w-5 h-5 transition-colors ${
                  isActive ? colors.icon : `text-white/40 group-hover:${colors.icon}`
                }`} />
                <span className="font-medium text-sm">{tab.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-current" />
                )}
              </button>
            );
          })}

          <div className="my-6 border-t border-white/5" />

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-4 px-2">
            Quick Actions
          </p>

          <Link
            href="/?edit=1"
            target="_blank"
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl 
                     bg-gradient-to-r from-cyan-500/10 to-violet-500/10
                     border border-cyan-500/20 text-cyan-400
                     hover:border-cyan-500/40 hover:from-cyan-500/20 hover:to-violet-500/20
                     transition-all duration-300 group"
          >
            <ExternalLink className="w-5 h-5" />
            <span className="font-medium text-sm">Open Visual Editor</span>
          </Link>

          <button
            onClick={() => setPreviewOpen(!previewOpen)}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl 
                     bg-white/5 border border-white/10 text-white/70
                     hover:bg-white/10 hover:text-white
                     transition-all duration-300 lg:hidden"
          >
            <Eye className="w-5 h-5" />
            <span className="font-medium text-sm">
              {previewOpen ? 'Hide Preview' : 'Show Preview'}
            </span>
          </button>
        </nav>

        {/* Footer - 23.6% of sidebar */}
        <div className="p-4 lg:p-6 border-t border-white/10 bg-white/[0.01]">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl 
                     bg-red-500/10 border border-red-500/20 text-red-400
                     hover:bg-red-500/20 hover:border-red-500/30
                     transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area - Golden Ratio: 61.8% */}
      <main className="flex-1 flex flex-col min-h-0">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ActiveIcon className={`w-5 h-5 ${colorClasses[activeColor].icon}`} />
            <span className="text-white font-medium">
              {TABS.find(t => t.id === activeTab)?.label}
            </span>
          </div>
          <button
            onClick={() => setPreviewOpen(!previewOpen)}
            className="p-2 rounded-lg bg-white/5 text-white/60"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Golden Ratio proportions */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Editor Panel - 61.8% */}
          <div className={`flex-1 overflow-y-auto ${previewOpen ? 'hidden lg:block' : ''}`}>
            <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
              {/* Section Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <ActiveIcon className={`w-5 h-5 ${colorClasses[activeColor].icon}`} />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Managing
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {TABS.find(t => t.id === activeTab)?.label}
                </h2>
                <p className="text-white/50 mt-2 text-sm">
                  Edit and manage your {activeTab} content with real-time preview
                </p>
              </div>

              {/* Active Manager */}
              <div className="space-y-6">
                {activeTab === 'projects' && <ProjectsManager token={token} previewOpen={previewOpen} setPreviewOpen={setPreviewOpen} />}
                {activeTab === 'experience' && <ExperienceManager token={token} previewOpen={previewOpen} setPreviewOpen={setPreviewOpen} />}
                {activeTab === 'education' && <EducationManager token={token} previewOpen={previewOpen} setPreviewOpen={setPreviewOpen} />}
                {activeTab === 'gallery' && <GalleryManager token={token} previewOpen={previewOpen} setPreviewOpen={setPreviewOpen} />}
              </div>
            </div>
          </div>

          {/* Live Preview Panel - 38.2% */}
          <div className={`lg:w-[38.2%] xl:w-[35%] bg-black/20 border-l border-white/10 
                         flex flex-col ${previewOpen ? 'fixed inset-0 z-50 lg:static' : 'hidden lg:flex'}`}>
            {/* Preview Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">Live Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-white/40">Synced</span>
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="lg:hidden p-2 rounded-lg bg-white/5 text-white/60"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto">
              <iframe
                src="/?preview=1"
                className="w-full h-full min-h-[500px] lg:min-h-0"
                title="Live Preview"
                sandbox="allow-same-origin allow-scripts"
              />
            </div>

            {/* Preview Footer */}
            <div className="p-3 border-t border-white/10 bg-white/[0.02] text-center">
              <p className="text-[10px] text-white/30">
                Updates sync automatically to preview
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
