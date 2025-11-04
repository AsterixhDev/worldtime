export interface CachedCountry {
  id: string;
  name: string;
  flag: string;
  timezone: string;
  utcOffset: string;
  currentTime: string;
  lastUpdated: Date;
  regions?: CachedRegion[];
}

export interface CachedRegion {
  id: string;
  name: string;
  timezone: string;
  utcOffset: string;
  currentTime: string;
}

export interface GeolocationData {
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
  city: string;
  currentTime: string;
  utcOffset: string;
  accuracy: number;
}

export interface OfflineStatus {
  isOffline: boolean;
  lastOnline: Date | null;
  connectionAttempts: number;
  isRetrying: boolean;
}

export interface CacheInfo {
  totalCountries: number;
  lastCacheUpdate: Date | null;
  cacheSize: string;
  isExpired: boolean;
}

export interface SearchResult {
  id: string;
  name: string;
  country: string;
  timezone: string;
  flag: string;
  isFromCache: boolean;
}