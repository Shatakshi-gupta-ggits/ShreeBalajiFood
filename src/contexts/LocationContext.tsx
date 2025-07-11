
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Outlet {
  id: string;
  name: string;
  address: string;
  deliveryTime: string;
  deliveryRadius: string;
  phone: string;
}

interface LocationContextType {
  selectedOutlet: Outlet;
  outlets: Outlet[];
  setSelectedOutlet: (outlet: Outlet) => void;
}

const outlets: Outlet[] = [
  {
    id: 'outlet1',
    name: 'Shri Balaji Foods - Downtown',
    address: '123 Main Street, Downtown',
    deliveryTime: '25-35 min',
    deliveryRadius: '5 km',
    phone: '+91 98765 43210'
  },
  {
    id: 'outlet2',
    name: 'Shri Balaji Foods - Mall Road',
    address: '456 Mall Road, Shopping District',
    deliveryTime: '30-40 min',
    deliveryRadius: '7 km',
    phone: '+91 98765 43211'
  }
];

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet>(outlets[0]);

  return (
    <LocationContext.Provider value={{ selectedOutlet, outlets, setSelectedOutlet }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
