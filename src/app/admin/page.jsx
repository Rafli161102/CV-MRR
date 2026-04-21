'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if token exists in localStorage
    const savedToken = localStorage.getItem('cms_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      setShowLoginForm(false);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/cms/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      localStorage.setItem('cms_token', data.token);
      localStorage.setItem('cms_user', data.user.username);
      setToken(data.token);
      setIsAuthenticated(true);
      setShowLoginForm(false);
      setError('');
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
    setToken('');
    setIsAuthenticated(false);
    setShowLoginForm(true);
    setPassword('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (showLoginForm) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-lg shadow-2xl p-8">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">MRR CMS</h1>
            <p className="text-gray-400 text-center mb-8">Admin Dashboard</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="Enter password"
                />
              </div>

              {error && (
                <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
              >
                Login
              </button>
            </form>

            <p className="text-gray-400 text-sm text-center mt-6">
              Default credentials: admin / admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard token={token} onLogout={handleLogout} />;
}
