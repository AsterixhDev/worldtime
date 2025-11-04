import React from 'react';
import { CountryListProps } from '../types';
import CountryCard from './CountryCard';
import Icon from 'components/AppIcon';

const CountryList = ({ 
  countries, 
  onCountrySelect, 
  searchQuery, 
  isLoading 
}: CountryListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <CountryCard
            key={index}
            country={null as any}
            onSelect={() => {}}
            isLoading={true}
          />
        ))}
      </div>
    );
  }

  if (countries.length === 0 && searchQuery) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No countries found
          </h3>
          <p className="text-muted-foreground mb-6">
            No countries match your search for "{searchQuery}". Try searching for a different country name or region.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Try searching for "United States" instead of "USA"</p>
            <p>• Check your spelling</p>
            <p>• Try searching by region like "Europe" or "Asia"</p>
          </div>
        </div>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <Icon name="Globe" size={48} className="mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No countries available
          </h3>
          <p className="text-muted-foreground">
            Unable to load country data. Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {searchQuery && (
        <div className="flex items-center justify-between py-3 px-4 bg-muted/30 rounded-lg border border-border/50">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Search" size={16} />
            <span>
              Found {countries.length} result{countries.length !== 1 ? 's' : ''} for "{searchQuery}"
            </span>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            {countries.length} / 195 countries
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map((country) => (
          <CountryCard
            key={country.id}
            country={country}
            onSelect={onCountrySelect}
            searchQuery={searchQuery}
          />
        ))}
      </div>

      {countries.length > 0 && (
        <div className="text-center py-8 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {countries.length} of 195 countries worldwide
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Times update automatically every second
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryList;