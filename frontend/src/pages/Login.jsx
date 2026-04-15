import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Mail, Lock } from 'lucide-react';
import API_URL from '../api';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Allow user to use email or username to login. Backend accepts email inside login.
      // However the backend might expect specific fields. For now sending both as email and checking.
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        identifier: formData.identifier,
        password: formData.password
      });

      if (res.data.token) {
        onLogin(res.data.token);
        navigate('/plan-trip');
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to connect to backend right now");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in mt-16">
      <div className="glass-card p-8 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/30 blur-[50px] rounded-full pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Log in to track your upcoming adventures</p>
        </div>

        {error && (
          <div className="bg-danger/10 border border-danger/50 text-danger px-4 py-3 rounded-lg mb-6 text-sm relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Email or Username"
              className="input-field pl-12"
              value={formData.identifier}
              onChange={(e) => setFormData({...formData, identifier: e.target.value})}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="input-field pl-12"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full btn-primary mt-6 !py-4 text-lg"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                Logging in...
              </span>
            ) : "Log In Targeting Adventure"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400 relative z-10">
          Don't have an account? <Link to="/register" className="text-primary hover:text-white transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
