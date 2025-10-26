'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterOptions } from '@/types/food';

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
}

const vitamins = ['A', 'B1', 'B2', 'B3', 'B6', 'B12', 'C', 'D', 'E', 'K'];
const healthGoals = ['hair', 'skin', 'immunity', 'heart', 'brain', 'digestion', 'bones', 'energy', 'weight', 'eyes'];
const categories = ['fruit', 'vegetable', 'herb'];
const seasons = ['spring', 'summer', 'fall', 'winter'];

export default function FilterBar({ onFilterChange, className = "" }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});

  const updateFilter = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...activeFilters };
    
    if (newFilters[key] === value) {
      // Remove filter if clicking the same value
      delete newFilters[key];
    } else {
      // Set new filter value
      newFilters[key] = value as any;
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };

  const getActiveFilterCount = () => {
    return Object.keys(activeFilters).length;
  };

  const getFilterIcon = (category: string) => {
    switch (category) {
      case 'fruit': return '🍎';
      case 'vegetable': return '🥬';
      case 'herb': return '🌿';
      default: return '🥗';
    }
  };

  const getHealthGoalIcon = (goal: string) => {
    const icons: { [key: string]: string } = {
      hair: '💇',
      skin: '✨',
      immunity: '🛡️',
      heart: '❤️',
      brain: '🧠',
      digestion: '🌿',
      bones: '🦴',
      energy: '⚡',
      weight: '⚖️',
      eyes: '👁️'
    };
    return icons[goal] || '💊';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Filters
        </span>
        {getActiveFilterCount() > 0 && (
          <span className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {getActiveFilterCount()}
          </span>
        )}
        <ChevronDown className={`h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => (
            <motion.span
              key={`${key}-${value}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
            >
              {key === 'category' && getFilterIcon(value)}
              {key === 'healthGoal' && getHealthGoalIcon(value)}
              {key === 'vitamin' && '💊'}
              {key === 'season' && '📅'}
              <span className="ml-1">{value}</span>
              <button
                onClick={() => updateFilter(key as keyof FilterOptions, value)}
                className="ml-1 hover:text-green-600 dark:hover:text-green-400"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.span>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => updateFilter('category', category)}
                      className={`flex items-center space-x-2 w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeFilters.category === category
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>{getFilterIcon(category)}</span>
                      <span className="capitalize">{category}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Health Goals Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Health Goals</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {healthGoals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => updateFilter('healthGoal', goal)}
                      className={`flex items-center space-x-2 w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeFilters.healthGoal === goal
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>{getHealthGoalIcon(goal)}</span>
                      <span className="capitalize">{goal}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vitamins Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Vitamins</h3>
                <div className="grid grid-cols-2 gap-2">
                  {vitamins.map((vitamin) => (
                    <button
                      key={vitamin}
                      onClick={() => updateFilter('vitamin', vitamin)}
                      className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeFilters.vitamin === vitamin
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      Vitamin {vitamin}
                    </button>
                  ))}
                </div>
              </div>

              {/* Season Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Season</h3>
                <div className="space-y-2">
                  {seasons.map((season) => (
                    <button
                      key={season}
                      onClick={() => updateFilter('season', season)}
                      className={`flex items-center space-x-2 w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeFilters.season === season
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>📅</span>
                      <span className="capitalize">{season}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
