'use client';

import { useState, useEffect, useMemo, use, useCallback } from 'react';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import FoodCard from '@/components/FoodCard';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import { Food, FilterOptions } from '@/types/food';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});

  const validCategories = ['fruit', 'vegetable', 'herb'];
  
  if (!validCategories.includes(resolvedParams.category)) {
    notFound();
  }

  useEffect(() => {
    const loadFoods = async () => {
      try {
        setLoading(true);
        // Build API URL with parameters
        const params = new URLSearchParams();
        params.append('category', resolvedParams.category);
        
        if (searchQuery) {
          params.append('search', searchQuery);
        }
        
        if (filters.vitamin) {
          params.append('vitamin', filters.vitamin);
        }
        
        if (filters.healthGoal) {
          params.append('healthGoal', filters.healthGoal);
        }
        
        if (filters.season) {
          params.append('season', filters.season);
        }
        
        const response = await fetch(`/api/foods?${params.toString()}`);
        if (response.ok) {
          const apiData = await response.json();
          setFoods(apiData);
        } else {
          // Fallback to local import
          const { default: foodsData } = await import('@/data/foods.json');
          const allFoods = foodsData as Food[];
          const categoryFoods = allFoods.filter(food => food.category === resolvedParams.category);
          setFoods(categoryFoods);
        }
      } catch (error) {
        console.error('Error loading foods:', error);
        // Fallback to local import
        const { default: foodsData } = await import('@/data/foods.json');
        const allFoods = foodsData as Food[];
        const categoryFoods = allFoods.filter(food => food.category === resolvedParams.category);
        setFoods(categoryFoods);
      } finally {
        setLoading(false);
      }
    };

    loadFoods();
  }, [resolvedParams.category, searchQuery, JSON.stringify(filters)]);

  // Since API now handles filtering, just use the foods directly
  const filteredFoods = foods;

  // Memoize the search handler to prevent unnecessary re-renders
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Memoize the filter handler
  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'fruit':
        return {
          title: 'Fruits',
          emoji: '🍎',
          description: 'Discover nature\'s candy packed with vitamins, antioxidants, and natural sweetness',
          color: 'from-red-500 to-pink-500'
        };
      case 'vegetable':
        return {
          title: 'Vegetables',
          emoji: '🥬',
          description: 'Explore nutrient-dense vegetables that fuel your body with essential vitamins and minerals',
          color: 'from-green-500 to-emerald-500'
        };
      case 'herb':
        return {
          title: 'Herbs',
          emoji: '🌿',
          description: 'Learn about aromatic herbs with powerful medicinal properties and health benefits',
          color: 'from-purple-500 to-indigo-500'
        };
      default:
        return {
          title: 'Foods',
          emoji: '🥗',
          description: 'Explore nutritious foods',
          color: 'from-gray-500 to-gray-600'
        };
    }
  };

  const categoryInfo = getCategoryInfo(resolvedParams.category);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400">Loading {categoryInfo.title.toLowerCase()}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${categoryInfo.color} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl mb-4">{categoryInfo.emoji}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {categoryInfo.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {categoryInfo.description}
            </p>
            <div className="mt-6">
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                {foods.length} {categoryInfo.title.toLowerCase()} available
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1">
              <SearchBar
                onSearch={handleSearch}
                placeholder={`Search ${categoryInfo.title.toLowerCase()}...`}
              />
            </div>
            <FilterBar onFilterChange={handleFilterChange} />
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {searchQuery || Object.keys(filters).length > 0 ? (
              <span>
                Showing {filteredFoods.length} of {foods.length} {categoryInfo.title.toLowerCase()}
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
            ) : (
              <span>Showing all {foods.length} {categoryInfo.title.toLowerCase()}</span>
            )}
          </div>
        </div>
      </section>

      {/* Foods Grid */}
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FoodCard food={food} index={index} priority={index < 3} />
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
                No {categoryInfo.title.toLowerCase()} found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery || Object.keys(filters).length > 0
                  ? 'Try adjusting your search or filters'
                  : `No ${categoryInfo.title.toLowerCase()} available in this category`}
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

      {/* Quick Stats Section */}
      {foods.length > 0 && (
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
                {categoryInfo.title} Statistics
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {foods.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total {categoryInfo.title}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {Math.round(foods.reduce((sum, food) => sum + food.nutritionalFacts.calories, 0) / foods.length)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Avg Calories
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {Math.round(foods.reduce((sum, food) => sum + food.nutritionalFacts.fiber, 0) / foods.length * 10) / 10}g
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Avg Fiber
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  {Math.round(foods.reduce((sum, food) => sum + food.nutritionalFacts.protein, 0) / foods.length * 10) / 10}g
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Avg Protein
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
