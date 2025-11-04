import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import Header from "components/ui/Header";
import SearchInterface from "components/ui/SearchInterface";
import BreadcrumbNavigation from "components/ui/BreadcrumbNavigation";
import OfflineStatusBanner from "components/ui/OfflineStatusBanner";
import CountryHeader from "./components/CountryHeader";
import RegionSection from "./components/RegionSection";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import { CountryTimezoneData, LoadingState as LoadingStateType } from "./types";
import Navbar from "components/ui/Navbar";

const CountryTimezoneDetails = () => {
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

  // Mock data for demonstration
  const mockCountryData: CountryTimezoneData = {
    id: "us",
    name: "United States",
    code: "US",
    flag: "https://images.unsplash.com/photo-1712022803338-2bca695a9899",
    flagAlt: "American flag waving against blue sky with white clouds",
    capital: "Washington, D.C.",
    population: 331900000,
    area: 9833517,
    currency: "USD",
    languages: ["English"],
    totalTimezones: 9,
    mainTimezone: {
      id: "est",
      name: "Eastern Standard Time",
      abbreviation: "EST",
      gmtOffset: "-5:00",
      currentTime: new Date(),
      isDaylightSaving: false,
      dstTransition: {
        next: new Date("2024-03-10"),
        type: "start",
      },
    },
    regions: [
      {
        id: "eastern",
        name: "Eastern Region",
        type: "region",
        timezones: [
          {
            id: "est",
            name: "Eastern Standard Time",
            abbreviation: "EST",
            gmtOffset: "-5:00",
            currentTime: new Date(),
            isDaylightSaving: false,
            dstTransition: {
              next: new Date("2024-03-10"),
              type: "start",
            },
          },
          {
            id: "edt",
            name: "Eastern Daylight Time",
            abbreviation: "EDT",
            gmtOffset: "-4:00",
            currentTime: new Date(Date.now() + 3600000),
            isDaylightSaving: true,
            dstTransition: {
              next: new Date("2024-11-03"),
              type: "end",
            },
          },
        ],
      },
      {
        id: "central",
        name: "Central Region",
        type: "region",
        timezones: [
          {
            id: "cst",
            name: "Central Standard Time",
            abbreviation: "CST",
            gmtOffset: "-6:00",
            currentTime: new Date(Date.now() - 3600000),
            isDaylightSaving: false,
          },
          {
            id: "cdt",
            name: "Central Daylight Time",
            abbreviation: "CDT",
            gmtOffset: "-5:00",
            currentTime: new Date(),
            isDaylightSaving: true,
            dstTransition: {
              next: new Date("2024-11-03"),
              type: "end",
            },
          },
        ],
      },
      {
        id: "mountain",
        name: "Mountain Region",
        type: "region",
        timezones: [
          {
            id: "mst",
            name: "Mountain Standard Time",
            abbreviation: "MST",
            gmtOffset: "-7:00",
            currentTime: new Date(Date.now() - 7200000),
            isDaylightSaving: false,
          },
          {
            id: "mdt",
            name: "Mountain Daylight Time",
            abbreviation: "MDT",
            gmtOffset: "-6:00",
            currentTime: new Date(Date.now() - 3600000),
            isDaylightSaving: true,
            dstTransition: {
              next: new Date("2024-11-03"),
              type: "end",
            },
          },
        ],
      },
      {
        id: "pacific",
        name: "Pacific Region",
        type: "region",
        timezones: [
          {
            id: "pst",
            name: "Pacific Standard Time",
            abbreviation: "PST",
            gmtOffset: "-8:00",
            currentTime: new Date(Date.now() - 10800000),
            isDaylightSaving: false,
          },
          {
            id: "pdt",
            name: "Pacific Daylight Time",
            abbreviation: "PDT",
            gmtOffset: "-7:00",
            currentTime: new Date(Date.now() - 7200000),
            isDaylightSaving: true,
            dstTransition: {
              next: new Date("2024-11-03"),
              type: "end",
            },
          },
        ],
      },
      {
        id: "alaska",
        name: "Alaska",
        type: "state",
        timezones: [
          {
            id: "akst",
            name: "Alaska Standard Time",
            abbreviation: "AKST",
            gmtOffset: "-9:00",
            currentTime: new Date(Date.now() - 14400000),
            isDaylightSaving: false,
          },
        ],
      },
      {
        id: "hawaii",
        name: "Hawaii",
        type: "state",
        timezones: [
          {
            id: "hst",
            name: "Hawaii Standard Time",
            abbreviation: "HST",
            gmtOffset: "-10:00",
            currentTime: new Date(Date.now() - 18000000),
            isDaylightSaving: false,
          },
        ],
      },
    ],
  };

  useEffect(() => {
    const loadCountryData = async () => {
      setLoadingState({ isLoading: true, error: null, lastUpdated: null });

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // In a real app, this would fetch data based on searchParams
        const countryId = searchParams.get("country") || "us";

        // Simulate potential error
        if (Math.random() < 0.1) {
          throw new Error("Failed to fetch timezone data from server");
        }

        setCountryData(mockCountryData);
        setLoadingState({
          isLoading: false,
          error: null,
          lastUpdated: new Date(),
        });

        // Expand first region by default
        setExpandedRegions(new Set([mockCountryData.regions[0]?.id]));
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
  }, [searchParams]);

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
          <title>Loading Timezone Details - WorldTime Pro</title>
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
          <title>Error Loading Timezone Details - WorldTime Pro</title>
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
          <title>Country Not Found - WorldTime Pro</title>
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
        <title>{countryData.name} Timezone Details - WorldTime Pro</title>
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

      <div className="w-full">
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
