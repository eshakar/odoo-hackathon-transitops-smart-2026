'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

interface AddFuelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFuelAdded: () => void;
}

export const AddFuelModal = ({ isOpen, onClose, onFuelAdded }: AddFuelModalProps) => {
  const { user } = useAuth();
  
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    vehicleId: '',
    liters: '',
    cost: '',
    date: new Date().toISOString().split('T')[0],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      axios.get('http://localhost:3001/vehicles', {
        headers: { Authorization: `Bearer ${user.token}` },
      }).then(res => setVehicles(res.data))
        .catch(err => console.error('Failed to fetch vehicles', err));
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post('http://localhost:3001/finances/fuel', {
        vehicleId: formData.vehicleId,
        liters: parseFloat(formData.liters),
        cost: parseFloat(formData.cost),
        date: new Date(formData.date).toISOString(),
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      onFuelAdded();
      onClose();
      setFormData({ vehicleId: '', liters: '', cost: '', date: new Date().toISOString().split('T')[0] });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add fuel log');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[#1A1C23] border border-[#2C2E3B] rounded-xl w-full max-w-md p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold tracking-widest text-white mb-6">Log Fuel</h2>
        
        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm font-sans">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          
          <div>
            <label className="block text-gray-400 text-xs tracking-wider uppercase mb-1">Vehicle</label>
            <select 
              required
              value={formData.vehicleId}
              onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
              className="w-full bg-[#15171E] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#FF8A00]"
            >
              <option value="" disabled>Select Vehicle</option>
              {vehicles.map((v: any) => (
                <option key={v.id} value={v.id}>{v.registrationNumber} ({v.type})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs tracking-wider uppercase mb-1">Liters</label>
              <input 
                type="number"
                step="0.1"
                required
                value={formData.liters}
                onChange={(e) => setFormData({ ...formData, liters: e.target.value })}
                className="w-full bg-[#15171E] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#FF8A00]"
                placeholder="40.5"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs tracking-wider uppercase mb-1">Cost</label>
              <input 
                type="number"
                step="0.01"
                required
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                className="w-full bg-[#15171E] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#FF8A00]"
                placeholder="3000"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-xs tracking-wider uppercase mb-1">Date</label>
            <input 
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-[#15171E] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#FF8A00]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#FF8A00] hover:bg-[#E67A00] text-black font-semibold text-sm px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Log'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
