import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBarProps } from '../types';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const SearchBar = ({
  query,
  onQueryChange,
  onResultSelect,
  isSearching,
  resultCount
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);
  const [isScrolled, setIsScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollThreshold = windowHeight * 0.1; // 10% of screen height
      setIsScrolled(scrollTop > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isFocused) {
        inputRef.current?.blur();
      }
      if (e.key === 'Enter' && isFocused) {
        handleSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  const handleSearch = () => {
    onQueryChange(localQuery);
  };

  const handleClear = () => {
    setLocalQuery('');
    onQueryChange('');
    inputRef.current?.focus();
  };

  return (
    <motion.div
      className="sticky top-16 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
      animate={{
        paddingTop: isScrolled ? 8 : 24,
        paddingBottom: isScrolled ? 8 : 24,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div
          className="max-w-2xl mx-auto"
          animate={{
            maxWidth: isScrolled ? 512 : 672, // max-w-lg = 512px, max-w-2xl = 672px
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {isSearching ? (
                <Icon name="Loader2" size={20} className="animate-spin" />
              ) : (
                <Icon name="Search" size={20} />
              )}
            </div>

            <motion.div
              animate={{
                height: isScrolled ? 48 : 56, // h-12 = 48px, h-14 = 56px
                fontSize: isScrolled ? 14 : 16, // text-sm = 14px, text-base = 16px
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Input
                ref={inputRef}
                type="search"
                placeholder="Search countries, regions, or timezones..."
                value={localQuery}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full pl-12 pr-32 bg-surface shadow-elevation border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
                style={{ height: '100%', fontSize: 'inherit' }}
              />
            </motion.div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                size="sm"
                className="h-8 px-3"
              >
                {isSearching ? (
                  <Icon name="Loader2" size={14} className="animate-spin" />
                ) : (
                  <Icon name="Search" size={14} />
                )}
                <span className="ml-1 hidden sm:inline">Search</span>
              </Button>

              {localQuery && (
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
                Press <kbd className="px-1 py-0.5 bg-muted rounded font-mono">Enter</kbd> to search or <kbd className="px-1 py-0.5 bg-muted rounded font-mono">Esc</kbd> to clear
              </div>
            </div>
          )}

          <AnimatePresence>
            {!query && !isScrolled && (
              <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                  <motion.div
                    className="flex items-center space-x-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <Icon name="Zap" size={14} />
                    <span>Quick search</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <Icon name="Globe" size={14} />
                    <span>195 countries</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <Icon name="Clock" size={14} />
                    <span>Live updates</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SearchBar;