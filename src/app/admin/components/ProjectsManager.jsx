'use client';

import { useState, useEffect } from 'react';
import ProjectForm from './ProjectForm';

export default function ProjectsManager({ token }) {
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
        fetchProjects();
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
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!showForm ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
            <button
              onClick={handleAddNew}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200"
            >
              + Add Project
            </button>
          </div>

          {isLoading ? (
            <div className="text-gray-400">Loading projects...</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
                >
                  <div className="aspect-video bg-gray-700 relative">
                    {project.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {project.company}
                    </p>
                    <p className="text-blue-400 text-xs mb-4">
                      {project.category}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition duration-200 text-sm"
                      >
                        Delete
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
