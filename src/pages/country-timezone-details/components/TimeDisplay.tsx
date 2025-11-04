import React, { useState, useEffect } from 'react';
import { TimeDisplayProps } from '../types';

const TimeDisplay = ({ 
  time, 
  timezone, 
  format = '24h', 
  showSeconds = true, 
  className = '' 
}: TimeDisplayProps) => {
  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    setCurrentTime(time);
    
    const interval = setInterval(() => {
      setCurrentTime(new Date(currentTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [time, currentTime]);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...(showSeconds && { second: '2-digit' }),
      hour12: format === '12h',
      timeZone: 'UTC'
    };

    return date.toLocaleTimeString('en-US', options);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  };

  return (
    <div className={`text-center ${className}`}>
      <div className="font-mono text-3xl md:text-4xl font-bold text-foreground mb-1">
        {formatTime(currentTime)}
      </div>
      <div className="text-sm text-muted-foreground">
        {formatDate(currentTime)}
      </div>
      <div className="text-xs text-muted-foreground mt-1 font-medium">
        {timezone}
      </div>
    </div>
  );
};

export default TimeDisplay;