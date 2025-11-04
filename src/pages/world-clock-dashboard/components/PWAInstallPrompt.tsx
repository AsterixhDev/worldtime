import React from 'react';
import { PWAInstallPromptProps } from '../types';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const PWAInstallPrompt = ({ 
  onInstall, 
  onDismiss, 
  isVisible 
}: PWAInstallPromptProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-90 max-w-md mx-auto">
      <div className="bg-surface border border-border rounded-lg shadow-elevation-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-lg flex-shrink-0">
            <Icon name="Download" size={20} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground text-sm mb-1">
              Install TerraTemps
            </h4>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Add to your home screen for quick access to world clocks, even when offline.
            </p>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={onInstall}
                iconName="Plus"
                iconPosition="left"
                iconSize={14}
              >
                Install
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="text-muted-foreground"
              >
                Later
              </Button>
            </div>
          </div>
          
          <button
            onClick={onDismiss}
            className="text-muted-foreground hover:text-foreground transition-smooth p-1 rounded-md hover:bg-muted/50 flex-shrink-0"
            aria-label="Dismiss install prompt"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Wifi" size={12} />
                <span>Works offline</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Smartphone" size={12} />
                <span>Native feel</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={12} />
              <span>Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;