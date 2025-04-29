import { createContext, useState, ReactNode, useEffect } from 'react';

interface Settings {
  paletteSize: number;
  mode: 'light' | 'dark' | 'both';
  showTooltips: boolean;
  autoApplyRoles: boolean;
  enforceAccessibility: boolean;
  accessibilityLevel: 'AA' | 'AAA';
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: Settings = {
  paletteSize: 5,
  mode: 'light',
  showTooltips: true,
  autoApplyRoles: true,
  enforceAccessibility: true,
  accessibilityLevel: 'AA'
};

export const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_SETTINGS,
  updateSettings: () => {},
  resetSettings: () => {}
});

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem('colorGeneratorSettings');
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
  });
  
  useEffect(() => {
    localStorage.setItem('colorGeneratorSettings', JSON.stringify(settings));
  }, [settings]);
  
  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };
  
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };
  
  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
