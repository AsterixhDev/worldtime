import React from 'react';
import { GeolocationPromptProps } from '../types';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const GeolocationPrompt = ({ 
  onAccept, 
  onDecline, 
  isVisible 
}: GeolocationPromptProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-100 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-xl shadow-elevation-lg max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mx-auto mb-4">
            <Icon name="MapPin" size={24} />
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Enable Location Services
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed">
            Allow WorldTime Pro to access your location to show your local timezone and provide personalized timezone suggestions.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start space-x-3 text-sm">
            <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">
              Show your current timezone prominently
            </span>
          </div>
          
          <div className="flex items-start space-x-3 text-sm">
            <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">
              Suggest relevant countries and timezones
            </span>
          </div>
          
          <div className="flex items-start space-x-3 text-sm">
            <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">
              Improve offline functionality
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={onAccept}
            className="flex-1"
            iconName="MapPin"
            iconPosition="left"
            iconSize={16}
          >
            Allow Location
          </Button>
          
          <Button
            variant="outline"
            onClick={onDecline}
            className="flex-1"
          >
            Not Now
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Shield" size={14} />
            <span>
              Your location data is processed locally and never stored or shared.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeolocationPrompt;