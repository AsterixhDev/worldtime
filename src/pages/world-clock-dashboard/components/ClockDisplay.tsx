import React, { useState, useEffect } from 'react';
import { ClockDisplayProps } from '../types';
import { useSettings } from '../../../contexts/SettingsContext';
import { getOffsetMinutesFor } from '../../../utils/restCountries';

function parseUTCOffset(tz: string): number | null {
  const match = tz.match(/^UTC([+-])(\d{1,2})(?::(\d{2}))?$/);
  if (!match) return null;
  const sign = match[1] === '+' ? 1 : -1;
  const hours = parseInt(match[2], 10);
  const minutes = parseInt(match[3] || '0', 10);
  return sign * (hours * 60 + minutes);
}

function toFixedOffsetDate(date: Date, offsetMinutes: number): Date {
  const localOffset = date.getTimezoneOffset(); // e.g. +480 for PST
  const diff = offsetMinutes - localOffset;
  return new Date(date.getTime() + diff * 60000);
}

const ClockDisplay = ({
  timezone,
  format24Hour,
  showSeconds = true,
  className = ''
}: ClockDisplayProps) => {
  const { settings } = useSettings();
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(new Date(now.getTime() + now.getTimezoneOffset() * 60000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const tzOffset = parseUTCOffset(timezone) ?? getOffsetMinutesFor(currentTime, timezone);
  const dateInTargetTz = toFixedOffsetDate(currentTime, tzOffset);

  const formattedTime = dateInTargetTz.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    ...(showSeconds && { second: '2-digit' }),
    hour12: settings.preferences.timeFormat === '12',
    timeZone: 'UTC'
  });

  // Dynamic time-of-day label
  const hour = dateInTargetTz.getUTCHours();

  const getTimeOfDay = (h: number) => {
    if (h >= 5 && h < 12) return 'morning';
    if (h >= 12 && h < 17) return 'afternoon';
    if (h >= 17 && h < 21) return 'evening';
    return 'night';
  };

  const timeOfDay = getTimeOfDay(hour);
  const timeColors = {
    morning: 'text-amber-600',
    afternoon: 'text-blue-600',
    evening: 'text-orange-600',
    night: 'text-indigo-600'
  };

  return (
    <div className={`flex flex-col items-center space-y-1 ${className}`}>
      <div
        className={`font-mono text-2xl md:text-3xl font-bold ${timeColors[timeOfDay]} transition-colors duration-300`}
      >
        {formattedTime}
      </div>
      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
        {timeOfDay}
      </div>
    </div>
  );
};

export default ClockDisplay;
