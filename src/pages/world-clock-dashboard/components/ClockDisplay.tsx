import React, { useState, useEffect } from 'react';
import { ClockDisplayProps } from '../types';

// Helper: parse UTC offset like "UTC+03:00" → 180 (minutes)
function parseUTCOffset(tz: string): number | null {
  const match = tz.match(/^UTC([+-])(\d{1,2})(?::(\d{2}))?$/);
  if (!match) return null;
  const sign = match[1] === '+' ? 1 : -1;
  const hours = parseInt(match[2], 10);
  const minutes = parseInt(match[3] || '0', 10);
  return sign * (hours * 60 + minutes);
}

// Helper: get local time adjusted by offset manually
function formatTimeWithOffset(
  date: Date,
  offsetMinutes: number,
  showSeconds: boolean,
  format24Hour: boolean
): string {
  const local = new Date(date.getTime() - offsetMinutes * 60000);
  return local.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    ...(showSeconds && { second: '2-digit' }),
    hour12: !format24Hour
  });
}

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
      setCurrentTime((prev) => new Date(prev.getTime() + 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const offset = parseUTCOffset(timezone);
    if (offset !== null) {
      // Manual offset handling for UTC±hh:mm
      return formatTimeWithOffset(date, offset, showSeconds, format24Hour);
    }

    // IANA timezone support (e.g. "Europe/Paris")
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...(showSeconds && { second: '2-digit' }),
      hour12: !format24Hour,
      timeZone: timezone
    };

    try {
      return date.toLocaleTimeString('en-US', options);
    } catch {
      // Fallback to system time if invalid
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        ...(showSeconds && { second: '2-digit' }),
        hour12: !format24Hour
      });
    }
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
      <div
        className={`font-mono text-2xl md:text-3xl font-bold ${timeColors[timeOfDay]} transition-colors duration-300`}
      >
        {formatTime(currentTime)}
      </div>
      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
        {timeOfDay}
      </div>
    </div>
  );
};

export default ClockDisplay;
