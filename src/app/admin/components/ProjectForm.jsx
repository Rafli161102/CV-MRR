'use client';

import { useState } from 'react';

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
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        {project ? 'Edit Project' : 'Add New Project'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project ID *
          </label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            disabled={!!project}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:bg-gray-600"
            placeholder="e.g., logo-best"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            placeholder="Project title"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="Company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="e.g., Brand Identity"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            placeholder="Project description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Main Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Additional Images
          </label>
          <button
            type="button"
            onClick={addImageUrl}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition duration-200 mb-2"
          >
            + Add Image URL
          </button>

          {formData.images && formData.images.length > 0 && (
            <div className="space-y-2">
              {formData.images.map((img, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-gray-700 p-2 rounded"
                >
                  <span className="text-gray-300 text-sm truncate">{img}</span>
                  <button
                    type="button"
                    onClick={() => removeImageUrl(idx)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
          >
            Save Project
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
