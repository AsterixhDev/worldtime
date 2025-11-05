import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../../contexts/SettingsContext';
import ThemeToggle from './components/ThemeToggle';
import ColorSchemePicker from './components/ColorSchemePicker';
import PermissionsPanel from './components/PermissionsPanel';
import PWAInstallSection from './components/PWAInstallSection';
import PreferencesPanel from './components/PreferencesPanel';
import Header from 'components/ui/Header';
import Navbar from 'components/ui/Navbar';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import Icon from 'components/AppIcon';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { settings, updateTheme, updateColorScheme, updatePermissions, updatePreferences } = useSettings();

  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Check if app is installable
  useEffect(() => {
    const checkInstallability = () => {
      if ('serviceWorker' in navigator) {
        setIsInstallable(true);
      }

      // Check if app is already installed
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
    };

    checkInstallability();
  }, []);

  const handleThemeChange = (theme: 'light' | 'dark') => {
    updateTheme(theme);
  };

  const handleColorSchemeChange = (colorScheme: 'blue' | 'green' | 'purple' | 'orange') => {
    updateColorScheme(colorScheme);
  };

  const handlePermissionChange = (permission: keyof typeof settings.permissions, enabled: boolean) => {
    updatePermissions({ [permission]: enabled });
  };

  const handlePreferenceChange = (key: keyof typeof settings.preferences, value: any) => {
    updatePreferences({ [key]: value });
  };

  const handleInstallClick = () => {
    console.log('PWA installation triggered');
  };

  const handleResetSettings = () => {
    updateTheme('light');
    updateColorScheme('blue');
    updatePermissions({
      location: false,
      notifications: false,
      offlineStorage: true,
    });
    updatePreferences({
      timeFormat: '12',
      autoLocation: false,
      refreshInterval: 300,
    });
    setShowResetModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navbar />
      
      <main className="pt-16 pb-8 lg:pl-64">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(-1)}
                  iconName="ArrowLeft"
                  iconSize={20}
                  className="lg:hidden"
                />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                  <p className="text-muted-foreground">
                    Customize your TerraTemps experience
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResetModal(true)}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {/* Appearance Section */}
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Eye" size={24} className="text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
              </div>
              
              <div className="space-y-6">
                <ThemeToggle
                  theme={settings.theme}
                  onThemeChange={handleThemeChange}
                />
                
                <ColorSchemePicker
                  selectedScheme={settings.colorScheme}
                  onSchemeChange={handleColorSchemeChange}
                />
              </div>
            </section>

            {/* Permissions Section */}
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Shield" size={24} className="text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Permissions</h2>
              </div>
              
              <PermissionsPanel
                permissions={settings.permissions}
                onPermissionChange={handlePermissionChange}
              />
            </section>

            {/* Device Integration Section */}
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Smartphone" size={24} className="text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Device Integration</h2>
              </div>
              
              <PWAInstallSection
                onInstallClick={handleInstallClick}
                isInstallable={isInstallable}
                isInstalled={isInstalled}
              />
            </section>

            {/* Preferences Section */}
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Sliders" size={24} className="text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Preferences</h2>
              </div>
              
              <PreferencesPanel
                preferences={settings.preferences}
                onPreferenceChange={handlePreferenceChange}
              />
            </section>

            {/* App Information */}
            {/* Help & Support */}
            <section className="pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="HelpCircle" size={20} className="text-primary" />
                  <div>
                    <h3 className="text-lg font-medium">Help & Support</h3>
                    <p className="text-sm text-muted-foreground">Open the in-app Help guide to learn how to use TerraTemps.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/help')}
                    iconName="Book"
                  >
                    Open Help
                  </Button>
                </div>
              </div>
            </section>

            {/* App Information */}
            <section className="pt-6 border-t border-border">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  TerraTemps v1.0.0
                </p>
                <p className="text-xs text-muted-foreground">
                  Built with React & TypeScript
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset Settings"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Icon name="AlertTriangle" size={24} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-foreground">
                Are you sure you want to reset all settings to default values?
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                This action cannot be undone. All your customizations will be lost.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => setShowResetModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleResetSettings}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset Settings
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;