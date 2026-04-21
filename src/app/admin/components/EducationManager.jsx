'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  AlertCircle, 
  Loader2,
  Calendar,
  GraduationCap,
  School
} from 'lucide-react';

export default function EducationManager({ token, previewOpen, setPreviewOpen }) {
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
            Total: {items.length} entries
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 
                   bg-gradient-to-r from-emerald-500/20 to-teal-500/20
                   hover:from-emerald-500/30 hover:to-teal-500/30
                   border border-emerald-500/30 text-emerald-400 
                   rounded-xl transition-all duration-300 font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {showForm && (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            {selectedItem ? 'Edit Education' : 'Add Education'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder="Year/Period (e.g., Sep 2022 - Jan 2024)"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white
                         placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none transition-colors"
              />
            </div>
            <div className="relative">
              <GraduationCap className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder="Degree/Course"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white
                         placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none transition-colors"
              />
            </div>
            <div className="relative">
              <School className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder="Institution"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white
                         placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none transition-colors"
              />
            </div>
            <textarea
              placeholder="Description"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white
                       placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none transition-colors resize-none"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 
                         bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl 
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
          Loading education...
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5 
                       hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.year}
                  </div>
                  <h3 className="font-semibold text-white text-lg">{item.degree}</h3>
                  <p className="text-emerald-400/80 text-sm font-medium flex items-center gap-1.5 mt-1">
                    <School className="w-3.5 h-3.5" />
                    {item.institution}
                  </p>
                  <p className="text-white/60 mt-3 text-sm leading-relaxed">{item.description}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 
                             border border-white/10 text-white/80 hover:text-white rounded-xl 
                             transition-all duration-200 text-sm font-medium"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center justify-center px-4 py-2 
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
