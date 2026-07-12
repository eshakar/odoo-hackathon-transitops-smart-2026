'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function MaintenancePage() {
  const { user } = useAuth();
  
  const [logs, setLogs] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    vehicleId: '',
    serviceType: '',
    cost: '',
    date: new Date().toISOString().split('T')[0],
    status: 'IN_PROGRESS',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    if (!user) return;
    try {
      const headers = { Authorization: `Bearer ${user.token}` };
      const [logsRes, vehiclesRes] = await Promise.all([
        axios.get('http://localhost:3001/maintenance', { headers }),
        axios.get('http://localhost:3001/vehicles', { headers })
      ]);
      setLogs(logsRes.data);
      // For maintenance, we can select any vehicle unless it's RETIRED
      setVehicles(vehiclesRes.data.filter((v: any) => v.status !== 'RETIRED'));
    } catch (err) {
      console.error('Failed to fetch maintenance data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:3001/maintenance', {
        vehicleId: formData.vehicleId,
        serviceType: formData.serviceType,
        cost: parseFloat(formData.cost),
        date: new Date(formData.date).toISOString(),
        status: formData.status,
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setFormData({ vehicleId: '', serviceType: '', cost: '', date: new Date().toISOString().split('T')[0], status: 'IN_PROGRESS' });
      await fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to log maintenance');
    } finally {
      setIsSubmitting(false);
    }
  };

  const markCompleted = async (id: string) => {
    if (!user) return;
    try {
      await axios.patch(`http://localhost:3001/maintenance/${id}`, 
      { status: 'COMPLETED' }, 
      { headers: { Authorization: `Bearer ${user.token}` } });
      await fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  if (isLoading) return <div className="p-8 text-gray-400 font-sans">Loading Maintenance...</div>;

  return (
    <div className="flex flex-col lg:flex-row h-full bg-[#0F111A] text-gray-200 gap-8">
      
      {/* LEFT COLUMN: LOG SERVICE RECORD */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold tracking-widest uppercase mb-6 text-gray-300">Log Service Record</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
            <div>
              <label className="block text-gray-400 text-[10px] tracking-wider uppercase mb-1">Vehicle</label>
              <select 
                required value={formData.vehicleId} onChange={e => setFormData({...formData, vehicleId: e.target.value})}
                className="w-full bg-transparent border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#D35400]"
              >
                <option value="" disabled>Select Vehicle</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>{v.registrationNumber}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-400 text-[10px] tracking-wider uppercase mb-1">Service Type</label>
              <input 
                required value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})}
                placeholder="Oil Change"
                className="w-full bg-transparent border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#D35400]"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-[10px] tracking-wider uppercase mb-1">Cost</label>
              <input 
                type="number" step="0.01" required value={formData.cost} onChange={e => setFormData({...formData, cost: e.target.value})}
                placeholder="2500"
                className="w-full bg-transparent border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#D35400]"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-[10px] tracking-wider uppercase mb-1">Date</label>
              <input 
                type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-transparent border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#D35400]"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-[10px] tracking-wider uppercase mb-1">Status</label>
              <select 
                required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
                className="w-full bg-transparent border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#D35400]"
              >
                <option value="IN_PROGRESS">Active / In Shop</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#D35400] text-white hover:bg-[#A04000] disabled:opacity-50 disabled:cursor-not-allowed font-semibold tracking-wider rounded-lg py-3 transition-colors text-lg"
              >
                {isSubmitting ? '...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT COLUMN: SERVICE LOG */}
      <div className="w-full lg:w-2/3 flex flex-col">
        <h2 className="text-xl font-semibold tracking-widest uppercase mb-4 text-gray-300">Service Log</h2>
        
        <div className="bg-[#15171E] rounded-xl overflow-hidden border border-[#2C2E3B] font-sans">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2C2E3B] text-gray-500 text-xs tracking-widest uppercase">
                <th className="py-4 px-6 font-medium">Vehicle</th>
                <th className="py-4 px-6 font-medium">Service</th>
                <th className="py-4 px-6 font-medium">Cost</th>
                <th className="py-4 px-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm font-semibold text-lg">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500 text-sm font-sans">No service logs found</td>
                </tr>
              ) : (
                logs.map((log: any) => (
                  <tr key={log.id} className="border-b border-[#2C2E3B]/50 hover:bg-[#1A1C23]/50 transition-colors">
                    <td className="py-4 px-6 font-medium uppercase">{log.vehicle?.registrationNumber || 'Unknown'}</td>
                    <td className="py-4 px-6">{log.serviceType}</td>
                    <td className="py-4 px-6">{log.cost.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {log.status === 'COMPLETED' ? (
                          <div className="px-4 py-1 bg-[#8BC34A] text-black font-sans text-xs tracking-widest uppercase rounded">
                            Completed
                          </div>
                        ) : (
                          <button 
                            onClick={() => markCompleted(log.id)}
                            className="px-4 py-1 bg-[#D35400] hover:bg-[#A04000] transition-colors text-black font-sans text-xs tracking-widest uppercase rounded cursor-pointer w-24 text-center"
                            title="Click to mark as Completed"
                          >
                            In Shop
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
