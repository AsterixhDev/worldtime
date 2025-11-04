import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Country, DashboardState, SearchResult } from './types';
import Header from 'components/ui/Header';
import SearchInterface from 'components/ui/SearchInterface';

import OfflineStatusBanner from 'components/ui/OfflineStatusBanner';
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';
import GeolocationPrompt from './components/GeolocationPrompt';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Navbar from 'components/ui/Navbar';

const WorldClockDashboard = () => {
  const navigate = useNavigate();
  
  const [state, setState] = useState<DashboardState>({
    countries: [],
    filteredCountries: [],
    searchQuery: '',
    isLoading: true,
    isSearching: false,
    selectedCountry: null,
    userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    showGeolocationPrompt: false,
    showPWAPrompt: false,
    lastUpdated: null,
    error: null
  });

  // Mock countries data with comprehensive timezone information
  const mockCountries: Country[] = [
    {
      id: 'us',
      name: 'United States',
      code: 'US',
      flag: '🇺🇸',
      region: 'Americas',
      subregion: 'North America',
      capital: 'Washington, D.C.',
      population: 331900000,
      timezones: [
        {
          id: 'us-est',
          name: 'America/New_York',
          offset: 'UTC-5',
          offsetMinutes: -300,
          abbreviation: 'EST',
          isDST: false,
          currentTime: new Date(Date.now() - 5 * 60 * 60 * 1000)
        },
        {
          id: 'us-cst',
          name: 'America/Chicago',
          offset: 'UTC-6',
          offsetMinutes: -360,
          abbreviation: 'CST',
          isDST: false,
          currentTime: new Date(Date.now() - 6 * 60 * 60 * 1000)
        },
        {
          id: 'us-pst',
          name: 'America/Los_Angeles',
          offset: 'UTC-8',
          offsetMinutes: -480,
          abbreviation: 'PST',
          isDST: false,
          currentTime: new Date(Date.now() - 8 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 'gb',
      name: 'United Kingdom',
      code: 'GB',
      flag: '🇬🇧',
      region: 'Europe',
      subregion: 'Northern Europe',
      capital: 'London',
      population: 67800000,
      timezones: [
        {
          id: 'gb-gmt',
          name: 'Europe/London',
          offset: 'UTC+0',
          offsetMinutes: 0,
          abbreviation: 'GMT',
          isDST: false,
          currentTime: new Date()
        }
      ]
    },
    {
      id: 'jp',
      name: 'Japan',
      code: 'JP',
      flag: '🇯🇵',
      region: 'Asia',
      subregion: 'Eastern Asia',
      capital: 'Tokyo',
      population: 125800000,
      timezones: [
        {
          id: 'jp-jst',
          name: 'Asia/Tokyo',
          offset: 'UTC+9',
          offsetMinutes: 540,
          abbreviation: 'JST',
          isDST: false,
          currentTime: new Date(Date.now() + 9 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 'au',
      name: 'Australia',
      code: 'AU',
      flag: '🇦🇺',
      region: 'Oceania',
      subregion: 'Australia and New Zealand',
      capital: 'Canberra',
      population: 25700000,
      timezones: [
        {
          id: 'au-aest',
          name: 'Australia/Sydney',
          offset: 'UTC+11',
          offsetMinutes: 660,
          abbreviation: 'AEDT',
          isDST: true,
          currentTime: new Date(Date.now() + 11 * 60 * 60 * 1000)
        },
        {
          id: 'au-acst',
          name: 'Australia/Adelaide',
          offset: 'UTC+10:30',
          offsetMinutes: 630,
          abbreviation: 'ACDT',
          isDST: true,
          currentTime: new Date(Date.now() + 10.5 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 'ae',
      name: 'United Arab Emirates',
      code: 'AE',
      flag: '🇦🇪',
      region: 'Asia',
      subregion: 'Western Asia',
      capital: 'Abu Dhabi',
      population: 9900000,
      timezones: [
        {
          id: 'ae-gst',
          name: 'Asia/Dubai',
          offset: 'UTC+4',
          offsetMinutes: 240,
          abbreviation: 'GST',
          isDST: false,
          currentTime: new Date(Date.now() + 4 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 'sg',
      name: 'Singapore',
      code: 'SG',
      flag: '🇸🇬',
      region: 'Asia',
      subregion: 'South-Eastern Asia',
      capital: 'Singapore',
      population: 5900000,
      timezones: [
        {
          id: 'sg-sgt',
          name: 'Asia/Singapore',
          offset: 'UTC+8',
          offsetMinutes: 480,
          abbreviation: 'SGT',
          isDST: false,
          currentTime: new Date(Date.now() + 8 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 'de',
      name: 'Germany',
      code: 'DE',
      flag: '🇩🇪',
      region: 'Europe',
      subregion: 'Western Europe',
      capital: 'Berlin',
      population: 83200000,
      timezones: [
        {
          id: 'de-cet',
          name: 'Europe/Berlin',
          offset: 'UTC+1',
          offsetMinutes: 60,
          abbreviation: 'CET',
          isDST: false,
          currentTime: new Date(Date.now() + 1 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 'fr',
      name: 'France',
      code: 'FR',
      flag: '🇫🇷',
      region: 'Europe',
      subregion: 'Western Europe',
      capital: 'Paris',
      population: 67400000,
      timezones: [
        {
          id: 'fr-cet',
          name: 'Europe/Paris',
          offset: 'UTC+1',
          offsetMinutes: 60,
          abbreviation: 'CET',
          isDST: false,
          currentTime: new Date(Date.now() + 1 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 'ca',
      name: 'Canada',
      code: 'CA',
      flag: '🇨🇦',
      region: 'Americas',
      subregion: 'North America',
      capital: 'Ottawa',
      population: 38000000,
      timezones: [
        {
          id: 'ca-est',
          name: 'America/Toronto',
          offset: 'UTC-5',
          offsetMinutes: -300,
          abbreviation: 'EST',
          isDST: false,
          currentTime: new Date(Date.now() - 5 * 60 * 60 * 1000)
        },
        {
          id: 'ca-pst',
          name: 'America/Vancouver',
          offset: 'UTC-8',
          offsetMinutes: -480,
          abbreviation: 'PST',
          isDST: false,
          currentTime: new Date(Date.now() - 8 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 'in',
      name: 'India',
      code: 'IN',
      flag: '🇮🇳',
      region: 'Asia',
      subregion: 'Southern Asia',
      capital: 'New Delhi',
      population: 1380000000,
      timezones: [
        {
          id: 'in-ist',
          name: 'Asia/Kolkata',
          offset: 'UTC+5:30',
          offsetMinutes: 330,
          abbreviation: 'IST',
          isDST: false,
          currentTime: new Date(Date.now() + 5.5 * 60 * 60 * 1000)
        }
      ]
    }
  ];

  // Initialize data and check for prompts
  useEffect(() => {
    const initializeDashboard = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      
      try {
        // Simulate API loading delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setState(prev => ({
          ...prev,
          countries: mockCountries,
          filteredCountries: mockCountries,
          isLoading: false,
          lastUpdated: new Date()
        }));

        // Check for geolocation prompt
        const hasAskedGeolocation = localStorage.getItem('geolocation-asked');
        if (!hasAskedGeolocation && 'geolocation' in navigator) {
          setTimeout(() => {
            setState(prev => ({ ...prev, showGeolocationPrompt: true }));
          }, 2000);
        }

        // Check for PWA install prompt
        const hasAskedPWA = localStorage.getItem('pwa-asked');
        if (!hasAskedPWA && 'serviceWorker' in navigator) {
          setTimeout(() => {
            setState(prev => ({ ...prev, showPWAPrompt: true }));
          }, 5000);
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: 'Failed to load country data',
          isLoading: false
        }));
      }
    };

    initializeDashboard();
  }, []);

  // Update clocks every second
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        countries: prev.countries.map(country => ({
          ...country,
          timezones: country.timezones.map(tz => ({
            ...tz,
            currentTime: new Date(Date.now() + tz.offsetMinutes * 60 * 1000)
          }))
        })),
        filteredCountries: prev.filteredCountries.map(country => ({
          ...country,
          timezones: country.timezones.map(tz => ({
            ...tz,
            currentTime: new Date(Date.now() + tz.offsetMinutes * 60 * 1000)
          }))
        }))
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle search functionality
  const handleSearch = useCallback((query: string) => {
    setState(prev => ({ 
      ...prev, 
      searchQuery: query,
      isSearching: true 
    }));

    // Simulate search delay
    setTimeout(() => {
      const filtered = query.trim() 
        ? mockCountries.filter(country =>
            country.name.toLowerCase().includes(query.toLowerCase()) ||
            country.region.toLowerCase().includes(query.toLowerCase()) ||
            country.subregion.toLowerCase().includes(query.toLowerCase()) ||
            country.capital?.toLowerCase().includes(query.toLowerCase()) ||
            country.timezones.some(tz => 
              tz.abbreviation.toLowerCase().includes(query.toLowerCase()) ||
              tz.name.toLowerCase().includes(query.toLowerCase())
            )
          )
        : mockCountries;

      setState(prev => ({
        ...prev,
        filteredCountries: filtered,
        isSearching: false
      }));
    }, 300);
  }, []);

  const handleCountrySelect = (country: Country) => {
    setState(prev => ({ ...prev, selectedCountry: country }));
    navigate('/country-timezone-details', { state: { country } });
  };

  const handleSearchResultSelect = (result: SearchResult) => {
    const country = mockCountries.find(c => c.id === result.id);
    if (country) {
      handleCountrySelect(country);
    }
  };

  const handleGeolocationAccept = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location granted:', position.coords);
        localStorage.setItem('geolocation-asked', 'true');
        setState(prev => ({ ...prev, showGeolocationPrompt: false }));
      },
      (error) => {
        console.error('Geolocation error:', error);
        localStorage.setItem('geolocation-asked', 'true');
        setState(prev => ({ ...prev, showGeolocationPrompt: false }));
      }
    );
  };

  const handleGeolocationDecline = () => {
    localStorage.setItem('geolocation-asked', 'true');
    setState(prev => ({ ...prev, showGeolocationPrompt: false }));
  };

  const handlePWAInstall = () => {
    // PWA install logic would go here
    localStorage.setItem('pwa-asked', 'true');
    setState(prev => ({ ...prev, showPWAPrompt: false }));
  };

  const handlePWADismiss = () => {
    localStorage.setItem('pwa-asked', 'true');
    setState(prev => ({ ...prev, showPWAPrompt: false }));
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
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Live updates
                  </span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/offline-mode')}
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
              <div className="max-w-md mx-auto">
                <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-error" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Unable to Load Data
                </h3>
                <p className="text-muted-foreground mb-6">
                  {state.error}
                </p>
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
              countries={state.filteredCountries}
              onCountrySelect={handleCountrySelect}
              searchQuery={state.searchQuery}
              isLoading={state.isLoading}
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