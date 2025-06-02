import React, { createContext, useContext, useState } from 'react';
import Alert from '../components/Alert';

type AlertVariant = 'success' | 'info' | 'warning' | 'error';

interface AlertContextType {
  showAlert: (message: string, variant: AlertVariant) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<AlertVariant>('info');
  
  const showAlert = (message: string, variant: AlertVariant) => {
    setMessage(message);
    setVariant(variant);
    setIsVisible(true);
  };
  
  const hideAlert = () => {
    setIsVisible(false);
  };
  
  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Alert 
        message={message} 
        variant={variant} 
        isVisible={isVisible} 
        onClose={hideAlert} 
      />
    </AlertContext.Provider>
  );
};