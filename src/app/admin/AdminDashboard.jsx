'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProjectsManager from './components/ProjectsManager';
import ExperienceManager from './components/ExperienceManager';
import EducationManager from './components/EducationManager';
import GalleryManager from './components/GalleryManager';

const TABS = [
  { id: 'projects', label: 'Projects', icon: '🎨' },
  { id: 'experience', label: 'Work Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'gallery', label: 'Photo Gallery', icon: '📸' }
];

export default function AdminDashboard({ token, onLogout }) {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">MRR CMS</h1>
            <p className="text-gray-400 text-sm">Content Management System</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/?edit=1"
              target="_blank"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition duration-200"
            >
              Open Visual Editor
            </Link>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium whitespace-nowrap transition duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'projects' && <ProjectsManager token={token} />}
        {activeTab === 'experience' && <ExperienceManager token={token} />}
        {activeTab === 'education' && <EducationManager token={token} />}
        {activeTab === 'gallery' && <GalleryManager token={token} />}
      </main>
    </div>
  );
}
