'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function AnalyticsPage() {
  const { user } = useAuth();
  
  const [reports, setReports] = useState<any>(null);
  const [kpis, setKpis] = useState<any>(null);
  const [finances, setFinances] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const headers = { Authorization: `Bearer ${user.token}` };
        
        const [reportsRes, kpisRes, financesRes] = await Promise.all([
          axios.get('http://localhost:3001/reports/fleet', { headers }),
          axios.get('http://localhost:3001/dashboard/kpis', { headers }),
          axios.get('http://localhost:3001/finances/summary', { headers })
        ]);

        setReports(reportsRes.data);
        setKpis(kpisRes.data.kpis ? kpisRes.data.kpis : kpisRes.data); // Handle depending on how dashboard returns
        setFinances(financesRes.data);
      } catch (err) {
        console.error('Failed to fetch analytics', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [user]);

  if (isLoading || !reports || !kpis || !finances) {
    return <div className="text-gray-400 font-sans p-8">Loading Analytics...</div>;
  }

  // Get Top Costliest Vehicles
  const costliestVehicles = [...reports.vehicleBreakdown]
    .sort((a, b) => b.operationalCost - a.operationalCost)
    .slice(0, 5);
  
  const maxVehicleCost = costliestVehicles.length > 0 ? costliestVehicles[0].operationalCost : 1;

  // Monthly Revenue Chart
  const monthlyRevenue = reports.monthlyRevenue || [];
  const maxRevenue = Math.max(...monthlyRevenue.map((m: any) => m.revenue), 1);

  return (
    <div className="flex flex-col h-full bg-[#0F111A] text-gray-200">
      
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <KPICard 
          title="Fuel Efficiency" 
          value={`${reports.averageFuelEfficiency} km/l`} 
          color="border-blue-500" 
        />
        <KPICard 
          title="Fleet Utilization" 
          value={`${kpis.fleetUtilization}%`} 
          color="border-green-500" 
        />
        <KPICard 
          title="Operational Cost" 
          value={finances.totalOperationalCost.toLocaleString()} 
          color="border-orange-500" 
        />
        <KPICard 
          title="Vehicle ROI" 
          value={`${(reports.averageFleetROI * 100).toFixed(2)}%`} 
          color="border-green-500" 
        />
      </div>

      <div className="mb-10 text-gray-500 font-semibold text-sm">
        ROI = (Revenue - (Maintenance + Fuel + Other)) / Acquisition Cost
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* MONTHLY REVENUE (Bar Chart) */}
        <div>
          <h2 className="text-xl font-semibold tracking-widest uppercase mb-6 text-gray-300">
            Monthly Revenue
          </h2>
          
          <div className="bg-[#15171E] border border-[#2C2E3B] rounded-xl p-6 h-64 flex items-end gap-2 overflow-hidden shadow-inner relative">
            {monthlyRevenue.length === 0 ? (
              <div className="w-full text-center text-gray-500 font-sans text-sm pb-8">No revenue data available</div>
            ) : (
              monthlyRevenue.map((item: any, index: number) => {
                const heightPercentage = Math.max((item.revenue / maxRevenue) * 100, 5); // min 5% for visibility
                return (
                  <div key={index} className="flex-1 flex flex-col justify-end items-center group h-full pt-6">
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 bg-black/80 text-white text-xs py-1 px-2 rounded pointer-events-none">
                      {item.revenue.toLocaleString()}
                    </div>
                    {/* Bar */}
                    <div 
                      className="w-full bg-[#4A90E2] border border-[#2C2E3B] rounded-t-sm transition-all duration-700 ease-out shadow-lg"
                      style={{ height: `${heightPercentage}%` }}
                    />
                    {/* Label */}
                    <span className="text-[10px] text-gray-500 font-sans mt-2 truncate w-full text-center">
                      {item.month.split(' ')[0]}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* TOP COSTLIEST VEHICLES (Horizontal Progress Bars) */}
        <div>
          <h2 className="text-xl font-semibold tracking-widest uppercase mb-6 text-gray-300">
            Top Costliest Vehicles
          </h2>
          
          <div className="space-y-6">
            {costliestVehicles.length === 0 ? (
              <div className="text-gray-500 font-sans text-sm">No vehicle cost data available</div>
            ) : (
              costliestVehicles.map((vehicle: any, index: number) => {
                const widthPercentage = (vehicle.operationalCost / maxVehicleCost) * 100;
                
                // Cycle colors: Red, Orange, Blue
                const colors = ['bg-[#FF6B6B]', 'bg-[#D35400]', 'bg-[#4A90E2]'];
                const barColor = colors[index % colors.length];

                return (
                  <div key={vehicle.vehicleId} className="flex items-center gap-4">
                    <span className="font-semibold text-lg text-gray-300 w-24 uppercase truncate">
                      {vehicle.registrationNumber}
                    </span>
                    <div className="flex-1 bg-[#1A1C23] h-6 rounded-sm overflow-hidden border border-[#2C2E3B] relative">
                      <div 
                        className={`h-full ${barColor} transition-all duration-1000 ease-out`}
                        style={{ width: `${widthPercentage}%` }}
                      />
                      <span className="absolute inset-0 flex items-center px-3 text-xs font-sans text-white font-medium drop-shadow-md">
                        {vehicle.operationalCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

// Subcomponents

const KPICard = ({ title, value, color }: { title: string, value: string | number, color: string }) => (
  <div className={`bg-[#15171E] border border-[#2C2E3B] border-l-4 ${color} rounded-lg p-4 flex flex-col justify-between h-28 shadow-lg`}>
    <h4 className="text-gray-500 font-sans text-[10px] tracking-widest uppercase mb-2">{title}</h4>
    <div className="text-4xl font-semibold text-white">{value}</div>
  </div>
);
