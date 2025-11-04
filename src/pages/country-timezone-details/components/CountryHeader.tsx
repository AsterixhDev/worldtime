import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Image from 'components/AppImage';
import { CountryHeaderProps } from '../types';
import TimeDisplay from './TimeDisplay';

const CountryHeader = ({ country, onBack }: CountryHeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    onBack();
    navigate('/world-clock-dashboard');
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatArea = (area: number) => {
    return `${formatNumber(area)} km²`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackClick}
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={16}
          className="mb-4"
        >
          Back to Dashboard
        </Button>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Live Updates</span>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[repeat(auto-fit,_minmax(30rem,1fr))] gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-start space-x-4 mb-4">
            <div className="flex-shrink-0">
              <Image
                src={country.flag}
                alt={country.flagAlt}
                className="w-16 h-12 object-cover rounded border border-border shadow-sm"
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {country.name}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                <span className="font-mono bg-muted px-2 py-1 rounded">
                  {country.code}
                </span>
                <span>•</span>
                <span>{country.totalTimezones} timezone{country.totalTimezones !== 1 ? 's' : ''}</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Capital:</span>
                  <span className="font-medium">{country.capital}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Population:</span>
                  <span className="font-medium">{formatNumber(country.population)}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="Square" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Area:</span>
                  <span className="font-medium">{formatArea(country.area)}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Currency:</span>
                  <span className="font-medium">{country.currency}</span>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex items-start space-x-2 text-sm">
                  <Icon name="Languages" size={16} className="text-muted-foreground mt-0.5" />
                  <div>
                    <span className="text-muted-foreground">Languages:</span>
                    <span className="font-medium ml-2">{country.languages.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Main Timezone
            </h3>
            <TimeDisplay
              time={country.mainTimezone.currentTime}
              timezone={`${country.mainTimezone.name} (${country.mainTimezone.abbreviation})`}
              format="24h"
              showSeconds={true}
            />
            <div className="mt-3 text-xs text-muted-foreground">
              GMT {country.mainTimezone.gmtOffset}
              {country.mainTimezone.isDaylightSaving && (
                <span className="ml-2 text-accent">• DST Active</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryHeader;