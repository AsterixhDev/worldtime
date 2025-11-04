import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/world-clock-dashboard': case'/':
        return 'World Clock Dashboard';
      case '/country-timezone-details':
        return 'Country Details';
      case '/offline-mode':
        return 'Offline Mode';
      case '/settings':
        return 'Settings';
      default:
        return 'WorldTime Pro';
    }
  };

  const showBackButton = location.pathname !== '/world-clock-dashboard' && location.pathname !== '/';

  const handleBack = () => {
    if (location.pathname === '/country-timezone-details') {
      navigate('/world-clock-dashboard');
    } else {
      navigate(-1);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-100 bg-surface border-b border-border ${className}`}>
        <div className="flex items-center justify-between h-16 px-4 lg:pl-72 lg:pr-6">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="lg:hidden"
                iconName="ArrowLeft"
                iconSize={20}
              />
            )}
            
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={handleLogoClick}
            >
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg group-hover:bg-primary/90 transition-smooth">
                <Icon 
                  name="Clock" 
                  size={20} 
                  color="white" 
                  strokeWidth={2.5}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground leading-none">
                  WorldTime Pro
                </span>
                <span className="text-xs text-muted-foreground leading-none mt-0.5 hidden sm:block">
                  Global Time Zones
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="hidden lg:flex"
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
              >
                Back
              </Button>
            )}

            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={16} />
              <span>{getPageTitle()}</span>
            </div>

            {isOffline && (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-warning/10 text-warning rounded-md border border-warning/20">
                <Icon name="WifiOff" size={16} />
                <span className="text-sm font-medium hidden sm:inline">Offline</span>
              </div>
            )}

            <div className="flex items-center space-x-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
              <Icon name="Globe" size={14} />
              <span className="font-mono">UTC</span>
            </div>
          </div>
        </div>
      </header>

      {isOffline && (
        <div className="fixed top-16 left-0 right-0 z-95 bg-warning/10 border-b border-warning/20 px-4 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <Icon name="WifiOff" size={20} color="var(--color-warning)" />
              <div>
                <p className="text-sm font-medium text-warning">
                  You're currently offline
                </p>
                <p className="text-xs text-warning/80">
                  Showing cached timezone data. Some information may be outdated.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="border-warning/30 text-warning hover:bg-warning/10"
            >
              Retry
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;