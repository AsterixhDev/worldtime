import React from 'react';
import Icon from 'components/AppIcon';
import { RegionSectionProps } from '../types';
import TimezoneCard from './TimezoneCard';

const RegionSection = ({ region, isExpanded, onToggle }: RegionSectionProps) => {
  const getRegionIcon = (type: string) => {
    switch (type) {
      case 'state':
        return 'MapPin';
      case 'province':
        return 'Map';
      case 'territory':
        return 'Compass';
      default:
        return 'Globe';
    }
  };

  const getRegionTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 bg-muted/30 hover:bg-muted/50 transition-smooth flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <Icon 
            name={getRegionIcon(region.type)} 
            size={20} 
            className="text-primary" 
          />
          <div className="text-left">
            <h3 className="font-semibold text-foreground">
              {region.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{getRegionTypeLabel(region.type)}</span>
              <span>•</span>
              <span>{region.timezones.length} timezone{region.timezones.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            {isExpanded ? 'Collapse' : 'Expand'}
          </div>
          <Icon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            size={20} 
            className="text-muted-foreground" 
          />
        </div>
      </button>

      {isExpanded && (
        <div className="p-6 space-y-4">
          {region.timezones.map((timezone) => (
            <TimezoneCard
              key={timezone.id}
              timezone={timezone}
              regionName={region.name}
              onToggle={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RegionSection;