import React from 'react';
import { SettingsState } from '../types';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

interface PreferencesPanelProps {
  preferences: SettingsState['preferences'];
  onPreferenceChange: (key: keyof SettingsState['preferences'], value: any) => void;
}

const PreferencesPanel = ({ preferences, onPreferenceChange }: PreferencesPanelProps) => {
  const refreshIntervalOptions = [
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 300, label: '5 minutes' },
    { value: 900, label: '15 minutes' },
    { value: 1800, label: '30 minutes' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Settings" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Customize your WorldTimeSage experience
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Time Format */}
        <div className="p-4 bg-surface border border-border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={20} className="text-primary" />
              <div>
                <h4 className="font-medium text-foreground">Time Format</h4>
                <p className="text-sm text-muted-foreground">
                  Choose 12-hour or 24-hour format
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={preferences.timeFormat === '12' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPreferenceChange('timeFormat', '12')}
              className="flex-1"
            >
              12 Hour (2:30 PM)
            </Button>
            <Button
              variant={preferences.timeFormat === '24' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPreferenceChange('timeFormat', '24')}
              className="flex-1"
            >
              24 Hour (14:30)
            </Button>
          </div>
        </div>

        {/* Auto Location */}
        <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Navigation" size={20} className="text-primary" />
            <div>
              <h4 className="font-medium text-foreground">Auto Location Detection</h4>
              <p className="text-sm text-muted-foreground">
                Automatically detect and update your timezone
              </p>
            </div>
          </div>
          
          <button
            onClick={() => onPreferenceChange('autoLocation', !preferences.autoLocation)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              preferences.autoLocation ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.autoLocation ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Refresh Interval */}
        <div className="p-4 bg-surface border border-border rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="RefreshCw" size={20} className="text-primary" />
            <div>
              <h4 className="font-medium text-foreground">Data Refresh Interval</h4>
              <p className="text-sm text-muted-foreground">
                How often to update timezone data
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,_minmax(30rem,1fr))] gap-2">
            {refreshIntervalOptions.map((option) => (
              <Button
                key={option.value}
                variant={preferences.refreshInterval === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPreferenceChange('refreshInterval', option.value)}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesPanel;