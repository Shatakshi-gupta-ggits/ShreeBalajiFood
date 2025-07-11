
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
}

interface AdminContextType {
  adminUser: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Demo admin credentials
const DEMO_ADMIN_CREDENTIALS = [
  {
    email: 'admin@fooddelivery.com',
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@fooddelivery.com',
      name: 'Admin User',
      role: 'admin' as const
    }
  },
  {
    email: 'superadmin@fooddelivery.com',
    password: 'superadmin123',
    user: {
      id: '2',
      email: 'superadmin@fooddelivery.com',
      name: 'Super Admin',
      role: 'super_admin' as const
    }
  }
];

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Check if admin is already logged in (from localStorage)
    const savedAdmin = localStorage.getItem('adminUser');
    if (savedAdmin) {
      setAdminUser(JSON.parse(savedAdmin));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const credential = DEMO_ADMIN_CREDENTIALS.find(
      cred => cred.email === email && cred.password === password
    );

    if (credential) {
      setAdminUser(credential.user);
      localStorage.setItem('adminUser', JSON.stringify(credential.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('adminUser');
  };

  const isAuthenticated = !!adminUser;

  return (
    <AdminContext.Provider value={{
      adminUser,
      login,
      logout,
      isAuthenticated
    }}>
      {children}
    </AdminContext.Provider>
  );
};
