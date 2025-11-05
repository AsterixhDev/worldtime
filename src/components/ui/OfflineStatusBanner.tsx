import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

interface OfflineStatusBannerProps {
  className?: string;
  onRetry?: () => void;
  showLastUpdate?: boolean;
}

const OfflineStatusBanner = ({ 
  className = '', 
  onRetry,
  showLastUpdate = true 
}: OfflineStatusBannerProps) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setLastUpdate(new Date());
      // Hide banner after a brief success message
      setTimeout(() => setIsVisible(false), 3000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setIsVisible(true);
    };

    // Set initial visibility
    setIsVisible(isOffline);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOffline]);

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const formatLastUpdate = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (!isVisible) return null;

  return (
    <div className={`pt-16 pb-8 lg:pl-72 bg-surface border-b border-border shadow-elevation ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              isOffline 
                ? 'bg-warning/10 text-warning' :'bg-success/10 text-success'
            }`}>
              <Icon 
                name={isOffline ? 'WifiOff' : 'Wifi'} 
                size={16} 
              />
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <p className={`text-sm font-medium ${
                  isOffline ? 'text-warning' : 'text-success'
                }`}>
                  {isOffline ? 'You\'re currently offline' : 'Connection restored'}
                </p>
                
                {isOffline && (
                  <div className="flex items-center space-x-1 px-2 py-0.5 bg-warning/10 rounded-full">
                    <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                    <span className="text-xs text-warning font-medium">Offline</span>
                  </div>
                )}
              </div>
              
              <p className={`text-xs mt-0.5 ${
                isOffline ? 'text-warning/80' : 'text-success/80'
              }`}>
                {isOffline 
                  ? 'Showing cached timezone data. Some information may be outdated.'
                  : 'All features are now available with live data.'
                }
              </p>
              
              {showLastUpdate && lastUpdate && !isOffline && (
                <p className="text-xs text-muted-foreground mt-1">
                  Last updated: {formatLastUpdate(lastUpdate)}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isOffline && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="border-warning/30 text-warning hover:bg-warning/10"
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={14}
              >
                Retry
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-muted-foreground hover:text-foreground"
              iconName="X"
              iconSize={16}
            />
          </div>
        </div>

        {isOffline && (
          <div className="mt-3 pt-3 border-t border-warning/20">
            <div className="flex items-start space-x-3 text-xs">
              <Icon name="Info" size={14} className="text-warning mt-0.5 flex-shrink-0" />
              <div className="space-y-1 text-warning/80">
                <p>• Timezone data is cached and may not reflect recent changes</p>
                <p>• Search functionality works with locally stored data</p>
                <p>• Connection will be restored automatically when available</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineStatusBanner;