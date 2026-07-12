'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Do not render Sidebar and Topbar on authentication pages
  if (pathname.startsWith('/auth')) {
    return <main className="h-screen bg-[#0F111A] text-white font-sans">{children}</main>;
  }

  return (
    <div className="flex h-screen bg-[#0F111A] overflow-hidden text-gray-200 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0F111A] p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
