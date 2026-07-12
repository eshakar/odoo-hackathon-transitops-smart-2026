'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export const Topbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/sign-in');
  };

  // Helper to format role names (e.g. FINANCIAL_ANALYST -> Financial Analyst)
  const formatRole = (role: string) => {
    return role.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
  };

  // Helper to get initials (e.g. Raven K. -> RK)
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="h-16 bg-[#1A1C23] border-b border-[#2C2E3B] flex items-center justify-between px-6 sticky top-0 z-10 text-white">
      {/* Search Bar */}
      <div className="w-96">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-[#252836] border border-[#2C2E3B] rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] transition-colors"
          />
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-gray-400">{formatRole(user.role)}</p>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-[#FF8A00] flex items-center justify-center text-white font-bold border-2 border-[#252836] shadow-lg shadow-[#FF8A00]/20">
              {getInitials(user.name)}
            </div>

            <button 
              onClick={handleLogout}
              className="ml-2 text-sm text-gray-400 hover:text-[#FF8A00] transition-colors"
              title="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="text-sm text-gray-400">Not logged in</div>
        )}
      </div>
    </header>
  );
};
