import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "components/ui/Header";
import BreadcrumbNavigation from "components/ui/BreadcrumbNavigation";
import OfflineStatusBanner from "components/ui/OfflineStatusBanner";
import OfflineStatusCard from "./components/OfflineStatusCard";
import CacheInfoCard from "./components/CacheInfoCard";
import GeolocationCard from "./components/GeolocationCard";
import CachedCountryList from "./components/CachedCountryList";
import OfflineSearchInterface from "./components/OfflineSearchInterface";
import {
  OfflineStatus,
  CacheInfo,
  CachedCountry,
  GeolocationData,
  SearchResult,
} from "./types";
import { loadCountriesFromCache } from 'utils/restCountries';
import Navbar from "components/ui/Navbar";

const OfflineModePage = () => {
  const [offlineStatus, setOfflineStatus] = useState<OfflineStatus>({
    isOffline: !navigator.onLine,
    lastOnline: new Date(Date.now() - 1800000), // 30 minutes ago
    connectionAttempts: 3,
    isRetrying: false,
  });

  const [cacheInfo] = useState<CacheInfo>({
    totalCountries: 195,
    lastCacheUpdate: new Date(Date.now() - 3600000), // 1 hour ago
    cacheSize: "2.4 MB",
    isExpired: false,
  });

  const [cachedCountries, setCachedCountries] = useState<CachedCountry[]>(() => {
    const cached = loadCountriesFromCache();
    if (!cached || !cached.countries) {
      return [];
    }

    const countries = cached.countries as any[];
    return countries.map((c) => {
      const primaryTz = c.timezones && c.timezones[0];
      const regions = (c.timezones || []).slice(1).map((tz: any, idx: number) => ({
        id: `${c.id}-r-${idx}`,
        name: tz.name || tz.id || `Region ${idx + 1}`,
        timezone: tz.name || tz.id,
        utcOffset: tz.offset || 'UTC',
        currentTime: (tz.currentTime && new Date(tz.currentTime).toISOString()) || new Date().toISOString()
      }));

      return {
        id: c.id,
        name: c.name,
        flag: c.flag,
        timezone: primaryTz?.name || (regions[0] && regions[0].timezone) || '',
        utcOffset: primaryTz?.offset || 'UTC',
        currentTime: (primaryTz?.currentTime && new Date(primaryTz.currentTime).toISOString()) || new Date().toISOString(),
        lastUpdated: new Date(cached.cachedAt),
        regions: regions.length ? regions : undefined
      } as CachedCountry;
    });
  });

  const searchResults: SearchResult[] = cachedCountries.map((country) => ({
    id: country.id,
    name: country.name,
    country: country.name,
    timezone: country.timezone,
    flag: country.flag,
    isFromCache: true,
  }));

  useEffect(() => {
    const handleOnline = () => {
      setOfflineStatus((prev) => ({
        ...prev,
        isOffline: false,
        lastOnline: new Date(),
        isRetrying: false,
      }));
    };

    const handleOffline = () => {
      setOfflineStatus((prev) => ({
        ...prev,
        isOffline: true,
        isRetrying: false,
      }));
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetryConnection = () => {
    setOfflineStatus((prev) => ({
      ...prev,
      isRetrying: true,
      connectionAttempts: prev.connectionAttempts + 1,
    }));

    // Simulate retry attempt
    setTimeout(() => {
      if (navigator.onLine) {
        setOfflineStatus((prev) => ({
          ...prev,
          isOffline: false,
          lastOnline: new Date(),
          isRetrying: false,
        }));
      } else {
        setOfflineStatus((prev) => ({
          ...prev,
          isRetrying: false,
        }));
      }
    }, 2000);
  };

  const handleLocationUpdate = (locationData: GeolocationData) => {
    console.log("Location updated:", locationData);
  };

  const handleSearchResultSelect = (result: SearchResult) => {
    console.log("Search result selected:", result);
  };

  return (
    <>
      <Helmet>
        <title>Offline Mode - TerraTemps</title>
        <meta
          name="description"
          content="Access cached timezone data and location-based time information while offline. TerraTemps provides essential timezone functionality even without internet connectivity."
        />
        <meta
          name="keywords"
          content="offline timezone, cached time data, location time, offline world clock"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Navbar />

        <OfflineStatusBanner onRetry={handleRetryConnection} />

        <main className="pt-16 pb-8 lg:pl-72">
          <div className="max-w-7xl mx-auto px-4 py-6 lg:px-6">
            <div className="mb-6">
              <BreadcrumbNavigation customItems={[]} />
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-full">
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Offline Mode
                  </h1>
                  <p className="text-muted-foreground">
                    Essential timezone functionality with cached data
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <OfflineSearchInterface
                cachedData={searchResults}
                onResultSelect={handleSearchResultSelect}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[repeat(auto-fit,_minmax(30rem,1fr))] gap-6 mb-8">
              <div className="lg:col-span-2">
                <OfflineStatusCard
                  status={offlineStatus}
                  onRetry={handleRetryConnection}
                />
              </div>

              <div className="space-y-6">
                <CacheInfoCard cacheInfo={cacheInfo} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[repeat(auto-fit,_minmax(30rem,1fr))] gap-6 mb-8">
              <div>
                <CachedCountryList countries={cachedCountries} />
              </div>

              <div>
                <GeolocationCard onLocationUpdate={handleLocationUpdate} />
              </div>
            </div>

            <div className="bg-muted/30 border border-border rounded-lg p-6 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Limited Offline Functionality
                </h3>
                <p className="text-muted-foreground mb-4">
                  While offline, you can access cached timezone data, search
                  previously loaded countries, and view your current location
                  time. Connect to the internet to access full features and
                  real-time updates.
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span>Cached Data Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span>Location Services</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-warning rounded-full" />
                    <span>Limited Search</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default OfflineModePage;
