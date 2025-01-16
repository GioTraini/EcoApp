import { useAuth } from '@/hooks/useAuth';
import React, { createContext, useContext, ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): ReturnType<typeof useAuth> => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
