import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CountryCardProps } from '../types';
import ClockDisplay from './ClockDisplay';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const CountryCard = ({ 
  country, 
  onSelect, 
  isLoading = false, 
  searchQuery = '' 
}: CountryCardProps) => {
  const navigate = useNavigate();

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-accent/30 text-accent-foreground rounded px-0.5">
          {part}
        </mark>
      ) : part
    );
  };

  const handleCardClick = () => {
    onSelect(country);
    navigate(`/country-timezone-details?country=${country.name.toLowerCase()}`, { state: { country } });
  };

  // Add safety checks for country data
  const primaryTimezone = country?.timezones?.[0];
  const hasMultipleTimezones = country?.timezones && country.timezones.length > 1;

  if (isLoading || !country || !primaryTimezone) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-6 bg-muted rounded"></div>
            <div className="h-6 bg-muted rounded w-32"></div>
          </div>
          <div className="w-4 h-4 bg-muted rounded"></div>
        </div>
        <div className="text-center space-y-2">
          <div className="h-8 bg-muted rounded w-40 mx-auto"></div>
          <div className="h-4 bg-muted rounded w-24 mx-auto"></div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <div className="h-4 bg-muted rounded w-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-surface border border-border rounded-lg p-6 shadow-elevation hover:shadow-elevation-md transition-all duration-200 cursor-pointer group hover:border-primary/20"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl" role="img" aria-label={`${country?.name || 'Country'} flag`}>
            {country?.flag || '🌍'}
          </span>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {highlightMatch(country?.name || '', searchQuery)}
            </h3>
            <p className="text-sm text-muted-foreground">
              {country?.region || ''} {country?.region && country?.subregion ? '•' : ''} {country?.subregion || ''}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {hasMultipleTimezones && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
              <Icon name="Clock" size={12} />
              <span>{country.timezones.length}</span>
            </div>
          )}
          <Icon 
            name="ChevronRight" 
            size={16} 
            className="text-muted-foreground group-hover:text-primary transition-colors" 
          />
        </div>
      </div>

      <div className="text-center mb-4">
        <ClockDisplay
          time={primaryTimezone.currentTime}
          timezone={primaryTimezone.name}
          showSeconds={false}
          className="mb-2"
        />
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <span className="font-mono">{primaryTimezone?.abbreviation || ''}</span>
          <span>•</span>
          <span className="font-mono">{primaryTimezone?.offset || ''}</span>
          {primaryTimezone?.isDST && (
            <>
              <span>•</span>
              <div className="flex items-center space-x-1 text-accent">
                <Icon name="Sun" size={12} />
                <span className="text-xs">DST</span>
              </div>
            </>
          )}
        </div>
      </div>

      {country?.capital && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>Capital: {country.capital}</span>
          </div>
        </div>
      )}

      {hasMultipleTimezones && (
        <div className="mt-3 pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-accent hover:text-accent-foreground hover:bg-accent/10"
            iconName="Clock"
            iconPosition="left"
            iconSize={14}
          >
            View all {country.timezones.length} timezones
          </Button>
        </div>
      )}
    </div>
  );
};

export default CountryCard;