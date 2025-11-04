import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { GeolocationData } from '../types';

interface GeolocationCardProps {
  onLocationUpdate?: (data: GeolocationData) => void;
  className?: string;
}

const GeolocationCard = ({ onLocationUpdate, className = '' }: GeolocationCardProps) => {
  const [locationData, setLocationData] = useState<GeolocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    if (locationData) {
      const updateTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setCurrentTime(timeString);
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }
  }, [locationData]);

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        // Mock timezone data based on coordinates (in real app, would use timezone API)
        const mockLocationData: GeolocationData = {
          latitude,
          longitude,
          timezone: 'America/New_York',
          country: 'United States',
          city: 'New York',
          currentTime: new Date().toLocaleTimeString(),
          utcOffset: 'UTC-5',
          accuracy
        };

        setLocationData(mockLocationData);
        onLocationUpdate?.(mockLocationData);
        setIsLoading(false);
      },
      (error) => {
        let errorMessage = 'Unable to retrieve location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        
        setError(errorMessage);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const formatCoordinates = (lat: number, lng: number) => {
    return `${Math.abs(lat).toFixed(4)}°${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng).toFixed(4)}°${lng >= 0 ? 'E' : 'W'}`;
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
          <Icon name="MapPin" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Your Location
          </h3>
          <p className="text-sm text-muted-foreground">
            Current timezone information
          </p>
        </div>
      </div>

      {!locationData && !error && (
        <div className="text-center py-8">
          <Icon name="MapPin" size={48} className="mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground mb-4">
            Get your current timezone and local time
          </p>
          <Button
            onClick={requestLocation}
            loading={isLoading}
            iconName="MapPin"
            iconPosition="left"
            iconSize={16}
            disabled={isLoading}
          >
            {isLoading ? 'Getting Location...' : 'Get My Location'}
          </Button>
        </div>
      )}

      {error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-error mb-1">Location Error</p>
              <p className="text-sm text-error/80 mb-3">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={requestLocation}
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={14}
                className="border-error/30 text-error hover:bg-error/10"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}

      {locationData && (
        <div className="space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold font-mono text-primary mb-1">
                {currentTime}
              </div>
              <div className="text-sm text-muted-foreground">
                {locationData.timezone} ({locationData.utcOffset})
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Country:</span>
                <span className="font-medium text-foreground">{locationData.country}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">City:</span>
                <span className="font-medium text-foreground">{locationData.city}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Coordinates:</span>
                <span className="font-medium text-foreground font-mono text-xs">
                  {formatCoordinates(locationData.latitude, locationData.longitude)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-medium text-foreground">±{Math.round(locationData.accuracy)}m</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={requestLocation}
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={14}
              className="w-full"
            >
              Update Location
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeolocationCard;