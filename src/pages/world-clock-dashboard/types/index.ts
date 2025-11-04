export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  timezones: Timezone[];
  region: string;
  subregion: string;
  capital?: string;
  population?: number;
}

export interface Timezone {
  id: string;
  name: string;
  offset: string;
  offsetMinutes: number;
  abbreviation: string;
  isDST: boolean;
  currentTime: Date;
}

export interface SearchResult {
  id: string;
  name: string;
  country: string;
  timezone: string;
  flag: string;
}

export interface ClockDisplayProps {
  time: Date;
  timezone: string;
  format24Hour?: boolean;
  showSeconds?: boolean;
  className?: string;
}

export interface CountryCardProps {
  country: Country;
  onSelect: (country: Country) => void;
  isLoading?: boolean;
  searchQuery?: string;
}

export interface CountryListProps {
  countries: Country[];
  onCountrySelect: (country: Country) => void;
  searchQuery: string;
  isLoading: boolean;
}

export interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onResultSelect: (result: SearchResult) => void;
  isSearching: boolean;
  resultCount: number;
}

export interface GeolocationPromptProps {
  onAccept: () => void;
  onDecline: () => void;
  isVisible: boolean;
}

export interface PWAInstallPromptProps {
  onInstall: () => void;
  onDismiss: () => void;
  isVisible: boolean;
}

export interface DashboardState {
  countries: Country[];
  filteredCountries: Country[];
  searchQuery: string;
  isLoading: boolean;
  isSearching: boolean;
  selectedCountry: Country | null;
  userTimezone: string;
  showGeolocationPrompt: boolean;
  showPWAPrompt: boolean;
  lastUpdated: Date | null;
  error: string | null;
}

export interface DashboardFilters {
  region?: string;
  searchQuery: string;
  sortBy: 'name' | 'timezone' | 'region';
  sortOrder: 'asc' | 'desc';
}