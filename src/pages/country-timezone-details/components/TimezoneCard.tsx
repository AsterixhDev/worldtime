import React from 'react';
import Icon from 'components/AppIcon';
import { TimezoneCardProps } from '../types';
import TimeDisplay from './TimeDisplay';

const TimezoneCard = ({ 
  timezone, 
  regionName, 
  isExpanded = false, 
  onToggle 
}: TimezoneCardProps) => {
  const getDstStatus = () => {
    if (!timezone.isDaylightSaving) return null;
    
    return (
      <div className="flex items-center space-x-1 text-xs text-accent">
        <Icon name="Sun" size={12} />
        <span>DST Active</span>
      </div>
    );
  };

  const getNextDstTransition = () => {
    if (!timezone.dstTransition) return null;
    
    const transitionDate = timezone.dstTransition.next.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    
    return (
      <div className="text-xs text-muted-foreground">
        Next {timezone.dstTransition.type === 'start' ? 'DST starts' : 'DST ends'}: {transitionDate}
      </div>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevation-md transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">
            {timezone.name}
          </h4>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{regionName}</span>
            <span>•</span>
            <span className="font-mono">{timezone.abbreviation}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {getDstStatus()}
          <div className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
            {timezone.gmtOffset}
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-3">
        <TimeDisplay
          time={timezone.currentTime}
          timezone={timezone.abbreviation}
          format="24h"
          showSeconds={true}
          className="mb-2"
        />
        
        {getNextDstTransition()}
      </div>

      {onToggle && (
        <button
          onClick={onToggle}
          className="w-full mt-3 pt-3 border-t border-border flex items-center justify-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
        >
          <span>{isExpanded ? 'Show less' : 'Show details'}</span>
          <Icon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
          />
        </button>
      )}
    </div>
  );
};

export default TimezoneCard;