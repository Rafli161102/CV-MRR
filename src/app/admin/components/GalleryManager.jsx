'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  AlertCircle, 
  Loader2,
  Camera,
  Image as ImageIcon,
  Link as LinkIcon
} from 'lucide-react';

export default function GalleryManager({ token, previewOpen, setPreviewOpen }) {
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
        await fetchItems();
        if (window.innerWidth < 1024 && setPreviewOpen) {
          setPreviewOpen(true);
        }
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
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1">
            Total: {items.length} photos
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 
                   bg-gradient-to-r from-amber-500/20 to-orange-500/20
                   hover:from-amber-500/30 hover:to-orange-500/30
                   border border-amber-500/30 text-amber-400 
                   rounded-xl transition-all duration-300 font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Photo
        </button>
      </div>

      {showForm && (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-400" />
            {selectedItem ? 'Edit Photo' : 'Add Photo'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <LinkIcon className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white
                         placeholder:text-white/30 focus:border-amber-500/50 focus:outline-none transition-colors"
              />
            </div>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder="Photo title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white
                         placeholder:text-white/30 focus:border-amber-500/50 focus:outline-none transition-colors"
              />
            </div>
            {formData.url && (
              <div className="relative w-full h-40 bg-white/5 rounded-xl overflow-hidden border border-white/10">
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
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 
                         bg-amber-500 hover:bg-amber-400 text-white rounded-xl 
                         transition-all duration-200 font-medium"
              >
                <Plus className="w-4 h-4" />
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10
                         text-white/70 hover:text-white rounded-xl transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-white/40">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading gallery...
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden 
                       hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="aspect-video bg-white/5 relative overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 items-center justify-center hidden">
                  <ImageIcon className="w-12 h-12 text-white/20" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-white mb-4 truncate">
                  {item.title}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 
                             bg-white/5 hover:bg-white/10 border border-white/10
                             text-white/80 hover:text-white rounded-xl 
                             transition-all duration-200 text-sm font-medium"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center justify-center px-4 py-2.5 
                             bg-red-500/10 hover:bg-red-500/20 
                             border border-red-500/20 hover:border-red-500/30
                             text-red-400 hover:text-red-300 rounded-xl transition-all duration-200"
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
  );
}
