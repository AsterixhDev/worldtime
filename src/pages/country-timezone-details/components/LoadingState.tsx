import React from 'react';
import Icon from 'components/AppIcon';

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:px-6">
        {/* Header Skeleton */}
        <div className="bg-surface border border-border rounded-lg p-6 mb-6 animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-32 bg-muted rounded" />
            <div className="h-6 w-24 bg-muted rounded" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[repeat(auto-fit,_minmax(30rem,1fr))] gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-12 bg-muted rounded" />
                <div className="flex-1 space-y-3">
                  <div className="h-8 w-64 bg-muted rounded" />
                  <div className="h-4 w-48 bg-muted rounded" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-full bg-muted rounded" />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="h-4 w-24 bg-muted rounded mx-auto" />
                <div className="h-12 w-full bg-muted rounded" />
                <div className="h-3 w-32 bg-muted rounded mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="text-center py-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Icon name="Loader2" size={24} className="animate-spin text-primary" />
            <span className="text-lg font-medium text-foreground">
              Loading timezone data...
            </span>
          </div>
          <p className="text-muted-foreground">
            Fetching current time information for all regions
          </p>
        </div>

        {/* Region Skeletons */}
        <div className="space-y-4">
          {[1, 2, 3]?.map((index) => (
            <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
              <div className="px-6 py-4 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-muted rounded" />
                    <div className="space-y-2">
                      <div className="h-5 w-32 bg-muted rounded" />
                      <div className="h-3 w-24 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="w-5 h-5 bg-muted rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;