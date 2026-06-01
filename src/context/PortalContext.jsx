import { createContext, useContext, useState, useEffect } from 'react';

const PortalContext = createContext();

export const PortalProvider = ({ children }) => {
  const [portalMode, setPortalModeState] = useState(() => {
    const saved = localStorage.getItem('vta_portal_mode');
    return saved === 'academy' ? 'academy' : 'industry';
  });

  const setPortalMode = (mode) => {
    if (mode === 'industry' || mode === 'academy') {
      setPortalModeState(mode);
      localStorage.setItem('vta_portal_mode', mode);
    }
  };

  return (
    <PortalContext.Provider value={{ portalMode, setPortalMode }}>
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
