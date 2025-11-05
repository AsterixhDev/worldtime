import React, { useState, useEffect } from 'react';
import { TimeDisplayProps } from '../types';
import { useSettings } from '../../../contexts/SettingsContext';
import { getOffsetMinutesFor } from '../../../utils/restCountries';

// Parse "UTC+03:00" → 180 minutes
function parseUTCOffset(tz: string): number | null {
  const match = tz.match(/^UTC([+-])(\d{1,2})(?::(\d{2}))?$/);
  if (!match) return null;
  const sign = match[1] === '+' ? 1 : -1;
  const hours = parseInt(match[2], 10);
  const minutes = parseInt(match[3] || '0', 10);
  return sign * (hours * 60 + minutes);
}

// Convert local system time to target offset (in minutes)
function toFixedOffsetDate(date: Date, offsetMinutes: number): Date {
  // getTimezoneOffset() returns minutes *behind* UTC (positive west of UTC)
  const localOffset = date.getTimezoneOffset();
  const diff = offsetMinutes - localOffset;
  return new Date(date.getTime() + diff * 60000);
}

const TimeDisplay = ({
  timezone,
  format,
  showSeconds = true,
  className = ''
}: TimeDisplayProps) => {
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

  // Time formatting
  const formattedTime = (() => {
    const use12Hour = settings.preferences.timeFormat === '12';
    const tzOffset = parseUTCOffset(timezone) ?? getOffsetMinutesFor(currentTime, timezone);
    const dateInTz = toFixedOffsetDate(currentTime, tzOffset);
    return dateInTz.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      ...(showSeconds && { second: '2-digit' }),
      hour12: use12Hour,
      timeZone: 'UTC'
    });
  })();

  // Date formatting
  const formattedDate = (() => {
    const tzOffset = parseUTCOffset(timezone) ?? getOffsetMinutesFor(currentTime, timezone);
    const dateInTz = toFixedOffsetDate(currentTime, tzOffset);
    return dateInTz.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  })();

  return (
    <div className={`text-center ${className}`}>
      <div className="font-mono text-3xl md:text-4xl font-bold text-foreground mb-1">
        {formattedTime}
      </div>
      <div className="text-sm text-muted-foreground">
        {formattedDate}
      </div>
      <div className="text-xs text-muted-foreground mt-1 font-medium">
        {timezone}
      </div>
    </div>
  );
};

export default TimeDisplay;
