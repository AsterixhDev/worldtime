import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useSearchParams } from "react-router-dom";
import Header from "components/ui/Header";
import SearchInterface from "components/ui/SearchInterface";
import BreadcrumbNavigation from "components/ui/BreadcrumbNavigation";
import OfflineStatusBanner from "components/ui/OfflineStatusBanner";
import CountryHeader from "./components/CountryHeader";
import RegionSection from "./components/RegionSection";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import CountryInfoCard from "./components/CountryInfoCard";
import CountryStatsCard from "./components/CountryStatsCard";
import CountryMapCard from "./components/CountryMapCard";
import CountryCodesCard from "./components/CountryCodesCard";
import { CountryTimezoneData, LoadingState as LoadingStateType } from "./types";
import Navbar from "components/ui/Navbar";
import { Country } from "pages/world-clock-dashboard/types";

const CountryTimezoneDetails = () => {
  const location = useLocation();
  const {country} = (location.state || {}) as {country?:Country};
  const [searchParams] = useSearchParams();
  const [countryData, setCountryData] = useState<CountryTimezoneData | null>(
    null
  );
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(
    new Set()
  );
  const [loadingState, setLoadingState] = useState<LoadingStateType>({
    isLoading: true,
    error: null,
    lastUpdated: null,
  });

  // Add this block - Mock handler functions for required component props
  const handleSearch = (query: string) => {
    // Search functionality would be implemented here
    console.log("Search:", query);
  };

  const handleResultSelect = (result: any) => {
    // Result selection would be implemented here
    console.log("Selected:", result);
  };

  const handleOfflineRetry = () => {
    // Offline retry functionality would be implemented here
    window.location.reload();
  };
  // End of added block

  useEffect(() => {
    const loadCountryData = async () => {
      setLoadingState({ isLoading: true, error: null, lastUpdated: null });

      try {
        let countryCode = country?.code || searchParams.get("country");

        if (!countryCode) {
          // Try to get user's location if no country code is provided
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              if (!navigator.geolocation) {
                reject(new Error("Geolocation not supported"));
                return;
              }
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 10000,
                enableHighAccuracy: false
              });
            });


            // Use reverse geocoding to get country code from coordinates
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );



            const locationData = await response.json();
            countryCode = locationData.countryCode?.toLowerCase();
          } catch (geoError) {
            throw new Error("No country code provided and unable to determine location. Please provide a country code or allow location access.");
          }
        }

        // Always fetch detailed data from API for consistency
        const { fetchCountryByCode } = await import("../../utils/restCountries");
        const data = await fetchCountryByCode(countryCode!);

        setCountryData(data);
        setLoadingState({
          isLoading: false,
          error: null,
          lastUpdated: new Date(),
        });

        // Expand first region by default
        setExpandedRegions(new Set([data.regions[0]?.id]));
      } catch (error) {
        setLoadingState({
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
          lastUpdated: null,
        });
      }
    };

    loadCountryData();
  }, [searchParams, country]);

  const handleRetry = () => {
    setCountryData(null);
    setExpandedRegions(new Set());
    // Trigger reload
    window.location.reload();
  };

  const handleBack = () => {
    // This will be handled by CountryHeader component
  };
  const toggleRegion = (regionId: string) => {
    setExpandedRegions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(regionId)) {
        newSet.delete(regionId);
      } else {
        newSet.add(regionId);
      }
      return newSet;
    });
  };

  if (loadingState.isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading Timezone Details - WorldTimeSage</title>
          <meta
            name="description"
            content="Loading detailed timezone information for the selected country"
          />
        </Helmet>
        <Header />
        <SearchInterface
          onSearch={handleSearch}
          onResultSelect={handleResultSelect}
        />
        <OfflineStatusBanner onRetry={handleOfflineRetry} />
        <LoadingState />
      </>
    );
  }

  if (loadingState.error) {
    return (
      <>
        <Helmet>
          <title>Error Loading Timezone Details - WorldTimeSage</title>
          <meta
            name="description"
            content="Error occurred while loading timezone information"
          />
        </Helmet>
        <Header />
        <SearchInterface
          onSearch={handleSearch}
          onResultSelect={handleResultSelect}
        />
        <OfflineStatusBanner onRetry={handleOfflineRetry} />
        <ErrorState error={loadingState.error} onRetry={handleRetry} />
      </>
    );
  }

  if (!countryData) {
    return (
      <>
        <Helmet>
          <title>Country Not Found - WorldTimeSage</title>
          <meta
            name="description"
            content="The requested country timezone information could not be found"
          />
        </Helmet>
        <Header />
        <SearchInterface
          onSearch={handleSearch}
          onResultSelect={handleResultSelect}
        />
        <OfflineStatusBanner onRetry={handleOfflineRetry} />
        <ErrorState error="Country data not found" onRetry={handleRetry} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{countryData.name} Timezone Details - WorldTimeSage</title>
        <meta
          name="description"
          content={`Detailed timezone information for ${countryData.name} including ${countryData.totalTimezones} different time zones across all regions and states`}
        />

        <meta
          name="keywords"
          content={`${countryData.name}, timezone, world clock, time zones, ${countryData.code}, GMT offset`}
        />
      </Helmet>

      <Header />
      <Navbar />

      <div className="pb-8 lg:pl-72 w-full">
        <SearchInterface
          onSearch={handleSearch}
          onResultSelect={handleResultSelect}
        />
        <OfflineStatusBanner onRetry={handleOfflineRetry} />

        <main className="min-h-screen bg-background pt-16">
          <div className="max-w-7xl mx-auto px-4 py-6 lg:px-6">
            <div className="mb-6">
              <BreadcrumbNavigation customItems={[]} />
            </div>

            <CountryHeader country={countryData} onBack={handleBack} />

            {/* Country Information Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <CountryInfoCard country={countryData} />
              <CountryStatsCard country={countryData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <CountryMapCard country={countryData} />
              <CountryCodesCard country={countryData} />
            </div>

            {/* Timezone Information */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Regional Timezones
                </h2>
                <div className="text-sm text-muted-foreground">
                  {countryData.regions.length} region
                  {countryData.regions.length !== 1 ? "s" : ""} &bull;
                  {countryData.totalTimezones} timezone
                  {countryData.totalTimezones !== 1 ? "s" : ""}
                </div>
              </div>

              <div className="space-y-4">
                {countryData.regions.map((region) => (
                  <RegionSection
                    key={region.id}
                    region={region}
                    isExpanded={expandedRegions.has(region.id)}
                    onToggle={() => toggleRegion(region.id)}
                  />
                ))}
              </div>
            </div>

            {loadingState.lastUpdated && (
              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">
                  Last updated: {loadingState.lastUpdated.toLocaleString()}{" "}
                  &bull; Times update automatically every second
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default CountryTimezoneDetails;
