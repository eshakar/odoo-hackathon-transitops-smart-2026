'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { AddFuelModal } from '../../components/finances/AddFuelModal';
import { AddExpenseModal } from '../../components/finances/AddExpenseModal';
import { Badge } from '../../components/ui/Badge';

export default function FinancesPage() {
  const { user } = useAuth();
  
  const [fuelLogs, setFuelLogs] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState<any>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  
  const [isFuelModalOpen, setIsFuelModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const fetchData = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const headers = { Authorization: `Bearer ${user.token}` };
      
      const [fuelRes, expenseRes, summaryRes] = await Promise.all([
        axios.get('http://localhost:3001/finances/fuel', { headers }),
        axios.get('http://localhost:3001/finances/expenses', { headers }),
        axios.get('http://localhost:3001/finances/summary', { headers })
      ]);

      setFuelLogs(fuelRes.data);
      setExpenses(expenseRes.data);
      setSummary(summaryRes.data);
    } catch (err) {
      console.error('Failed to fetch finances data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // Aggregate expenses for the "Other Expenses" table based on wireframe.
  // Group by Trip if tripId exists. If not, just display them independently.
  // Since the wireframe shows columns: TRIP, VEHICLE, TOLL, OTHER, MAINT. (LINKED), TOTAL
  // We can format the data for this table.
  
  const formatTripExpenses = () => {
    const tripMap = new Map();
    
    // Independent expenses that aren't tied to a trip will be shown individually
    const unlinkedExpenses: any[] = [];

    expenses.forEach((exp: any) => {
      if (exp.tripId) {
        if (!tripMap.has(exp.tripId)) {
          tripMap.set(exp.tripId, {
            id: exp.tripId,
            vehicle: exp.vehicle?.registrationNumber || '-',
            toll: 0,
            other: 0,
            maintenance: 0,
          });
        }
        const tripSummary = tripMap.get(exp.tripId);
        if (exp.category === 'TOLL') tripSummary.toll += exp.amount;
        else if (exp.category === 'MAINTENANCE') tripSummary.maintenance += exp.amount;
        else tripSummary.other += exp.amount;
      } else {
        unlinkedExpenses.push({
          id: exp.id,
          isUnlinked: true,
          vehicle: exp.vehicle?.registrationNumber || '-',
          toll: exp.category === 'TOLL' ? exp.amount : 0,
          other: (exp.category === 'OTHER' || exp.category === 'FUEL') ? exp.amount : 0,
          maintenance: exp.category === 'MAINTENANCE' ? exp.amount : 0,
        });
      }
    });

    return [...Array.from(tripMap.values()), ...unlinkedExpenses];
  };

  const formattedExpenses = formatTripExpenses();

  if (isLoading || !summary) {
    return <div className="text-gray-400 font-sans p-8">Loading Finances...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#0F111A] text-gray-200">
      
      {/* HEADER & ACTIONS */}
      <div className="flex justify-between items-center mb-8">
        <div></div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsFuelModalOpen(true)}
            className="bg-[#D35400] text-white font-semibold text-xl px-6 py-2 rounded-lg hover:bg-[#A04000] transition-colors shadow-md"
          >
            + Log Fuel
          </button>
          <button 
            onClick={() => setIsExpenseModalOpen(true)}
            className="bg-[#B9770E] text-white font-semibold text-xl px-6 py-2 rounded-lg hover:bg-[#935116] transition-colors shadow-md"
          >
            + Add Expense
          </button>
        </div>
      </div>

      {/* FUEL LOGS TABLE */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold tracking-widest uppercase mb-4 text-gray-300">
          Fuel Logs
        </h2>
        <div className="bg-[#15171E] rounded-xl overflow-hidden border border-[#2C2E3B]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2C2E3B] text-gray-500 font-sans text-xs tracking-widest uppercase">
                <th className="py-4 px-6 font-medium">Vehicle</th>
                <th className="py-4 px-6 font-medium">Date</th>
                <th className="py-4 px-6 font-medium">Liters</th>
                <th className="py-4 px-6 font-medium">Fuel Cost</th>
              </tr>
            </thead>
            <tbody className="font-semibold text-xl text-gray-300">
              {fuelLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500 font-sans text-sm">No fuel logs found</td>
                </tr>
              ) : (
                fuelLogs.map((log: any) => (
                  <tr key={log.id} className="border-b border-[#2C2E3B]/50 hover:bg-[#1A1C23]/50 transition-colors">
                    <td className="py-4 px-6 uppercase">{log.vehicle.registrationNumber}</td>
                    <td className="py-4 px-6">{new Date(log.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="py-4 px-6">{log.liters} L</td>
                    <td className="py-4 px-6">{(log.cost).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* OTHER EXPENSES TABLE */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-widest uppercase mb-4 text-gray-300">
          Other Expenses (Toll / Misc)
        </h2>
        <div className="bg-[#15171E] rounded-xl overflow-hidden border border-[#2C2E3B]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2C2E3B] text-gray-500 font-sans text-xs tracking-widest uppercase">
                <th className="py-4 px-6 font-medium">Trip</th>
                <th className="py-4 px-6 font-medium">Vehicle</th>
                <th className="py-4 px-6 font-medium">Toll</th>
                <th className="py-4 px-6 font-medium">Other</th>
                <th className="py-4 px-6 font-medium">Maint. (Linked)</th>
                <th className="py-4 px-6 font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="font-semibold text-xl text-gray-300">
              {formattedExpenses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500 font-sans text-sm">No expenses found</td>
                </tr>
              ) : (
                formattedExpenses.map((exp: any) => {
                  const total = exp.toll + exp.other + exp.maintenance;
                  return (
                    <tr key={exp.id} className="border-b border-[#2C2E3B]/50 hover:bg-[#1A1C23]/50 transition-colors">
                      <td className="py-4 px-6">{exp.isUnlinked ? '-' : `TR${exp.id.substring(0,3).toUpperCase()}`}</td>
                      <td className="py-4 px-6 uppercase">{exp.vehicle}</td>
                      <td className="py-4 px-6">{exp.toll}</td>
                      <td className="py-4 px-6">{exp.other}</td>
                      <td className="py-4 px-6">{exp.maintenance}</td>
                      <td className="py-4 px-6">
                        {/* Using Badges for styling as shown in wireframe, though numeric total makes more sense */}
                        <div className={`inline-block px-3 py-1 rounded-md text-sm font-sans ${total > 500 ? 'bg-[#4CAF50] text-black' : 'bg-[#8BC34A] text-black'}`}>
                          {total.toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOTAL COST FOOTER */}
      <div className="mt-4 border-t-2 border-white pt-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold tracking-widest uppercase text-gray-300">
          Total Operational Cost (Auto) = Fuel + Maint + Other
        </h2>
        <div className="text-3xl font-semibold text-[#FF8A00]">
          {(summary.totalOperationalCost).toLocaleString()}
        </div>
      </div>

      <AddFuelModal 
        isOpen={isFuelModalOpen} 
        onClose={() => setIsFuelModalOpen(false)} 
        onFuelAdded={fetchData} 
      />
      
      <AddExpenseModal 
        isOpen={isExpenseModalOpen} 
        onClose={() => setIsExpenseModalOpen(false)} 
        onExpenseAdded={fetchData} 
      />
      
    </div>
  );
}
