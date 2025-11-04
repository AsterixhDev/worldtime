import React from 'react';
import { ThemeToggleProps } from '../types';
import Icon from 'components/AppIcon';

const ThemeToggle = ({ theme, onThemeChange }: ThemeToggleProps) => {
  const handleToggle = () => {
    onThemeChange(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon 
            name={theme === 'light' ? 'Sun' : 'Moon'} 
            size={20} 
            className="text-primary" 
          />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Theme</h3>
          <p className="text-sm text-muted-foreground">
            {theme === 'light' ? 'Light mode' : 'Dark mode'}
          </p>
        </div>
      </div>

      <button
        onClick={handleToggle}
        className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 data-[checked]:bg-primary"
        data-checked={theme === 'dark'}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;