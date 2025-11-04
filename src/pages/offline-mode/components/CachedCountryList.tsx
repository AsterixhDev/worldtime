import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import { CachedCountry } from '../types';

interface CachedCountryListProps {
  countries: CachedCountry[];
  className?: string;
}

const CachedCountryList = ({ countries, className = '' }: CachedCountryListProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return countries;
    
    return countries.filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.timezone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [countries, searchQuery]);

  const toggleCountryExpansion = (countryId: string) => {
    const newExpanded = new Set(expandedCountries);
    if (newExpanded.has(countryId)) {
      newExpanded.delete(countryId);
    } else {
      newExpanded.add(countryId);
    }
    setExpandedCountries(newExpanded);
  };

  const handleCountryClick = (country: CachedCountry) => {
    navigate('/country-timezone-details', { 
      state: { 
        country: {
          name: country.name,
          flag: country.flag,
          timezone: country.timezone,
          isOffline: true
        }
      }
    });
  };

  const formatTime = (timeString: string) => {
    try {
      const time = new Date(timeString);
      return time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return timeString;
    }
  };

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Less than an hour ago';
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className={`bg-surface border border-border rounded-lg ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Cached Countries
            </h3>
            <p className="text-sm text-muted-foreground">
              {filteredCountries.length} of {countries.length} countries available offline
            </p>
          </div>
          
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-muted rounded-full">
            <Icon name="Database" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Cached</span>
          </div>
        </div>

        <div className="relative">
          <Input
            type="search"
            placeholder="Search cached countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
          />
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {filteredCountries.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground mb-2">
              {searchQuery ? 'No cached countries match your search' : 'No cached countries available'}
            </p>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? 'Try a different search term' : 'Connect to internet to load country data'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredCountries.map((country) => {
              const isExpanded = expandedCountries.has(country.id);
              const hasRegions = country.regions && country.regions.length > 0;
              
              return (
                <div key={country.id} className="p-4 hover:bg-muted/30 transition-smooth">
                  <div className="flex items-center justify-between">
                    <div 
                      className="flex items-center space-x-3 flex-1 cursor-pointer"
                      onClick={() => handleCountryClick(country)}
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-foreground">{country.name}</h4>
                          <div className="flex items-center space-x-1 px-2 py-0.5 bg-warning/10 rounded-full">
                            <Icon name="Clock" size={12} className="text-warning" />
                            <span className="text-xs text-warning font-medium">Cached</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-muted-foreground">{country.timezone}</span>
                          <span className="text-sm font-mono text-foreground">
                            {formatTime(country.currentTime)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">
                          Updated {formatLastUpdated(country.lastUpdated)}
                        </div>
                      </div>
                      
                      {hasRegions && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCountryExpansion(country.id)}
                          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                          iconSize={16}
                        />
                      )}
                    </div>
                  </div>

                  {isExpanded && hasRegions && (
                    <div className="mt-4 pl-8 space-y-2">
                      {country.regions!.map((region) => (
                        <div key={region.id} className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-lg">
                          <div>
                            <span className="text-sm font-medium text-foreground">{region.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">{region.timezone}</span>
                          </div>
                          <span className="text-sm font-mono text-foreground">
                            {formatTime(region.currentTime)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {filteredCountries.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Info" size={16} />
              <span>Times shown are from last cache update</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/world-clock-dashboard')}
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={14}
            >
              View All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CachedCountryList;