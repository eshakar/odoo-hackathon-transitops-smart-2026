'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

interface AddDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDriverAdded: () => void;
}

export const AddDriverModal: React.FC<AddDriverModalProps> = ({ isOpen, onClose, onDriverAdded }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    licenseCategory: 'LMV',
    licenseExpiryDate: '',
    contactNumber: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Ensure date is in ISO format
      const formattedData = {
        ...formData,
        licenseExpiryDate: new Date(formData.licenseExpiryDate).toISOString(),
      };

      await axios.post('http://localhost:3001/drivers', formattedData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      
      onDriverAdded();
      onClose();
    } catch (err: any) {
      let errorMessage = 'Failed to add driver.';
      if (err.response?.data?.message) {
        if (Array.isArray(err.response.data.message)) {
          errorMessage = err.response.data.message.join('\n');
        } else if (typeof err.response.data.message === 'string') {
          errorMessage = err.response.data.message;
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1A1C23] border border-[#2C2E3B] rounded-xl shadow-2xl p-8 w-full max-w-lg relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Add New Driver</h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 whitespace-pre-line text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1 uppercase tracking-wider">Driver Name</label>
            <input 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#252836] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:border-[#FF8A00] focus:outline-none focus:ring-1 focus:ring-[#FF8A00] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1 uppercase tracking-wider">License No.</label>
              <input 
                name="licenseNumber"
                required
                value={formData.licenseNumber}
                onChange={handleChange}
                className="w-full bg-[#252836] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:border-[#FF8A00] focus:outline-none focus:ring-1 focus:ring-[#FF8A00] transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1 uppercase tracking-wider">Category</label>
              <select 
                name="licenseCategory"
                required
                value={formData.licenseCategory}
                onChange={handleChange}
                className="w-full bg-[#252836] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:border-[#FF8A00] focus:outline-none focus:ring-1 focus:ring-[#FF8A00] transition-colors"
              >
                <option value="LMV">LMV</option>
                <option value="HMV">HMV</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1 uppercase tracking-wider">Expiry Date</label>
              <input 
                type="date"
                name="licenseExpiryDate"
                required
                value={formData.licenseExpiryDate}
                onChange={handleChange}
                className="w-full bg-[#252836] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:border-[#FF8A00] focus:outline-none focus:ring-1 focus:ring-[#FF8A00] transition-colors"
                style={{ colorScheme: 'dark' }}
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1 uppercase tracking-wider">Contact</label>
              <input 
                name="contactNumber"
                required
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full bg-[#252836] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:border-[#FF8A00] focus:outline-none focus:ring-1 focus:ring-[#FF8A00] transition-colors"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#2C2E3B] transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-6 py-2 rounded-lg bg-[#FF8A00] text-black font-semibold hover:bg-orange-500 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add Driver'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
