'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FoodCard from '@/components/FoodCard';
import { Heart, Trash2, Search } from 'lucide-react';
import { Food } from '@/types/food';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const favoriteIds = JSON.parse(localStorage.getItem('nutriverse-favorites') || '[]');
        
        if (favoriteIds.length === 0) {
          setFavorites([]);
          setLoading(false);
          return;
        }

        // Load all foods and filter favorites
        const response = await fetch('/api/foods');
        if (!response.ok) {
          // Fallback to local import
          const { default: foodsData } = await import('@/data/foods.json');
          const allFoods = foodsData as Food[];
          const favoriteFoods = allFoods.filter(food => favoriteIds.includes(food.id));
          setFavorites(favoriteFoods);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();

    // Listen for storage changes (when favorites are updated from other components)
    const handleStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-page updates
    const handleFavoritesUpdate = () => {
      loadFavorites();
    };
    
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, []);

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      localStorage.removeItem('nutriverse-favorites');
      setFavorites([]);
      // Dispatch custom event to update other components
      window.dispatchEvent(new Event('favoritesUpdated'));
    }
  };

  const getFavoriteStats = () => {
    if (favorites.length === 0) return null;

    const categories = favorites.reduce((acc, food) => {
      acc[food.category] = (acc[food.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgCalories = Math.round(
      favorites.reduce((sum, food) => sum + food.nutritionalFacts.calories, 0) / favorites.length
    );

    const topBenefits = favorites
      .flatMap(food => food.benefits)
      .reduce((acc, benefit) => {
        acc[benefit.category] = (acc[benefit.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const mostCommonBenefit = Object.entries(topBenefits)
      .sort(([,a], [,b]) => b - a)[0];

    return {
      categories,
      avgCalories,
      mostCommonBenefit: mostCommonBenefit ? mostCommonBenefit[0] : null
    };
  };

  const stats = getFavoriteStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-red-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="h-16 w-16 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My Favorite Foods
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Your personal collection of nutritious foods you love
            </p>
            {favorites.length > 0 && (
              <div className="mt-6">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {favorites.length} favorite{favorites.length !== 1 ? 's' : ''} saved
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {favorites.length === 0 ? (
        /* Empty State */
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-8xl mb-6">💔</div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                No favorites yet
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Start building your personal nutrition collection by adding foods you love. 
                Click the heart icon on any food card to save it to your favorites.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/search"
                  className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Search className="h-5 w-5" />
                  <span>Discover Foods</span>
                </Link>
                
                <Link
                  href="/category/fruit"
                  className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <span>🍎</span>
                  <span>Browse Fruits</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        <>
          {/* Stats Section */}
          {stats && (
            <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {favorites.length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Total Favorites
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {stats.avgCalories}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Avg Calories
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {Object.keys(stats.categories).length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Categories
                      </div>
                    </motion.div>

                    {stats.mostCommonBenefit && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center"
                      >
                        <div className="text-2xl font-bold text-orange-600 mb-1 capitalize">
                          {stats.mostCommonBenefit}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Top Benefit
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <button
                    onClick={clearAllFavorites}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Clear All</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Favorites Grid */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {favorites.map((food, index) => (
                  <motion.div
                    key={food.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <FoodCard food={food} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Category Breakdown */}
          {stats && Object.keys(stats.categories).length > 1 && (
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
                    Your Favorite Categories
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    See how your favorites are distributed across food categories
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(stats.categories).map(([category, count], index) => {
                    const getCategoryInfo = (cat: string) => {
                      switch (cat) {
                        case 'fruit': return { emoji: '🍎', color: 'from-red-500 to-pink-500' };
                        case 'vegetable': return { emoji: '🥬', color: 'from-green-500 to-emerald-500' };
                        case 'herb': return { emoji: '🌿', color: 'from-purple-500 to-indigo-500' };
                        default: return { emoji: '🥗', color: 'from-gray-500 to-gray-600' };
                      }
                    };

                    const categoryInfo = getCategoryInfo(category);

                    return (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`bg-gradient-to-r ${categoryInfo.color} p-6 rounded-xl text-white text-center`}
                      >
                        <div className="text-4xl mb-3">{categoryInfo.emoji}</div>
                        <h3 className="text-xl font-semibold mb-2 capitalize">{category}s</h3>
                        <div className="text-3xl font-bold mb-1">{count}</div>
                        <div className="text-white/80">
                          {count === 1 ? 'favorite' : 'favorites'}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
