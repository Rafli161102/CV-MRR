'use client';

import { useState } from 'react';
import { 
  Plus, 
  Save, 
  X, 
  AlertCircle,
  FolderOpen,
  Building2,
  Tag,
  FileText,
  Image as ImageIcon,
  Trash2,
  Link as LinkIcon
} from 'lucide-react';

export default function ProjectForm({ project, onSave, onCancel }) {
  const [formData, setFormData] = useState(project || {
    id: `project-${Date.now()}`,
    title: '',
    company: '',
    category: '',
    description: '',
    image: '',
    images: []
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.id || !formData.title) {
      setError('ID and Title are required');
      return;
    }

    onSave(formData);
  };

  const addImageUrl = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), url]
      }));
    }
  };

  const removeImageUrl = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <FolderOpen className="w-5 h-5 text-cyan-400" />
        {project ? 'Edit Project' : 'Add New Project'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <div className="relative">
          <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-2">
            Project ID *
          </label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            disabled={!!project}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                     placeholder:text-white/30 focus:border-cyan-500/50 focus:outline-none transition-colors
                     disabled:opacity-50"
            placeholder="e.g., logo-best"
          />
        </div>

        <div className="relative">
          <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                     placeholder:text-white/30 focus:border-cyan-500/50 focus:outline-none transition-colors"
            placeholder="Project title"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-2">
              Company
            </label>
            <div className="relative">
              <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                         placeholder:text-white/30 focus:border-cyan-500/50 focus:outline-none transition-colors"
                placeholder="Company name"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-2">
              Category
            </label>
            <div className="relative">
              <Tag className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                         placeholder:text-white/30 focus:border-cyan-500/50 focus:outline-none transition-colors"
                placeholder="e.g., Brand Identity"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-2">
            Description
          </label>
          <div className="relative">
            <FileText className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                       placeholder:text-white/30 focus:border-cyan-500/50 focus:outline-none transition-colors resize-none"
              placeholder="Project description"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-2">
            Main Image URL
          </label>
          <div className="relative">
            <ImageIcon className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                       placeholder:text-white/30 focus:border-cyan-500/50 focus:outline-none transition-colors"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-2">
            Additional Images
          </label>
          <button
            type="button"
            onClick={addImageUrl}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 
                     bg-white/5 hover:bg-white/10 border border-white/10 border-dashed
                     text-white/60 hover:text-white rounded-xl transition-all duration-200 mb-3"
          >
            <Plus className="w-4 h-4" />
            Add Image URL
          </button>

          {formData.images && formData.images.length > 0 && (
            <div className="space-y-2">
              {formData.images.map((img, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white/5 border border-white/10 p-3 rounded-xl"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <LinkIcon className="w-4 h-4 text-white/30 shrink-0" />
                    <span className="text-white/70 text-sm truncate">{img}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImageUrl(idx)}
                    className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-6">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 
                     bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl 
                     transition-all duration-200 font-medium"
          >
            <Save className="w-4 h-4" />
            Save Project
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 
                     bg-white/5 hover:bg-white/10 border border-white/10
                     text-white/70 hover:text-white rounded-xl transition-all duration-200"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
