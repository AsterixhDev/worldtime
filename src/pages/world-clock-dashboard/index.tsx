import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Fuse from "fuse.js";
import {
  Country,
  DashboardState,
  SearchResult,
  DashboardFilters,
} from "./types";
import Header from "components/ui/Header";
import SearchInterface from "components/ui/SearchInterface";
import {
  fetchAllCountries,
  saveCountriesToCache,
  loadCountriesFromCache,
} from "utils/restCountries";

import OfflineStatusBanner from "components/ui/OfflineStatusBanner";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";
import Filters from "./components/Filters";
import GeolocationPrompt from "./components/GeolocationPrompt";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import Icon from "components/AppIcon";
import Button from "components/ui/Button";
import Navbar from "components/ui/Navbar";

const WorldClockDashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL params
  const getInitialFilters = (): DashboardFilters => {
    const sortBy =
      (searchParams.get("sortBy") as DashboardFilters["sortBy"]) || "name";
    const sortOrder =
      (searchParams.get("sortOrder") as DashboardFilters["sortOrder"]) ||
      "desc";
    const searchQuery = searchParams.get("q") || "";

    return {
      searchQuery,
      sortBy,
      sortOrder,
    };
  };

  // Get current page from URL params
  const getCurrentPage = (): number => {
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    return isNaN(page) || page < 1 ? 1 : page;
  };

  const [currentPage, setCurrentPage] = useState<number>(getCurrentPage());

  const [state, setState] = useState<DashboardState>({
    countries: [],
    filteredCountries: [],
    searchQuery: getInitialFilters().searchQuery,
    isLoading: true,
    isSearching: false,
    selectedCountry: null,
    userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    showGeolocationPrompt: false,
    showPWAPrompt: false,
    lastUpdated: null,
    error: null,
    filters: getInitialFilters(),
  });

  // Try to load cached countries first, otherwise fetch from REST Countries API

  // Initialize data and check for prompts
  useEffect(() => {
    const initializeDashboard = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        // Try cached data first
        const cached = loadCountriesFromCache();
        if (cached && cached.countries && cached.countries.length > 0) {
          setState((prev) => ({
            ...prev,
            countries: cached.countries,
            filteredCountries: cached.countries,
            isLoading: false,
            lastUpdated: new Date(cached.cachedAt),
          }));
        } else {
          // show loading state briefly while fetching
          await new Promise((resolve) => setTimeout(resolve, 400));
        }

        // Fetch fresh data in background
        fetchAllCountries()
          .then((countries) => {
            setState((prev) => ({
              ...prev,
              countries,
              filteredCountries: countries,
              isLoading: false,
              lastUpdated: new Date(),
            }));
            saveCountriesToCache(countries);
          })
          .catch((err) => {
            console.error("Failed to fetch countries:", err);
            if (!cached) {
              setState((prev) => ({
                ...prev,
                error: "Failed to load country data",
                isLoading: false,
              }));
            }
          });

        // Check for geolocation prompt
        const hasAskedGeolocation = localStorage.getItem("geolocation-asked");
        if (!hasAskedGeolocation && "geolocation" in navigator) {
          setTimeout(() => {
            setState((prev) => ({ ...prev, showGeolocationPrompt: true }));
          }, 2000);
        }

        // Check for PWA install prompt
        const hasAskedPWA = localStorage.getItem("pwa-asked");
        if (!hasAskedPWA && "serviceWorker" in navigator) {
          setTimeout(() => {
            setState((prev) => ({ ...prev, showPWAPrompt: true }));
          }, 5000);
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: "Failed to load country data",
          isLoading: false,
        }));
      }
    };

    initializeDashboard();
  }, []);

  // Sync filters with URL params and apply filtering when data is loaded
  useEffect(() => {
    if (
      !state.isLoading &&
      state.countries.length > 0 &&
      state.searchQuery !== undefined
    ) {
      handleSearch(state.searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchQuery]);

  useEffect(() => {
  if (!state.isLoading && state.countries.length > 0) {
    handleSearch(state.filters.searchQuery);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [state.filters.sortBy, state.filters.sortOrder]);
  useEffect(() => {
    const interval = setInterval(() => {
      const utcNow = Date.now() + new Date().getTimezoneOffset() * 60 * 1000;

      setState((prev) => ({
        ...prev,
        countries: prev.countries.map((country) => ({
          ...country,
          timezones: country.timezones.map((tz) => ({
            ...tz,
            currentTime: new Date(utcNow + tz.offsetMinutes * 60 * 1000),
          })),
        })),
        filteredCountries: prev.filteredCountries.map((country) => ({
          ...country,
          timezones: country.timezones.map((tz) => ({
            ...tz,
            currentTime: new Date(utcNow + tz.offsetMinutes * 60 * 1000),
          })),
        })),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle search functionality with fuzzy search
  const handleSearch = useCallback(
    (query: string) => {
      setState((prev) => ({
        ...prev,
        searchQuery: query,
        filters: { ...prev.filters, searchQuery: query },
        isSearching: true,
      }));

      // Update URL params for search query
      const newParams = new URLSearchParams(searchParams);
      if (query) newParams.set("q", query);
      else newParams.delete("q");
      setSearchParams(newParams);

      // Simulate async search
      setTimeout(() => {
        setState((prev) => {
          let filtered = prev.countries;

          if (query.trim()) {
            const fuse = new Fuse(prev.countries, {
              keys: [
                { name: "name", weight: 0.4 },
                { name: "region", weight: 0.2 },
                { name: "subregion", weight: 0.2 },
                { name: "capital", weight: 0.3 },
                { name: "timezones.name", weight: 0.3 },
                { name: "timezones.abbreviation", weight: 0.3 },
              ],
              threshold: 0.3,
              includeScore: true,
            });

            const results = fuse.search(query.trim());
            filtered = results.map((result) => result.item);
          }

          // Sorting
          filtered = [...filtered].sort((a, b) => {
            let aValue, bValue;
            switch (prev.filters.sortBy) {
              case "name":
                aValue = a.name.toLowerCase();
                bValue = b.name.toLowerCase();
                break;
              case "population":
                aValue = a.population || 0;
                bValue = b.population || 0;
                break;
              case "landmass":
                aValue = a.region.toLowerCase();
                bValue = b.region.toLowerCase();
                break;
              case "timezones":
                aValue = a.timezones.length;
                bValue = b.timezones.length;
                break;
              default:
                aValue = a.name.toLowerCase();
                bValue = b.name.toLowerCase();
            }

            return prev.filters.sortOrder === "asc"
              ? aValue < bValue
                ? -1
                : aValue > bValue
                ? 1
                : 0
              : aValue > bValue
              ? -1
              : aValue < bValue
              ? 1
              : 0;
          });

          return {
            ...prev,
            filteredCountries: filtered,
            isSearching: false, // ✅ safely stop spinner
          };
        });
      }, 300);
    },
    [searchParams, setSearchParams]
  );

  // Calculate pagination
  const ITEMS_PER_PAGE = 10;
  const totalItems = state.filteredCountries.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCountries = state.filteredCountries.slice(
    startIndex,
    endIndex
  );

  const handleCountrySelect = (country: Country) => {
    setState((prev) => ({ ...prev, selectedCountry: country }));
    navigate(
      `/country-timezone-details?country=${country.code.toLowerCase()}`,
      { state: { country } }
    );
  };

  const handleSearchResultSelect = (result: SearchResult) => {
    const country = state.countries.find((c) => c.id === result.id);
    if (country) {
      handleCountrySelect(country);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (page > 1) {
      newParams.set("page", page.toString());
    } else {
      newParams.delete("page");
    }
    setSearchParams(newParams);
  };

  const handleFiltersChange = (filters: DashboardFilters) => {
    setState((prev) => ({ ...prev, filters }));

    // Reset to page 1 when filters change
    setCurrentPage(1);

    // Re-apply search and sorting with new filters
    handleSearch(filters.searchQuery);
  };

  const handleGeolocationAccept = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location granted:", position.coords);
        localStorage.setItem("geolocation-asked", "true");
        setState((prev) => ({ ...prev, showGeolocationPrompt: false }));
      },
      (error) => {
        console.error("Geolocation error:", error);
        localStorage.setItem("geolocation-asked", "true");
        setState((prev) => ({ ...prev, showGeolocationPrompt: false }));
      }
    );
  };

  const handleGeolocationDecline = () => {
    localStorage.setItem("geolocation-asked", "true");
    setState((prev) => ({ ...prev, showGeolocationPrompt: false }));
  };

  const handlePWAInstall = () => {
    // PWA install logic would go here
    localStorage.setItem("pwa-asked", "true");
    setState((prev) => ({ ...prev, showPWAPrompt: false }));
  };

  const handlePWADismiss = () => {
    localStorage.setItem("pwa-asked", "true");
    setState((prev) => ({ ...prev, showPWAPrompt: false }));
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navbar />

      <OfflineStatusBanner onRetry={handleRetry} />

      <main className="pt-16 pb-8 lg:pl-72">
        <SearchBar
          query={state.searchQuery}
          onQueryChange={handleSearch}
          onResultSelect={handleSearchResultSelect}
          isSearching={state.isSearching}
          resultCount={state.filteredCountries.length}
        />

        <Filters
          filters={state.filters}
          onFiltersChange={handleFiltersChange}
        />

        <div className="max-w-7xl mx-auto px-4 py-8 lg:px-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  World Clock Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Real-time timezone information for countries worldwide
                </p>
              </div>

              <div className="hidden lg:flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg">
                  <Icon
                    name="Clock"
                    size={16}
                    className="text-muted-foreground"
                  />
                  <span className="text-sm text-muted-foreground">
                    Live updates
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/offline-mode")}
                  iconName="WifiOff"
                  iconPosition="left"
                  iconSize={16}
                >
                  Offline Mode
                </Button>
              </div>
            </div>

            {state.lastUpdated && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="RefreshCw" size={14} />
                <span>
                  Last updated: {state.lastUpdated.toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>

          {state.error ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto flex flex-col items-center">
                <Icon
                  name="AlertCircle"
                  size={48}
                  className="mx-auto mb-4 text-error"
                />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Unable to Load Data
                </h3>
                <p className="text-muted-foreground mb-6">{state.error}</p>
                <Button
                  variant="default"
                  onClick={handleRetry}
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={16}
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <CountryList
              countries={paginatedCountries}
              onCountrySelect={handleCountrySelect}
              searchQuery={state.searchQuery}
              isLoading={state.isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>

      <GeolocationPrompt
        onAccept={handleGeolocationAccept}
        onDecline={handleGeolocationDecline}
        isVisible={state.showGeolocationPrompt}
      />

      <PWAInstallPrompt
        onInstall={handlePWAInstall}
        onDismiss={handlePWADismiss}
        isVisible={state.showPWAPrompt}
      />
    </div>
  );
};

export default WorldClockDashboard;
