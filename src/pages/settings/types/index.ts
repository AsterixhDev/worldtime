export interface SettingsState {
  theme: 'light' | 'dark';
  colorScheme: 'blue' | 'green' | 'purple' | 'orange';
  permissions: {
    location: boolean;
    notifications: boolean;
    offlineStorage: boolean;
  };
  preferences: {
    timeFormat: '12' | '24';
    autoLocation: boolean;
    refreshInterval: number;
  };
}

export interface ColorSchemeOption {
  id: 'blue' | 'green' | 'purple' | 'orange';
  name: string;
  primary: string;
  accent: string;
  preview: {
    background: string;
    text: string;
    border: string;
  };
}

export interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export interface ColorSchemePickerProps {
  selectedScheme: 'blue' | 'green' | 'purple' | 'orange';
  onSchemeChange: (scheme: 'blue' | 'green' | 'purple' | 'orange') => void;
}

export interface PermissionToggleProps {
  permissions: SettingsState['permissions'];
  onPermissionChange: (permission: keyof SettingsState['permissions'], enabled: boolean) => void;
}

export interface PWAInstallProps {
  onInstallClick: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
}