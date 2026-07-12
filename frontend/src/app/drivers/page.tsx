'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/ui/Badge';
import { AddDriverModal } from '../../components/drivers/AddDriverModal';

interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  licenseCategory: string;
  licenseExpiryDate: string;
  contactNumber: string;
  tripCompletionRate: number;
  safetyScore: number;
  status: string;
}

export default function DriversPage() {
  const { user } = useAuth();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDrivers = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/drivers', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setDrivers(response.data);
    } catch (error) {
      console.error('Failed to fetch drivers', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, [user]);

  // Format Expiry (e.g., 2028-12-31 -> 12/2028)
  const formatExpiry = (isoString: string) => {
    const date = new Date(isoString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${month}/${date.getFullYear()}`;
  };

  // Helper to determine Safety Status based on score
  const getSafetyStatus = (score: number) => {
    if (score >= 95) return 'Available';
    if (score >= 85) return 'On Trip';
    if (score >= 70) return 'Suspended';
    return 'Suspended';
  };

  return (
    <div className="flex flex-col h-full bg-[#0F111A]">
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#D98725] text-white px-5 py-2 rounded-md font-semibold text-2xl tracking-wide shadow-md shadow-[#D98725]/20 hover:bg-[#c2751f] transition-colors flex items-center gap-2"
        >
          <span>+</span> Add Driver
        </button>
      </div>

      <div className="bg-[#15171E] rounded-xl overflow-hidden border border-[#2C2E3B] flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2C2E3B] text-gray-500 font-sans text-sm tracking-widest uppercase bg-[#1A1C23]">
                <th className="py-4 px-6 font-medium">Driver</th>
                <th className="py-4 px-6 font-medium">License No.</th>
                <th className="py-4 px-6 font-medium">Categor</th>
                <th className="py-4 px-6 font-medium">Expiry</th>
                <th className="py-4 px-6 font-medium">Contact</th>
                <th className="py-4 px-6 font-medium">Trip Compl.</th>
                <th className="py-4 px-6 font-medium">Safety</th>
                <th className="py-4 px-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="font-semibold text-xl text-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-500 font-sans">
                    Loading drivers...
                  </td>
                </tr>
              ) : drivers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-500 font-sans">
                    No drivers found. Add one to get started.
                  </td>
                </tr>
              ) : (
                drivers.map((driver) => {
                  const safetyStatus = getSafetyStatus(driver.safetyScore);
                  
                  return (
                    <tr key={driver.id} className="border-b border-[#2C2E3B]/50 hover:bg-[#1A1C23]/50 transition-colors">
                      <td className="py-4 px-6">{driver.name}</td>
                      <td className="py-4 px-6">{driver.licenseNumber}</td>
                      <td className="py-4 px-6 uppercase">{driver.licenseCategory}</td>
                      <td className="py-4 px-6">{formatExpiry(driver.licenseExpiryDate)}</td>
                      <td className="py-4 px-6">{driver.contactNumber.replace(/(\d{5})$/, 'xxxxx')}</td>
                      <td className="py-4 px-6">{driver.tripCompletionRate}%</td>
                      <td className="py-4 px-6 font-sans font-bold text-gray-300">
                        {driver.safetyScore}
                      </td>
                      <td className="py-4 px-6">
                        <Badge status={driver.status} />
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddDriverModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onDriverAdded={fetchDrivers} 
      />
    </div>
  );
}
