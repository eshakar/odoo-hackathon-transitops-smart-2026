'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    depotName: '',
    currency: '',
    distanceUnit: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) return;
    
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/settings', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          depotName: response.data.depotName,
          currency: response.data.currency,
          distanceUnit: response.data.distanceUnit,
        });
      } catch (err) {
        console.error('Failed to fetch settings', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    setMessage('');
    
    try {
      await axios.patch('http://localhost:3001/settings', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMessage('Settings saved successfully!');
    } catch (err) {
      console.error('Failed to save settings', err);
      setMessage('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full bg-[#0F111A] text-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
        
        {/* Left Column: General Settings Form */}
        <div>
          <h2 className="text-2xl font-handwriting tracking-widest uppercase mb-8 text-gray-300">
            General
          </h2>
          
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-gray-500 font-sans text-sm tracking-widest uppercase mb-2">
                Depot Name
              </label>
              <input 
                name="depotName"
                value={formData.depotName}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full bg-[#15171E] border border-[#2C2E3B] rounded-lg py-3 px-4 font-handwriting text-xl text-white focus:outline-none focus:border-[#4A90E2] transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-500 font-sans text-sm tracking-widest uppercase mb-2">
                Currency
              </label>
              <input 
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full bg-[#15171E] border border-[#2C2E3B] rounded-lg py-3 px-4 font-handwriting text-xl text-white focus:outline-none focus:border-[#4A90E2] transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-500 font-sans text-sm tracking-widest uppercase mb-2">
                Distance Unit
              </label>
              <input 
                name="distanceUnit"
                value={formData.distanceUnit}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full bg-[#15171E] border border-[#2C2E3B] rounded-lg py-3 px-4 font-handwriting text-xl text-white focus:outline-none focus:border-[#4A90E2] transition-colors"
              />
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={isSaving || isLoading}
                className="bg-[#5984A4] text-black font-handwriting text-xl px-6 py-2 rounded-lg hover:bg-[#436A8A] transition-colors disabled:opacity-50 shadow-md"
              >
                {isSaving ? 'Saving...' : 'Save changes'}
              </button>
              
              {message && (
                <span className="ml-4 text-sm font-sans text-gray-400">
                  {message}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: RBAC Matrix */}
        <div>
          <h2 className="text-2xl font-handwriting tracking-widest uppercase mb-8 text-gray-300">
            Role-Based Access (RBAC)
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#2C2E3B] text-gray-500 font-sans text-xs tracking-widest uppercase">
                  <th className="py-4 font-medium">Role</th>
                  <th className="py-4 font-medium text-center">Fleet</th>
                  <th className="py-4 font-medium text-center">Maintenance</th>
                  <th className="py-4 font-medium text-center">Drivers</th>
                  <th className="py-4 font-medium text-center">Trips</th>
                  <th className="py-4 font-medium text-center">Fuel/Exp.</th>
                  <th className="py-4 font-medium text-center">Analytics</th>
                </tr>
              </thead>
              <tbody className="font-handwriting text-xl text-gray-300">
                
                <tr className="border-b border-[#2C2E3B]/50 hover:bg-[#1A1C23]/30 transition-colors">
                  <td className="py-4 font-sans text-lg tracking-wide">Fleet Manager</td>
                  <td className="py-4 text-center">✓</td>
                  <td className="py-4 text-center">✓</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                </tr>

                <tr className="border-b border-[#2C2E3B]/50 hover:bg-[#1A1C23]/30 transition-colors">
                  <td className="py-4 font-sans text-lg tracking-wide">Dispatcher</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center">✓</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                </tr>

                <tr className="border-b border-[#2C2E3B]/50 hover:bg-[#1A1C23]/30 transition-colors">
                  <td className="py-4 font-sans text-lg tracking-wide">Safety Officer</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center">✓</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                </tr>

                <tr className="border-b border-[#2C2E3B]/50 hover:bg-[#1A1C23]/30 transition-colors">
                  <td className="py-4 font-sans text-lg tracking-wide">Financial Analyst</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center text-gray-500">-</td>
                  <td className="py-4 text-center">✓</td>
                  <td className="py-4 text-center">✓</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
