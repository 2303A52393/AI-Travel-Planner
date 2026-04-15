import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plane, Wallet, CalendarDays, Compass, Loader2, Search, MapPin, Check, X } from 'lucide-react';
import API_URL from '../api';
import destinationsData from '../data/india_destinations.json';

export default function PlanTrip({ setTripData }) {
  const [formData, setFormData] = useState({ destination: '', budget: '', days: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const destinations = destinationsData.india_destinations;

  useEffect(() => {
    // Filter destinations based on search term
    if (searchTerm.trim() === '') {
      setFilteredDestinations(destinations.slice(0, 10)); // Show popular first
    } else {
      const filtered = destinations.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDestinations(filtered);
    }
  }, [searchTerm, destinations]);

  useEffect(() => {
    // Handle clicking outside to close dropdown
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectDestination = (dest) => {
    setFormData({ ...formData, destination: dest.name });
    setSearchTerm(dest.name);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/api/trips/plan-trip`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.data && res.data.success) {
        setTripData(res.data.data);
        navigate('/result');
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error generating plan. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 animate-slide-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-4 pb-1">
          Design Your Dream Trip
        </h1>
        <p className="text-xl text-gray-400">Our AI will craft the perfect itinerary optimized for your budget.</p>
      </div>

      <div className="glass-card p-10 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none"></div>

        {error && (
          <div className="bg-danger/10 border border-danger/50 text-danger px-4 py-3 rounded-lg mb-8 relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          
          <div className="group relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-primary transition-colors">
              Where do you want to go in India?
            </label>
            <div className="relative">
              <Compass className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                required
                placeholder="Search destination, state or type..."
                className="input-field pl-14 py-4 text-lg"
                value={searchTerm}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setFormData({ ...formData, destination: e.target.value });
                  setShowDropdown(true);
                }}
              />
              {searchTerm && (
                <button 
                  type="button"
                  onClick={() => { setSearchTerm(''); setShowDropdown(false); setFormData({...formData, destination: ''})}}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Destination Dropdown */}
            {showDropdown && (
              <div className="absolute z-50 w-full mt-2 glass-card border border-white/20 max-h-64 overflow-y-auto animate-fade-in shadow-2xl no-scrollbar">
                {filteredDestinations.length > 0 ? (
                  <div className="p-2 space-y-1">
                    {filteredDestinations.map((dest, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleSelectDestination(dest)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-colors group/item"
                      >
                        <div className="mt-1">
                          {dest.type === 'temple' ? <Check className="w-4 h-4 text-secondary" /> : <MapPin className="w-4 h-4 text-primary" />}
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover/item:text-primary transition-colors capitalize">{dest.name}</div>
                          <div className="text-xs text-gray-400">{dest.state} • <span className="text-accent/80 italic">{dest.type}</span></div>
                          <div className="text-[10px] text-gray-500 mt-1 line-clamp-1">{dest.famous_for}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-400">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    <p>No destinations found for "{searchTerm}"</p>
                    <p className="text-xs mt-1 italic">Try searching for a state or city name</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-primary transition-colors">
                Total Budget (₹ INR)
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-gray-500 group-focus-within:text-primary text-lg">₹</span>
                <input
                  type="number"
                  required
                  min="1000"
                  step="500"
                  placeholder="e.g. 15000"
                  className="input-field pl-12 py-4 text-lg"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-primary transition-colors">
                Number of Days
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input
                  type="number"
                  required
                  min="1"
                  max="14"
                  placeholder="e.g. 5"
                  className="input-field pl-14 py-4 text-lg"
                  value={formData.days}
                  onChange={(e) => setFormData({...formData, days: e.target.value})}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full btn-primary !py-5 text-xl font-bold flex justify-center items-center gap-3 overflow-hidden relative group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Crafting Map & Itinerary...</span>
              </>
            ) : (
              <>
                <Plane className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                <span>Generate Smart Plan</span>
              </>
            )}
            
            {/* Shimmer effect */}
            {!isLoading && (
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            )}
          </button>

        </form>
      </div>

      <style jsx="true">{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
