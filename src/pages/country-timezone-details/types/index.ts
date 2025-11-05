export interface TimezoneInfo {
  id: string;
  name: string;
  abbreviation: string;
  gmtOffset: string;
  offsetMinutes: number;
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
  officialName: string;
  nativeName: Record<string, { official: string; common: string }>;
  code: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  flag: string;
  flagAlt: string;
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  area: number;
  latlng: [number, number];
  landlocked: boolean;
  borders: string[];
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Record<string, { name: string; symbol: string }>;
  idd: { root: string; suffixes: string[] };
  languages: Record<string, string>;
  demonyms: Record<string, { f: string; m: string }>;
  tld: string[];
  car: { signs: string[]; side: string };
  timezones: string[];
  continents: string[];
  fifa: string;
  startOfWeek: string;
  capitalInfo: { latlng: [number, number] };
  postalCode: { format: string; regex: string };
  gini: Record<string, number>;
  translations: Record<string, { official: string; common: string }>;
  maps: { googleMaps: string; openStreetMaps: string };
  coatOfArms: { png: string; svg: string };
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