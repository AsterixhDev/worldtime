import React, { useState, useEffect, useRef } from 'react';
import { SearchBarProps } from '../types';
import Input from 'components/ui/Input';
import Icon from 'components/AppIcon';

const SearchBar = ({ 
  query, 
  onQueryChange, 
  onResultSelect, 
  isSearching, 
  resultCount 
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isFocused) {
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  const handleClear = () => {
    onQueryChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="sticky top-16 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {isSearching ? (
                <Icon name="Loader2" size={20} className="animate-spin" />
              ) : (
                <Icon name="Search" size={20} />
              )}
            </div>

            <Input
              ref={inputRef}
              type="search"
              placeholder="Search countries, regions, or timezones..."
              value={query}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full pl-12 pr-20 h-14 text-base bg-surface shadow-elevation border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
            />

            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              {query && (
                <button
                  onClick={handleClear}
                  className="text-muted-foreground hover:text-foreground transition-smooth p-1 rounded-md hover:bg-muted/50"
                  aria-label="Clear search"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
              
              <div className="hidden sm:flex items-center space-x-1 px-2 py-1 bg-muted/50 rounded-md text-xs text-muted-foreground">
                <kbd className="font-mono">⌘</kbd>
                <kbd className="font-mono">K</kbd>
              </div>
            </div>
          </div>

          {query && (
            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="Filter" size={16} />
                <span>
                  {isSearching ? 'Searching...' : `${resultCount} result${resultCount !== 1 ? 's' : ''} found`}
                </span>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Press <kbd className="px-1 py-0.5 bg-muted rounded font-mono">Esc</kbd> to clear
              </div>
            </div>
          )}

          {!query && (
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Zap" size={14} />
                  <span>Quick search</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Globe" size={14} />
                  <span>195 countries</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>Live updates</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;