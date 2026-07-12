'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, Role } from '../../context/AuthContext';

interface NavItem {
  name: string;
  href: string;
  roles: Role[]; // which roles can see this link
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', roles: ['DRIVER', 'FLEET_MANAGER', 'SAFETY_OFFICER', 'FINANCIAL_ANALYST'] },
  { name: 'Fleet', href: '/fleet', roles: ['FLEET_MANAGER'] },
  { name: 'Drivers', href: '/drivers', roles: ['SAFETY_OFFICER'] },
  { name: 'Trips', href: '/trips', roles: ['DRIVER'] },
  { name: 'Maintenance', href: '/maintenance', roles: ['FLEET_MANAGER'] },
  { name: 'Fuel & Expenses', href: '/finances', roles: ['FINANCIAL_ANALYST'] },
  { name: 'Analytics', href: '/analytics', roles: ['FINANCIAL_ANALYST'] },
  { name: 'Settings', href: '/settings', roles: ['DRIVER', 'FLEET_MANAGER', 'SAFETY_OFFICER', 'FINANCIAL_ANALYST'] },
];

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  // Filter nav items based on user's role
  const visibleNavItems = navItems.filter(item => item.roles.includes(user.role));

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={`
        w-64 h-screen bg-[#1A1C23] border-r border-[#2C2E3B] flex flex-col text-white fixed z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand / Logo Area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#2C2E3B]">
          <h1 className="text-2xl font-bold tracking-wider text-white">TransitOps</h1>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {visibleNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-[#252836] text-[#FF8A00] border border-[#FF8A00]' 
                    : 'text-gray-400 hover:text-white hover:bg-[#252836] border border-transparent'}
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
