import React from 'react';
import Icon from 'components/AppIcon';
import { CacheInfo } from '../types';

interface CacheInfoCardProps {
  cacheInfo: CacheInfo;
  className?: string;
}

const CacheInfoCard = ({ cacheInfo, className = '' }: CacheInfoCardProps) => {
  const formatCacheDate = (date: Date | null) => {
    if (!date) return 'No cache available';
    
    return date.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCacheStatus = () => {
    if (!cacheInfo.lastCacheUpdate) return { status: 'No Cache', color: 'text-error' };
    if (cacheInfo.isExpired) return { status: 'Expired', color: 'text-warning' };
    return { status: 'Valid', color: 'text-success' };
  };

  const cacheStatus = getCacheStatus();

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full">
          <Icon name="Database" size={20} className="text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Cached Data
          </h3>
          <p className="text-sm text-muted-foreground">
            Offline data information
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Countries Cached
            </p>
            <p className="text-2xl font-bold text-foreground">
              {cacheInfo.totalCountries}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Cache Size
            </p>
            <p className="text-2xl font-bold text-foreground">
              {cacheInfo.cacheSize}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Cache Status:</span>
            <span className={`text-sm font-medium ${cacheStatus.color}`}>
              {cacheStatus.status}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Updated:</span>
            <span className="text-sm font-medium text-foreground">
              {formatCacheDate(cacheInfo.lastCacheUpdate)}
            </span>
          </div>
        </div>

        {cacheInfo.isExpired && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-warning mb-1">Cache Expired</p>
                <p className="text-warning/80 text-xs">
                  Data may be outdated. Connect to internet to refresh.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CacheInfoCard;