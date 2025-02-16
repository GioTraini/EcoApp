import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';



interface AuthContextProps {
  token: string | null;
  user: {
    name: string;
    email: string;
    avatar: string;
  } | null;
  setToken: (token: string | null) => void;
}

// Tipo per il componente AuthProvider
interface AuthProviderProps {
  children: ReactNode; // Aggiungi 'children' come tipo ReactNode
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthContextProps['user'] | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        // Assicurati che il token contenga le informazioni necessarie
        setUser({
          name: decodedToken.name,
          email: decodedToken.email,
          avatar: decodedToken.avatar || 'https://example.com/default-avatar.jpg', // Avatar di default se non presente
        });
      } catch (error) {
        console.error('Errore nella decodifica del token:', error);
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, setToken }}>
      {children} 
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
