'use client';

import { useState, useEffect } from 'react';

export default function EducationManager({ token }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    year: '',
    degree: '',
    institution: '',
    description: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/cms/education');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError('Failed to load education');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedItem(null);
    setFormData({ year: '', degree: '', institution: '', description: '' });
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      const response = await fetch(`/api/cms/education?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        setItems(items.filter(i => i.id !== id));
      }
    } catch (err) {
      setError('Failed to delete');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.year || !formData.degree || !formData.institution) {
      setError('Please fill all required fields');
      return;
    }

    try {
      const method = selectedItem ? 'PUT' : 'POST';
      const response = await fetch('/api/cms/education', {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowForm(false);
        fetchItems();
      } else {
        const error = await response.json();
        setError(error.error || 'Failed to save');
      }
    } catch (err) {
      setError('Failed to save');
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

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Education</h2>
        <button
          onClick={handleAddNew}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200"
        >
          + Add Education
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            {selectedItem ? 'Edit Education' : 'Add Education'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Year/Period (e.g., Sep 2022 - Jan 2024)"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <input
              type="text"
              placeholder="Degree/Course"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <input
              type="text"
              placeholder="Institution"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <textarea
              placeholder="Description"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">{item.year}</p>
                  <h3 className="text-lg font-semibold text-white">{item.degree}</h3>
                  <p className="text-blue-400">{item.institution}</p>
                  <p className="text-gray-300 mt-2 text-sm">{item.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition duration-200 text-sm"
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
  );
}
