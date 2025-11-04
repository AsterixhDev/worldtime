import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Input from './Input';
import Icon from 'components/AppIcon';

interface SearchResult {
  id: string;
  name: string;
  country: string;
  timezone: string;
  flag: string;
}

interface SearchInterfaceProps {
  onSearch?: (query: string) => void;
  onResultSelect?: (result: SearchResult) => void;
  placeholder?: string;
  className?: string;
}

const SearchInterface = ({ 
  onSearch, 
  onResultSelect, 
  placeholder = "Search countries, cities, or timezones...",
  className = '' 
}: SearchInterfaceProps) => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock search results for demonstration
  const mockResults: SearchResult[] = [
    { id: '1', name: 'New York', country: 'United States', timezone: 'EST (UTC-5)', flag: '🇺🇸' },
    { id: '2', name: 'London', country: 'United Kingdom', timezone: 'GMT (UTC+0)', flag: '🇬🇧' },
    { id: '3', name: 'Tokyo', country: 'Japan', timezone: 'JST (UTC+9)', flag: '🇯🇵' },
    { id: '4', name: 'Sydney', country: 'Australia', timezone: 'AEDT (UTC+11)', flag: '🇦🇺' },
    { id: '5', name: 'Dubai', country: 'United Arab Emirates', timezone: 'GST (UTC+4)', flag: '🇦🇪' },
    { id: '6', name: 'Singapore', country: 'Singapore', timezone: 'SGT (UTC+8)', flag: '🇸🇬' },
  ];

  const shouldShowSearch = location.pathname === '/world-clock-dashboard';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      
      // Simulate API delay
      const timer = setTimeout(() => {
        const filtered = mockResults.filter(
          result =>
            result.name.toLowerCase().includes(query.toLowerCase()) ||
            result.country.toLowerCase().includes(query.toLowerCase()) ||
            result.timezone.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsSearching(false);
        setShowResults(true);
        setHighlightedIndex(-1);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setShowResults(false);
      setIsSearching(false);
      setHighlightedIndex(-1);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.name);
    setShowResults(false);
    setHighlightedIndex(-1);
    onResultSelect?.(result);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && results[highlightedIndex]) {
          handleResultClick(results[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-accent/30 text-accent-foreground rounded px-0.5">
          {part}
        </mark>
      ) : part
    );
  };

  if (!shouldShowSearch) {
    return null;
  }

  return (
    <div 
      ref={searchRef}
      className={`sticky top-16 z-90 bg-background/95 backdrop-blur-sm border-b border-border ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 lg:px-6">
        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <Input
              ref={inputRef}
              type="search"
              placeholder={placeholder}
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => query.trim() && setShowResults(true)}
              className="w-full pl-12 pr-12 h-12 text-base bg-surface shadow-elevation border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {isSearching ? (
                <Icon name="Loader2" size={20} className="animate-spin" />
              ) : (
                <Icon name="Search" size={20} />
              )}
            </div>

            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setShowResults(false);
                  onSearch?.('');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            )}
          </div>

          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-elevation-lg max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                <>
                  <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border bg-muted/30">
                    {results.length} result{results.length !== 1 ? 's' : ''} found
                  </div>
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className={`w-full px-4 py-3 text-left hover:bg-muted/50 transition-smooth border-b border-border/30 last:border-b-0 ${
                        index === highlightedIndex ? 'bg-muted/70' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{result.flag}</span>
                          <div>
                            <div className="font-medium text-foreground">
                              {highlightMatch(result.name, query)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {highlightMatch(result.country, query)}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-mono text-muted-foreground">
                          {highlightMatch(result.timezone, query)}
                        </div>
                      </div>
                    </button>
                  ))}
                </>
              ) : (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No results found for "{query}"</p>
                  <p className="text-xs mt-1">Try searching for a country, city, or timezone</p>
                </div>
              )}
            </div>
          )}
        </div>

        {query && (
          <div className="flex items-center justify-center mt-3 text-xs text-muted-foreground">
            <Icon name="Zap" size={14} className="mr-1" />
            <span>Press Enter to search • Use ↑↓ to navigate • Esc to close</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInterface;