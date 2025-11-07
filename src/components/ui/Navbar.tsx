import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from './Button';
import { List } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: 'Clock',
      description: 'World Clock Dashboard',
    },
    {
      path: '/country-timezone-details',
      label: 'Country Details',
      icon: 'MapPin',
      description: 'Timezone Information',
    },
    {
      path: '/offline-mode',
      label: 'Offline Mode',
      icon: 'WifiOff',
      description: 'Cached Data View',
    },
    {
      path: '/help',
      label: 'Help',
      icon: 'HelpCircle',
      description: 'User Guide',
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: 'Settings',
      description: 'App Preferences',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/world-clock-dashboard';
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 bg-surface border-r border-border z-40">
        <div className="flex flex-col w-full p-4 pt-20">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-surface-hover'
                }`}
              >
                <Icon 
                  name={item.icon as any} 
                  size={20} 
                  className={isActive(item.path) ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs opacity-70">{item.description}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground text-center">
              <p>WorldTimeSage v1.0.0</p>
              <p className="mt-1">Global Timezone Management</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Button
          variant="default"
          size="lg"
          onClick={() => setIsMobileMenuOpen(true)}
          iconName="Menu"
          iconSize={24}
          className="w-14 h-14 rounded-full shadow-lg"
        />
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[9998] flex items-end justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu */}
          <div className="relative bg-surface border-t border-border rounded-t-2xl w-full max-w-md mx-4 mb-4 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Navigation</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                iconName="X"
                iconSize={20}
              />
            </div>

            {/* Navigation Items */}
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-surface-hover'
                  }`}
                >
                  <Icon 
                    name={item.icon as any} 
                    size={20} 
                    className={isActive(item.path) ? 'text-primary' : 'text-muted-foreground'}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-xs opacity-70">{item.description}</span>
                  </div>
                  {isActive(item.path) && (
                    <Icon name="Check" size={16} className="text-primary ml-auto" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;