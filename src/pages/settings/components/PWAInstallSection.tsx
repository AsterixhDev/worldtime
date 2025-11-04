import React, { useState, useEffect } from 'react';
import { PWAInstallProps } from '../types';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const PWAInstallSection = ({ onInstallClick, isInstallable, isInstalled }: PWAInstallProps) => {
  const [platform, setPlatform] = useState<string>('');
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('android')) {
      setPlatform('Android');
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      setPlatform('iOS');
    } else if (userAgent.includes('windows')) {
      setPlatform('Windows');
    } else if (userAgent.includes('mac')) {
      setPlatform('macOS');
    } else {
      setPlatform('Desktop');
    }

    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallPrompt(null);
      }
    }
    onInstallClick();
  };

  const getInstallInstructions = () => {
    switch (platform) {
      case 'iOS':
        return 'Tap the Share button, then "Add to Home Screen"';
      case 'Android':
        return 'Tap the menu button, then "Add to Home Screen"';
      default:
        return 'Click "Install" when prompted by your browser';
    }
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case 'iOS':
        return 'Smartphone';
      case 'Android':
        return 'Smartphone';
      case 'Windows':
        return 'Monitor';
      case 'macOS':
        return 'Monitor';
      default:
        return 'Download';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Smartphone" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Install App</h3>
          <p className="text-sm text-muted-foreground">
            Install TerraTemps on your device
          </p>
        </div>
      </div>

      <div className="p-4 bg-surface border border-border rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl">
              <Icon name="Clock" size={24} color="white" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">TerraTemps</h4>
              <p className="text-sm text-muted-foreground">
                Global timezone tracker
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name={getPlatformIcon() as any} size={16} />
            <span>{platform}</span>
          </div>
        </div>

        {isInstalled ? (
          <div className="flex items-center justify-center p-4 bg-success/10 text-success rounded-lg">
            <Icon name="CheckCircle" size={20} className="mr-2" />
            <span className="font-medium">App is already installed</span>
          </div>
        ) : (
          <div className="space-y-3">
            <Button
              onClick={handleInstall}
              disabled={!isInstallable && !installPrompt}
              className="w-full"
              size="lg"
              iconName="Download"
              iconPosition="left"
            >
              {isInstallable || installPrompt ? 'Install to Device' : 'Installation Not Available'}
            </Button>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">
                    How to install on {platform}:
                  </p>
                  <p>{getInstallInstructions()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Wifi" size={14} />
              <span>Offline access</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Zap" size={14} />
              <span>Fast loading</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Bell" size={14} />
              <span>Push notifications</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Smartphone" size={14} />
              <span>Native experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallSection;