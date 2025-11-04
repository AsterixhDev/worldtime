export interface TimezoneInfo {
  id: string;
  name: string;
  abbreviation: string;
  gmtOffset: string;
  currentTime: Date;
  isDaylightSaving: boolean;
  dstTransition?: {
    next: Date;
    type: 'start' | 'end';
  };
}

export interface RegionData {
  id: string;
  name: string;
  type: 'state' | 'province' | 'territory' | 'region';
  timezones: TimezoneInfo[];
}

export interface CountryTimezoneData {
  id: string;
  name: string;
  code: string;
  flag: string;
  flagAlt: string;
  capital: string;
  population: number;
  area: number;
  currency: string;
  languages: string[];
  regions: RegionData[];
  totalTimezones: number;
  mainTimezone: TimezoneInfo;
}

export interface TimeDisplayProps {
  time: Date;
  timezone: string;
  format?: '12h' | '24h';
  showSeconds?: boolean;
  className?: string;
}

export interface TimezoneCardProps {
  timezone: TimezoneInfo;
  regionName: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export interface RegionSectionProps {
  region: RegionData;
  isExpanded: boolean;
  onToggle: () => void;
}

export interface CountryHeaderProps {
  country: CountryTimezoneData;
  onBack: () => void;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}