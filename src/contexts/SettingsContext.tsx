import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SettingsState } from '../pages/settings/types';

interface SettingsContextType {
  settings: SettingsState;
  updateSettings: (newSettings: Partial<SettingsState>) => void;
  updateTheme: (theme: 'light' | 'dark') => void;
  updateColorScheme: (colorScheme: 'blue' | 'green' | 'purple' | 'orange') => void;
  updatePermissions: (permissions: Partial<SettingsState['permissions']>) => void;
  updatePreferences: (preferences: Partial<SettingsState['preferences']>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const defaultSettings: SettingsState = {
  theme: 'light',
  colorScheme: 'blue',
  permissions: {
    location: false,
    notifications: false,
    offlineStorage: true,
  },
  preferences: {
    timeFormat: '12',
    autoLocation: false,
    refreshInterval: 300,
  },
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('TerraTemps-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage and apply theme/color changes
  useEffect(() => {
    localStorage.setItem('TerraTemps-settings', JSON.stringify(settings));
    applyTheme(settings.theme);
    applyColorScheme(settings.colorScheme);
  }, [settings]);

  const applyTheme = (theme: 'light' | 'dark') => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const applyColorScheme = (scheme: 'blue' | 'green' | 'purple' | 'orange') => {
    const root = document.documentElement;

    switch (scheme) {
      case 'green':
        root.style.setProperty('--color-primary', '#10B981');
        root.style.setProperty('--color-accent', '#8B5CF6');
        break;
      case 'purple':
        root.style.setProperty('--color-primary', '#8B5CF6');
        root.style.setProperty('--color-accent', '#F59E0B');
        break;
      case 'orange':
        root.style.setProperty('--color-primary', '#EA580C');
        root.style.setProperty('--color-accent', '#06B6D4');
        break;
      default: // blue
        root.style.setProperty('--color-primary', '#2563EB');
        root.style.setProperty('--color-accent', '#F59E0B');
    }
  };

  const updateSettings = (newSettings: Partial<SettingsState>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateTheme = (theme: 'light' | 'dark') => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const updateColorScheme = (colorScheme: 'blue' | 'green' | 'purple' | 'orange') => {
    setSettings(prev => ({ ...prev, colorScheme }));
  };

  const updatePermissions = (permissions: Partial<SettingsState['permissions']>) => {
    setSettings(prev => ({
      ...prev,
      permissions: { ...prev.permissions, ...permissions }
    }));
  };

  const updatePreferences = (preferences: Partial<SettingsState['preferences']>) => {
    setSettings(prev => ({
      ...prev,
      preferences: { ...prev.preferences, ...preferences }
    }));
  };

  const value: SettingsContextType = {
    settings,
    updateSettings,
    updateTheme,
    updateColorScheme,
    updatePermissions,
    updatePreferences,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};