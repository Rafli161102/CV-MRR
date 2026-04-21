'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  AlertCircle, 
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import ProjectForm from './ProjectForm';

export default function ProjectsManager({ token, previewOpen, setPreviewOpen }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/cms/projects');
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedProject(null);
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/cms/projects?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch (err) {
      setError('Failed to delete project');
      console.error(err);
    }
  };

  const handleSave = async (projectData) => {
    try {
      const method = selectedProject ? 'PUT' : 'POST';
      const response = await fetch('/api/cms/projects', {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        setShowForm(false);
        setSelectedProject(null);
        await fetchProjects();
        // Auto-open preview on mobile after save
        if (window.innerWidth < 1024 && setPreviewOpen) {
          setPreviewOpen(true);
        }
      } else {
        const error = await response.json();
        setError(error.error || 'Failed to save project');
      }
    } catch (err) {
      setError('Failed to save project');
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      {!showForm ? (
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1">
                Total: {projects.length} projects
              </p>
            </div>
            <button
              onClick={handleAddNew}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 
                       bg-gradient-to-r from-cyan-500/20 to-violet-500/20
                       hover:from-cyan-500/30 hover:to-violet-500/30
                       border border-cyan-500/30 text-cyan-400 
                       rounded-xl transition-all duration-300 font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-white/40">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Loading projects...
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden 
                           hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className="aspect-video bg-white/5 relative overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`absolute inset-0 items-center justify-center ${project.image ? 'hidden' : 'flex'}`}>
                      <ImageIcon className="w-12 h-12 text-white/20" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-white mb-1 truncate">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-sm mb-1">
                      {project.company}
                    </p>
                    <p className="text-cyan-400/80 text-xs font-medium mb-4">
                      {project.category}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 
                                 bg-white/5 hover:bg-white/10 border border-white/10
                                 text-white/80 hover:text-white rounded-xl 
                                 transition-all duration-200 text-sm font-medium"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="flex items-center justify-center px-4 py-2.5 
                                 bg-red-500/10 hover:bg-red-500/20 
                                 border border-red-500/20 hover:border-red-500/30
                                 text-red-400 hover:text-red-300
                                 rounded-xl transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <ProjectForm
          project={selectedProject}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
}
