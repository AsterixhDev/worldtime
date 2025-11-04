import React, { useState, useEffect } from 'react';
import { ClockDisplayProps } from '../types';

const ClockDisplay = ({ 
  time, 
  timezone, 
  format24Hour = false, 
  showSeconds = true,
  className = '' 
}: ClockDisplayProps) => {
  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    setCurrentTime(time);
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date(currentTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...(showSeconds && { second: '2-digit' }),
      hour12: !format24Hour,
      timeZone: timezone
    };

    return date.toLocaleTimeString('en-US', options);
  };

  const getTimeOfDay = (date: Date) => {
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  const timeOfDay = getTimeOfDay(currentTime);
  const timeColors = {
    morning: 'text-amber-600',
    afternoon: 'text-blue-600',
    evening: 'text-orange-600',
    night: 'text-indigo-600'
  };

  return (
    <div className={`flex flex-col items-center space-y-1 ${className}`}>
      <div className={`font-mono text-2xl md:text-3xl font-bold ${timeColors[timeOfDay]} transition-colors duration-300`}>
        {formatTime(currentTime)}
      </div>
      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
        {timeOfDay}
      </div>
    </div>
  );
};

export default ClockDisplay;