'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import FoodCard from '@/components/FoodCard';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import { Search, TrendingUp, Filter } from 'lucide-react';
import { Food, FilterOptions } from '@/types/food';

export default function SearchPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const loadFoods = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/foods');
        if (!response.ok) {
          // Fallback to local import
          const { default: foodsData } = await import('@/data/foods.json');
          setFoods(foodsData as Food[]);
        }
      } catch (error) {
        console.error('Error loading foods:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFoods();

    // Load recent searches from localStorage
    const saved = localStorage.getItem('nutriverse-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save search query to recent searches
  useEffect(() => {
    if (searchQuery && searchQuery.length > 2) {
      const timer = setTimeout(() => {
        setRecentSearches(prev => {
          const updated = [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 5);
          localStorage.setItem('nutriverse-recent-searches', JSON.stringify(updated));
          return updated;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Filter and search foods
  const filteredFoods = useMemo(() => {
    let filtered = foods;

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(food =>
        food.name.toLowerCase().includes(query) ||
        food.shortDescription.toLowerCase().includes(query) ||
        food.description.toLowerCase().includes(query) ||
        food.tags.some(tag => tag.toLowerCase().includes(query)) ||
        food.benefits.some(benefit => 
          benefit.category.toLowerCase().includes(query) ||
          benefit.description.toLowerCase().includes(query)
        )
      );
    }

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(food => food.category === filters.category);
    }

    // Apply vitamin filter
    if (filters.vitamin) {
      filtered = filtered.filter(food =>
        food.nutritionalFacts.vitamins[filters.vitamin as keyof typeof food.nutritionalFacts.vitamins]
      );
    }

    // Apply health goal filter
    if (filters.healthGoal) {
      filtered = filtered.filter(food =>
        food.benefits.some(benefit => benefit.category === filters.healthGoal)
      );
    }

    // Apply season filter
    if (filters.season) {
      filtered = filtered.filter(food =>
        food.season.includes(filters.season!)
      );
    }

    return filtered;
  }, [foods, searchQuery, filters]);

  const popularSearches = ['apple', 'spinach', 'vitamin c', 'antioxidants', 'immunity', 'heart health'];

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('nutriverse-recent-searches');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400">Loading foods...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Search className="h-16 w-16 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Search Foods & Nutrition
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Discover detailed nutrition information for thousands of fruits, vegetables, and herbs
            </p>
            
            {/* Main Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="Search by food name, nutrient, or health benefit..."
                className="text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Controls */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <FilterBar onFilterChange={setFilters} />
            
            {/* Results count */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {searchQuery || Object.keys(filters).length > 0 ? (
                <span>
                  {filteredFoods.length} result{filteredFoods.length !== 1 ? 's' : ''} found
                  {searchQuery && ` for "${searchQuery}"`}
                </span>
              ) : (
                <span>{foods.length} foods available</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Search Suggestions */}
      {!searchQuery && Object.keys(filters).length === 0 && (
        <section className="py-8 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Searches</h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(search)}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Popular Searches */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Popular Searches</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(search)}
                      className="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFoods.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredFoods.map((food, index) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <FoodCard food={food} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                No foods found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery || Object.keys(filters).length > 0
                  ? 'Try adjusting your search terms or filters'
                  : 'Start searching to discover amazing foods and their nutrition benefits'}
              </p>
              {(searchQuery || Object.keys(filters).length > 0) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({});
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Clear Search & Filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Search Tips */}
      {!searchQuery && Object.keys(filters).length === 0 && (
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Search Tips
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Get the most out of your nutrition search
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">🍎</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Search by Food Name
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Find specific fruits, vegetables, or herbs by their common names
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">💊</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Search by Nutrients
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Look for foods rich in specific vitamins, minerals, or compounds
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Search by Health Goals
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Find foods that support specific health benefits like immunity or heart health
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
