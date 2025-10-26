'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search for fruits, vegetables, or herbs...",
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        />
        
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Search suggestions or recent searches could go here */}
      <AnimatePresence>
        {isFocused && query.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            <div className="p-3">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Searching for "{query}"...
              </div>
              {/* Here you could add search suggestions or recent searches */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
