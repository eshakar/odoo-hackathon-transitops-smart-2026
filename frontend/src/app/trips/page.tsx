'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/ui/Badge';

export default function TripsPage() {
  const { user } = useAuth();
  
  const [trips, setTrips] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    vehicleId: '',
    driverId: '',
    cargoWeight: '',
    plannedDistance: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBoardData = async () => {
    if (!user) return;
    try {
      const headers = { Authorization: `Bearer ${user.token}` };
      const [tripsRes, vehiclesRes, driversRes] = await Promise.all([
        axios.get('http://localhost:3001/trips', { headers }),
        axios.get('http://localhost:3001/vehicles', { headers }),
        axios.get('http://localhost:3001/drivers', { headers })
      ]);
      setTrips(tripsRes.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setVehicles(vehiclesRes.data.filter((v: any) => v.status === 'AVAILABLE'));
      setDrivers(driversRes.data.filter((d: any) => d.status === 'AVAILABLE'));
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardData();
  }, [user]);

  // Validation logic
  const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);
  const enteredCargo = parseFloat(formData.cargoWeight) || 0;
  
  const isCapacityExceeded = selectedVehicle && enteredCargo > selectedVehicle.maxLoadCapacity;
  const capacityDiff = isCapacityExceeded ? enteredCargo - selectedVehicle.maxLoadCapacity : 0;

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCapacityExceeded) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post('http://localhost:3001/trips', {
        source: formData.source,
        destination: formData.destination,
        vehicleId: formData.vehicleId,
        driverId: formData.driverId,
        cargoWeight: parseFloat(formData.cargoWeight),
        plannedDistance: parseFloat(formData.plannedDistance),
      }, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      
      // Reset form
      setFormData({ source: '', destination: '', vehicleId: '', driverId: '', cargoWeight: '', plannedDistance: '' });
      await fetchBoardData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create trip');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateTripStatus = async (tripId: string, status: string) => {
    try {
      await axios.patch(`http://localhost:3001/trips/${tripId}/status`, { status }, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      await fetchBoardData();
    } catch (err: any) {
      console.error('Failed to update status', err);
      alert(err.response?.data?.message || 'Error updating trip status');
    }
  };

  if (isLoading) return <div className="text-gray-400 p-8 font-sans">Loading Trips...</div>;

  return (
    <div className="flex flex-col lg:flex-row h-full bg-[#0F111A] text-gray-200 gap-8">
      
      {/* LEFT COLUMN: CREATE TRIP */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        
        {/* LIFECYCLE TIMELINE GRAPHIC */}
        <div>
          <h2 className="text-sm font-semibold tracking-widest uppercase mb-4 text-gray-400">Trip Lifecycle</h2>
          <div className="flex items-center justify-between text-xs font-sans text-gray-500 relative px-2">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#2C2E3B] -z-10 -translate-y-1/2" />
            
            <div className="flex flex-col items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#4CAF50]" />
              <span className="text-[#4CAF50]">Draft</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#4A90E2]" />
              <span className="text-[#4A90E2]">Dispatched</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <span>Completed</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <span>Cancelled</span>
            </div>
          </div>
        </div>

        {/* CREATE FORM */}
        <div>
          <h2 className="text-xl font-semibold tracking-widest uppercase mb-4 text-gray-300">Create Trip</h2>
          
          {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm font-sans border border-red-500/50">{error}</div>}
          
          <form onSubmit={handleCreateTrip} className="space-y-4 font-sans text-sm">
            <div>
              <label className="block text-gray-400 text-[10px] tracking-wider uppercase mb-1">Source</label>
              <input 
                required value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})}
                placeholder="Gandhinagar Depot"
                className="w-full bg-transparent border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#4A90E2]"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-[10px] tracking-wider uppercase mb-1">Destination</label>
              <input 
                required value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})}
                placeholder="Ahmedabad Hub"
                className="w-full bg-transparent border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#4A90E2]"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-[10px] tracking-wider uppercase mb-1">Vehicle (Available Only)</label>
              <select 
                required value={formData.vehicleId} onChange={e => setFormData({...formData, vehicleId: e.target.value})}
                className="w-full bg-[#0F111A] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#4A90E2]"
              >
                <option value="" disabled>Select Vehicle</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>{v.registrationNumber} - {v.maxLoadCapacity} kg capacity</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-[10px] tracking-wider uppercase mb-1">Driver (Available Only)</label>
              <select 
                required value={formData.driverId} onChange={e => setFormData({...formData, driverId: e.target.value})}
                className="w-full bg-[#0F111A] border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#4A90E2]"
              >
                <option value="" disabled>Select Driver</option>
                {drivers.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-[10px] tracking-wider uppercase mb-1">Cargo Weight (KG)</label>
              <input 
                type="number" required value={formData.cargoWeight} onChange={e => setFormData({...formData, cargoWeight: e.target.value})}
                placeholder="700"
                className={`w-full bg-transparent border rounded-lg py-2 px-3 text-white focus:outline-none 
                  ${isCapacityExceeded ? 'border-red-500/80 focus:border-red-500' : 'border-[#2C2E3B] focus:border-[#4A90E2]'}`}
              />
            </div>

            <div>
              <label className="block text-gray-400 text-[10px] tracking-wider uppercase mb-1">Planned Distance (KM)</label>
              <input 
                type="number" required value={formData.plannedDistance} onChange={e => setFormData({...formData, plannedDistance: e.target.value})}
                placeholder="38"
                className="w-full bg-transparent border border-[#2C2E3B] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#4A90E2]"
              />
            </div>

            {/* DYNAMIC VALIDATION BOX */}
            {selectedVehicle && (
              <div className={`p-3 rounded-lg border text-xs font-semibold ${isCapacityExceeded ? 'border-red-500/50 bg-red-500/10 text-red-400' : 'border-[#2C2E3B] text-gray-400'}`}>
                <div>Vehicle Capacity: {selectedVehicle.maxLoadCapacity} kg</div>
                <div>Cargo Weight: {enteredCargo} kg</div>
                {isCapacityExceeded && (
                  <div className="mt-1 flex items-center gap-1 font-bold">
                    <span className="text-red-500">❌</span> Capacity exceeded by {capacityDiff} kg — dispatch blocked
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4 pt-2">
              <button 
                type="submit" 
                disabled={isCapacityExceeded || isSubmitting}
                className="flex-1 bg-[#1A1C23] border border-[#2C2E3B] text-white hover:bg-[#252836] disabled:opacity-30 disabled:cursor-not-allowed font-semibold tracking-wider rounded-lg py-2 transition-colors"
              >
                {isSubmitting ? '...' : isCapacityExceeded ? 'Dispatch (disabled)' : 'Create Draft'}
              </button>
              <button 
                type="button" 
                onClick={() => setFormData({ source: '', destination: '', vehicleId: '', driverId: '', cargoWeight: '', plannedDistance: '' })}
                className="flex-1 bg-[#1A1C23] border border-[#2C2E3B] text-red-400 hover:bg-red-500/10 font-semibold tracking-wider rounded-lg py-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT COLUMN: LIVE BOARD */}
      <div className="w-full lg:w-2/3 flex flex-col">
        <h2 className="text-xl font-semibold tracking-widest uppercase mb-4 text-gray-300">Live Board</h2>
        
        <div className="space-y-4 pr-2">
          {trips.length === 0 ? (
            <div className="text-gray-500 font-sans text-sm">No trips on the board.</div>
          ) : (
            trips.map(trip => (
              <div key={trip.id} className="border border-[#2C2E3B] border-dashed rounded-lg p-4 bg-[#15171E] font-sans">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-gray-500 text-xs tracking-wider mb-1">TR{trip.id.substring(0, 4).toUpperCase()}</div>
                    <div className="text-white font-medium text-sm flex items-center gap-2">
                      {trip.source} <span className="text-gray-600">→</span> {trip.destination}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                      {trip.vehicle?.registrationNumber || 'UNASSIGNED'} / {trip.driver?.name?.split(' ')[0].toUpperCase() || 'UNASSIGNED'}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    {/* Status Badge */}
                    <div className={`px-3 py-1 rounded-sm text-xs text-black font-semibold uppercase tracking-wider
                      ${trip.status === 'DRAFT' ? 'bg-[#78909C]' : 
                        trip.status === 'DISPATCHED' ? 'bg-[#4A90E2]' : 
                        trip.status === 'COMPLETED' ? 'bg-[#4CAF50]' : 'bg-[#FF6B6B]'}`}
                    >
                      {trip.status}
                    </div>

                    {/* Quick Actions based on Status */}
                    {trip.status === 'DRAFT' && (
                      <button onClick={() => updateTripStatus(trip.id, 'DISPATCHED')} className="text-xs text-[#4A90E2] hover:underline">
                        Launch Dispatch
                      </button>
                    )}
                    {trip.status === 'DISPATCHED' && (
                      <button onClick={() => updateTripStatus(trip.id, 'COMPLETED')} className="text-xs text-[#4CAF50] hover:underline">
                        Mark Completed
                      </button>
                    )}
                  </div>

                  <div className="text-gray-500 text-xs font-semibold">
                    {trip.status === 'DRAFT' && 'Awaiting dispatch'}
                    {trip.status === 'DISPATCHED' && 'In transit'}
                    {trip.status === 'CANCELLED' && 'Aborted'}
                    {trip.status === 'COMPLETED' && 'Delivered'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-[#2C2E3B] text-gray-500 text-xs font-semibold">
          On Complete: odometer → fuel log → expenses → Vehicle & Driver Available
        </div>
      </div>

    </div>
  );
}
