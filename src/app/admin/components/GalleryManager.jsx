'use client';

import { useState, useEffect } from 'react';

export default function GalleryManager({ token }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    url: '',
    title: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/cms/photo-gallery');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError('Failed to load gallery');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedItem(null);
    setFormData({ url: '', title: '' });
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
      const response = await fetch(`/api/cms/photo-gallery?id=${id}`, {
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
    if (!formData.url || !formData.title) {
      setError('Please fill all required fields');
      return;
    }

    try {
      const method = selectedItem ? 'PUT' : 'POST';
      const response = await fetch('/api/cms/photo-gallery', {
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
        <h2 className="text-2xl font-bold text-white">Photo Gallery</h2>
        <button
          onClick={handleAddNew}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200"
        >
          + Add Photo
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            {selectedItem ? 'Edit Photo' : 'Add Photo'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Photo Title
              </label>
              <input
                type="text"
                placeholder="Photo title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            {formData.url && (
              <div className="relative w-full h-32 bg-gray-700 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
            >
              <div className="aspect-video bg-gray-700 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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
  );
}
