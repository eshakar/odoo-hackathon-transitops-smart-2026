'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/ui/Badge';

export default function DashboardPage() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filters State
  const [vehicleType, setVehicleType] = useState('All');
  const [status, setStatus] = useState('All');

  useEffect(() => {
    if (!user) return;
    
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        
        let queryParams = '';
        if (vehicleType !== 'All') queryParams += `?vehicleType=${vehicleType}`;
        if (status !== 'All') queryParams += queryParams ? `&vehicleStatus=${status}` : `?vehicleStatus=${status}`;

        const response = await axios.get(`http://localhost:3001/dashboard/kpis${queryParams}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setDashboardData(response.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboard();
  }, [user, vehicleType, status]);

  if (isLoading || !dashboardData) {
    return <div className="text-gray-400 font-sans p-8">Loading Dashboard...</div>;
  }

  const { kpis, vehicleStatusBreakdown, recentTrips } = dashboardData;

  // Calculate total vehicles for the progress bar percentages
  const totalVehiclesForBars = 
    vehicleStatusBreakdown.Available + 
    vehicleStatusBreakdown['On Trip'] + 
    vehicleStatusBreakdown['In Shop'] + 
    vehicleStatusBreakdown.Retired;

  const calculateWidth = (count: number) => {
    if (totalVehiclesForBars === 0) return '0%';
    return `${(count / totalVehiclesForBars) * 100}%`;
  };

  return (
    <div className="flex flex-col h-full bg-[#0F111A] text-gray-200">
      
      {/* FILTERS */}
      <div className="mb-8">
        <h3 className="text-gray-500 font-sans text-xs tracking-widest uppercase mb-3">Filters</h3>
        <div className="flex gap-4">
          <select 
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="bg-[#15171E] border border-[#2C2E3B] rounded-lg py-2 px-4 text-white focus:outline-none focus:border-[#4A90E2] transition-colors"
          >
            <option value="All">Vehicle Type: All</option>
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
          </select>
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-[#15171E] border border-[#2C2E3B] rounded-lg py-2 px-4 text-white focus:outline-none focus:border-[#4A90E2] transition-colors"
          >
            <option value="All">Status: All</option>
            <option value="AVAILABLE">Available</option>
            <option value="ON_TRIP">On Trip</option>
          </select>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
        <KPICard title="Active Vehicles" value={kpis.activeVehicles} color="border-blue-500" />
        <KPICard title="Available Vehicles" value={kpis.availableVehicles} color="border-green-500" />
        <KPICard title="Vehicles in Maintenance" value={kpis.vehiclesInMaintenance} color="border-orange-500" />
        <KPICard title="Active Trips" value={kpis.activeTrips} color="border-blue-500" />
        <KPICard title="Pending Trips" value={kpis.pendingTrips} color="border-blue-500" />
        <KPICard title="Drivers on Duty" value={kpis.driversOnDuty} color="border-blue-500" />
        <KPICard title="Fleet Utilization" value={`${kpis.fleetUtilization}%`} color="border-green-500" />
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RECENT TRIPS TABLE (2/3 width) */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-handwriting tracking-widest uppercase mb-4 text-gray-300">
            Recent Trips
          </h2>
          <div className="bg-[#15171E] rounded-xl overflow-hidden border border-[#2C2E3B]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#2C2E3B] text-gray-500 font-sans text-xs tracking-widest uppercase">
                  <th className="py-4 px-6 font-medium">Trip</th>
                  <th className="py-4 px-6 font-medium">Vehicle</th>
                  <th className="py-4 px-6 font-medium">Driver</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium">ETA</th>
                </tr>
              </thead>
              <tbody className="font-handwriting text-xl text-gray-300">
                {recentTrips.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500 font-sans text-sm">No recent trips</td>
                  </tr>
                ) : (
                  recentTrips.map((trip: any, index: number) => (
                    <tr key={trip.id} className="border-b border-[#2C2E3B]/50 hover:bg-[#1A1C23]/50 transition-colors">
                      <td className="py-4 px-6">TR{String(index + 1).padStart(3, '0')}</td>
                      <td className="py-4 px-6 uppercase">{trip.vehicle.registrationNumber}</td>
                      <td className="py-4 px-6">{trip.driver.name}</td>
                      <td className="py-4 px-6">
                        <Badge status={trip.status} />
                      </td>
                      <td className="py-4 px-6 font-sans text-sm text-gray-400">
                        {trip.status === 'COMPLETED' ? '-' : 
                         trip.status === 'DRAFT' ? 'Awaiting vehicle' : 
                         `${Math.round(trip.plannedDistance / 60)}h ${trip.plannedDistance % 60}m`}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* VEHICLE STATUS BREAKDOWN (1/3 width) */}
        <div>
          <h2 className="text-xl font-handwriting tracking-widest uppercase mb-4 text-gray-300">
            Vehicle Status
          </h2>
          <div className="space-y-6 bg-[#15171E] p-6 rounded-xl border border-[#2C2E3B]">
            
            <StatusBar 
              label="Available" 
              count={vehicleStatusBreakdown.Available} 
              width={calculateWidth(vehicleStatusBreakdown.Available)} 
              color="bg-[#4CAF50]" 
            />
            <StatusBar 
              label="On Trip" 
              count={vehicleStatusBreakdown['On Trip']} 
              width={calculateWidth(vehicleStatusBreakdown['On Trip'])} 
              color="bg-[#4A90E2]" 
            />
            <StatusBar 
              label="In Shop" 
              count={vehicleStatusBreakdown['In Shop']} 
              width={calculateWidth(vehicleStatusBreakdown['In Shop'])} 
              color="bg-[#FF8A00]" 
            />
            <StatusBar 
              label="Retired" 
              count={vehicleStatusBreakdown.Retired} 
              width={calculateWidth(vehicleStatusBreakdown.Retired)} 
              color="bg-[#FF5252]" 
            />

          </div>
        </div>

      </div>

    </div>
  );
}

// Subcomponents

const KPICard = ({ title, value, color }: { title: string, value: string | number, color: string }) => (
  <div className={`bg-[#15171E] border border-[#2C2E3B] border-l-4 ${color} rounded-lg p-4 flex flex-col justify-between`}>
    <h4 className="text-gray-500 font-sans text-[10px] tracking-widest uppercase mb-2">{title}</h4>
    <div className="text-3xl font-handwriting text-white">{value}</div>
  </div>
);

const StatusBar = ({ label, count, width, color }: { label: string, count: number, width: string, color: string }) => (
  <div>
    <div className="flex justify-between font-handwriting text-xl text-gray-300 mb-1">
      <span>{label}</span>
      <span>{count}</span>
    </div>
    <div className="w-full bg-[#2C2E3B] h-4 rounded-full overflow-hidden border border-black shadow-inner">
      <div 
        className={`h-full ${color} transition-all duration-1000 ease-in-out`} 
        style={{ width }} 
      />
    </div>
  </div>
);
