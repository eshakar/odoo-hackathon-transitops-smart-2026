'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'FLEET_MANAGER' | 'DRIVER' | 'SAFETY_OFFICER' | 'FINANCIAL_ANALYST';

export interface User {
  id: string;
  name: string;
  role: Role;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Temporary hardcoded mock user for development and testing role-based UI
  const [user, setUser] = useState<User | null>({
    id: 'mock-uuid',
    name: 'Raven K.',
    role: 'DRIVER', // Default to DRIVER so Trips dashboard shows
    token: 'mock-jwt-token'
  });

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
