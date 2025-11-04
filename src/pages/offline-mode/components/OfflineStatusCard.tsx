import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { OfflineStatus } from '../types';

interface OfflineStatusCardProps {
  status: OfflineStatus;
  onRetry: () => void;
  className?: string;
}

const OfflineStatusCard = ({ status, onRetry, className = '' }: OfflineStatusCardProps) => {
  const formatLastOnline = (date: Date | null) => {
    if (!date) return 'Unknown';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-warning/5 border border-warning/20 rounded-lg p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-full">
            <Icon name="WifiOff" size={24} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              You're Currently Offline
            </h3>
            <p className="text-sm text-muted-foreground">
              Limited functionality available
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-2 py-1 bg-warning/10 rounded-full">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
            <span className="text-xs text-warning font-medium">Offline</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last online:</span>
          <span className="font-medium text-foreground">
            {formatLastOnline(status.lastOnline)}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Connection attempts:</span>
          <span className="font-medium text-foreground">
            {status.connectionAttempts}
          </span>
        </div>
      </div>

      <div className="bg-warning/10 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-warning mt-0.5 flex-shrink-0" />
          <div className="space-y-2 text-sm text-warning/90">
            <p className="font-medium">Available offline features:</p>
            <ul className="space-y-1 text-xs">
              <li>• View cached timezone data</li>
              <li>• Search previously loaded countries</li>
              <li>• Access your current location time</li>
              <li>• Browse offline-compatible content</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          onClick={onRetry}
          disabled={status.isRetrying}
          loading={status.isRetrying}
          iconName="RefreshCw"
          iconPosition="left"
          iconSize={16}
          className="border-warning/30 text-warning hover:bg-warning/10"
        >
          {status.isRetrying ? 'Retrying...' : 'Retry Connection'}
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Auto-retry in progress
        </div>
      </div>
    </div>
  );
};

export default OfflineStatusCard;