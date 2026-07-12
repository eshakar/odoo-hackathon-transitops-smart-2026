'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExpenseAdded: () => void;
}

export const AddExpenseModal = ({ isOpen, onClose, onExpenseAdded }: AddExpenseModalProps) => {
  const { user } = useAuth();
  
  const [vehicles, setVehicles] = useState([]);
  const [trips, setTrips] = useState([]);
  
  const [formData, setFormData] = useState({
    vehicleId: '',
    tripId: '',
    amount: '',
    category: 'TOLL',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      axios.get('http://localhost:3001/vehicles', {
        headers: { Authorization: `Bearer ${user.token}` },
      }).then(res => setVehicles(res.data)).catch(console.error);

      axios.get('http://localhost:3001/trips', {
        headers: { Authorization: `Bearer ${user.token}` },
      }).then(res => setTrips(res.data)).catch(console.error);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post('http://localhost:3001/finances/expenses', {
        vehicleId: formData.vehicleId || undefined,
        tripId: formData.tripId || undefined,
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: new Date(formData.date).toISOString(),
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      onExpenseAdded();
      onClose();
      setFormData({ vehicleId: '', tripId: '', amount: '', category: 'TOLL', description: '', date: new Date().toISOString().split('T')[0] });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add expense');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[#1A1C23] border border-[#2C2E3B] rounded-xl w-full max-w-md p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold tracking-widest text-white mb-6">Add Expense</h2>
        
        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm font-sans">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs tracking-wider uppercase mb-1">Vehicle (Optional)</label>
              <select 
                value={formData.vehicleId}
                onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                className="w-full bg-[#15171E] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#FF8A00]"
              >
                <option value="">None</option>
                {vehicles.map((v: any) => (
                  <option key={v.id} value={v.id}>{v.registrationNumber}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs tracking-wider uppercase mb-1">Trip (Optional)</label>
              <select 
                value={formData.tripId}
                onChange={(e) => setFormData({ ...formData, tripId: e.target.value })}
                className="w-full bg-[#15171E] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#FF8A00]"
              >
                <option value="">None</option>
                {trips.map((t: any) => (
                  <option key={t.id} value={t.id}>TRIP-{t.id.substring(0,4).toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs tracking-wider uppercase mb-1">Category</label>
              <select 
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#15171E] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#FF8A00]"
              >
                <option value="TOLL">Toll</option>
                <option value="MAINTENANCE">Maintenance</option>
                <option value="OTHER">Other</option>
                <option value="FUEL">Fuel (Not Recommended)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs tracking-wider uppercase mb-1">Amount</label>
              <input 
                type="number"
                step="0.01"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full bg-[#15171E] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#FF8A00]"
                placeholder="150"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-xs tracking-wider uppercase mb-1">Description</label>
            <input 
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#15171E] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#FF8A00]"
              placeholder="e.g. Highway 41 toll"
            />
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
              className="bg-[#D35400] hover:bg-[#A04000] text-white font-semibold text-sm px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
