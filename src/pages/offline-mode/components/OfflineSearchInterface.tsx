import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';
import Input from 'components/ui/Input';
import { SearchResult } from '../types';

interface OfflineSearchInterfaceProps {
  cachedData: SearchResult[];
  onResultSelect?: (result: SearchResult) => void;
  className?: string;
}

const OfflineSearchInterface = ({ 
  cachedData, 
  onResultSelect, 
  className = '' 
}: OfflineSearchInterfaceProps) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    
    return cachedData.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.country.toLowerCase().includes(query.toLowerCase()) ||
      item.timezone.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8); // Limit results for performance
  }, [cachedData, query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(value.trim().length > 0);
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.name);
    setShowResults(false);
    onResultSelect?.(result);
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

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search cached countries and timezones..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.trim() && setShowResults(true)}
          className="pl-12 pr-12 bg-surface"
        />
        
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon name="Search" size={18} />
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-2 py-0.5 bg-warning/10 rounded-full">
            <Icon name="Database" size={12} className="text-warning" />
            <span className="text-xs text-warning font-medium">Offline</span>
          </div>
          
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setShowResults(false);
              }}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-elevation-lg max-h-80 overflow-y-auto z-50">
          {filteredResults.length > 0 ? (
            <>
              <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border bg-muted/30 flex items-center justify-between">
                <span>{filteredResults.length} cached result{filteredResults.length !== 1 ? 's' : ''}</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Database" size={12} className="text-warning" />
                  <span className="text-warning">Offline Mode</span>
                </div>
              </div>
              
              {filteredResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-smooth border-b border-border/30 last:border-b-0"
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
                    
                    <div className="flex items-center space-x-2">
                      <div className="text-sm font-mono text-muted-foreground">
                        {highlightMatch(result.timezone, query)}
                      </div>
                      <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-warning/10 rounded">
                        <Icon name="Database" size={10} className="text-warning" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="px-4 py-8 text-center text-muted-foreground">
              <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No cached results for "{query}"</p>
              <p className="text-xs mt-1">Only previously loaded data is available offline</p>
            </div>
          )}
        </div>
      )}

      {query && (
        <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
          <Icon name="Info" size={12} className="mr-1" />
          <span>Searching cached data only • Connect to internet for full search</span>
        </div>
      )}
    </div>
  );
};

export default OfflineSearchInterface;