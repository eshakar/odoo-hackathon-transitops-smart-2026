'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Do not render Sidebar and Topbar on authentication pages
  if (pathname.startsWith('/auth')) {
    return <main className="h-screen bg-[#0F111A] text-white font-sans">{children}</main>;
  }

  return (
    <div className="flex h-screen bg-[#0F111A] overflow-hidden text-gray-200 font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col md:ml-64 w-full">
        <Topbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0F111A] p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
