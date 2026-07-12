"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

// Data model matching the requested response
interface Vehicle {
  registrationNumber: string;
  nameModel: string;
  type: string;
  maxLoadCapacity: string | number;
  odometer: number;
  acquisitionCost: number;
  status: "AVAILABLE" | "ON_TRIP" | "IN_SHOP" | "RETIRED";
}

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    registrationNumber: "",
    nameModel: "",
    type: "",
    maxLoadCapacity: 5000,
    odometer: 0,
    acquisitionCost: 0,
    status: "AVAILABLE" as "AVAILABLE" | "ON_TRIP" | "IN_SHOP" | "RETIRED",
  });
  
  const { user } = useAuth();

  const [filterType, setFilterType] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const uniqueTypes = Array.from(new Set(vehicles.map(v => v.type)));

  const filteredVehicles = vehicles.filter(v => {
    const matchesType = filterType === "All" || v.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === "All" || v.status === filterStatus;
    const matchesSearch = v.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!user?.token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:3001/vehicles", {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        if (response.data) {
          setVehicles(response.data);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVehicles();
  }, [user]);

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/vehicles",
        {
          ...newVehicle,
          maxLoadCapacity: Number(newVehicle.maxLoadCapacity),
          odometer: Number(newVehicle.odometer),
          acquisitionCost: Number(newVehicle.acquisitionCost),
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` }
        }
      );
      setVehicles((prev) => [...prev, response.data]);
      setIsAddModalOpen(false);
      setNewVehicle({
        registrationNumber: "",
        nameModel: "",
        type: "",
        maxLoadCapacity: 1000,
        odometer: 0,
        acquisitionCost: 0,
        status: "AVAILABLE",
      });
    } catch (error) {
      console.error("Error creating vehicle:", error);
      alert("Failed to create vehicle");
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-brand-dark font-sans text-gray-200 relative">
      {/* Filters and Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none bg-[#141414] border border-gray-700 rounded-md py-1.5 pl-3 pr-8 text-gray-300 focus:outline-none focus:border-gray-500 text-lg min-w-[120px]"
            >
              <option value="All">Type: All</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none bg-[#141414] border border-gray-700 rounded-md py-1.5 pl-3 pr-8 text-gray-300 focus:outline-none focus:border-gray-500 text-lg min-w-[120px]"
            >
              <option value="All">Status: All</option>
              <option value="AVAILABLE">Available</option>
              <option value="ON_TRIP">On Trip</option>
              <option value="IN_SHOP">In Shop</option>
              <option value="RETIRED">Retired</option>
            </select>
          </div>
          <div className="relative">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#141414] border border-gray-700 rounded-md py-1.5 pl-3 pr-3 text-gray-300 focus:outline-none focus:border-gray-500 text-lg w-64"
              placeholder="Search reg. no..."
              type="text"
            />
          </div>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-brand-orange hover:bg-orange-700 text-white px-4 py-2 rounded-md font-bold text-xl flex items-center space-x-1 shadow-lg border border-orange-800 transition-colors"
        >
          <span>+</span>
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-lg whitespace-nowrap">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 uppercase text-sm tracking-wider">
              <th className="py-3 px-4 font-normal">Reg. No. (Unique)</th>
              <th className="py-3 px-4 font-normal">Name/Mode</th>
              <th className="py-3 px-4 font-normal">Type</th>
              <th className="py-3 px-4 font-normal">Capacity</th>
              <th className="py-3 px-4 font-normal">Odometer</th>
              <th className="py-3 px-4 font-normal">Acq. Cost</th>
              <th className="py-3 px-4 font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-gray-200 text-xl">
            {filteredVehicles.map((v, idx) => (
              <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                <td className="py-4 px-4">{v.registrationNumber}</td>
                <td className="py-4 px-4">{v.nameModel}</td>
                <td className="py-4 px-4">{v.type}</td>
                <td className="py-4 px-4">{v.maxLoadCapacity}</td>
                <td className="py-4 px-4">{v.odometer.toLocaleString()}</td>
                <td className="py-4 px-4">{v.acquisitionCost.toLocaleString()}</td>
                <td className="py-4 px-4">
                  {v.status === "AVAILABLE" && (
                    <span className="bg-[#4ade80] text-black px-4 py-1 rounded-sm text-lg block w-max shadow-sm border border-green-700">
                      Available
                    </span>
                  )}
                  {v.status === "ON_TRIP" && (
                    <span className="bg-[#60a5fa] text-black px-4 py-1 rounded-sm text-lg block w-max shadow-sm border border-blue-700">
                      On Trip
                    </span>
                  )}
                  {v.status === "IN_SHOP" && (
                    <span className="bg-[#d97706] text-black px-4 py-1 rounded-sm text-lg block w-max shadow-sm border border-yellow-700">
                      In Shop
                    </span>
                  )}
                  {v.status === "RETIRED" && (
                    <span className="bg-[#f87171] text-black px-4 py-1 rounded-sm text-lg block w-max shadow-sm border border-red-700">
                      Retired
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-6 text-brand-orange text-lg">
        Rule: Registration No. must be unique - Retired/In Shop vehicles are hidden from Trip
        Dispatcher
      </div>

      {/* Add Vehicle Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#141414] p-8 rounded-lg shadow-xl w-full max-w-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">Add New Vehicle</h2>
            
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Registration Number</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. VAN-1234"
                  value={newVehicle.registrationNumber}
                  onChange={e => setNewVehicle({...newVehicle, registrationNumber: e.target.value})}
                  className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Name / Model</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Ford Transit"
                  value={newVehicle.nameModel}
                  onChange={e => setNewVehicle({...newVehicle, nameModel: e.target.value})}
                  className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Type</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Van, Truck"
                  value={newVehicle.type}
                  onChange={e => setNewVehicle({...newVehicle, type: e.target.value})}
                  className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Capacity (kg/Ton)</label>
                  <input
                    required
                    type="number"
                    value={newVehicle.maxLoadCapacity}
                    onChange={e => setNewVehicle({...newVehicle, maxLoadCapacity: Number(e.target.value)})}
                    className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Odometer</label>
                  <input
                    required
                    type="number"
                    value={newVehicle.odometer}
                    onChange={e => setNewVehicle({...newVehicle, odometer: Number(e.target.value)})}
                    className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Acquisition Cost</label>
                  <input
                    required
                    type="number"
                    value={newVehicle.acquisitionCost}
                    onChange={e => setNewVehicle({...newVehicle, acquisitionCost: Number(e.target.value)})}
                    className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Status</label>
                  <select
                    value={newVehicle.status}
                    onChange={e => setNewVehicle({...newVehicle, status: e.target.value as any})}
                    className="w-full bg-black border border-gray-700 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:border-brand-orange"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="ON_TRIP">ON_TRIP</option>
                    <option value="IN_SHOP">IN_SHOP</option>
                    <option value="RETIRED">RETIRED</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-orange hover:bg-orange-600 text-black px-6 py-2 rounded-md font-bold transition-colors"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
