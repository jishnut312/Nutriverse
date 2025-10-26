'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { Food } from '@/types/food';
import { useState, useEffect } from 'react';

interface FoodCardProps {
  food: Food;
  index?: number;
}

export default function FoodCard({ food, index = 0 }: FoodCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if food is in favorites on component mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('nutriverse-favorites') || '[]');
    setIsFavorite(favorites.includes(food.id));
  }, [food.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem('nutriverse-favorites') || '[]');
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter((id: string) => id !== food.id);
    } else {
      updatedFavorites = [...favorites, food.id];
    }
    
    localStorage.setItem('nutriverse-favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fruit':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'vegetable':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'herb':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'fruit':
        return '🍎';
      case 'vegetable':
        return '🥬';
      case 'herb':
        return '🌿';
      default:
        return '🥗';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group"
    >
      <Link href={`/food/${food.slug}`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={food.image}
              alt={food.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isFavorite
                    ? 'text-red-500 fill-red-500'
                    : 'text-gray-400 hover:text-red-500'
                }`}
              />
            </button>

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                  food.category
                )}`}
              >
                <span className="mr-1">{getCategoryEmoji(food.category)}</span>
                {food.category.charAt(0).toUpperCase() + food.category.slice(1)}
              </span>
            </div>

            {/* Seasonal Indicator */}
            {food.isInSeason && (
              <div className="absolute bottom-3 left-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <Star className="h-3 w-3 mr-1" />
                  In Season
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              {food.name}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              {food.shortDescription}
            </p>

            {/* Key Benefits */}
            <div className="flex flex-wrap gap-1 mb-3">
              {food.benefits.slice(0, 3).map((benefit, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <span className="mr-1">{benefit.icon}</span>
                  {benefit.category.charAt(0).toUpperCase() + benefit.category.slice(1)}
                </span>
              ))}
            </div>

            {/* Nutrition Highlights */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">Calories</div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {food.nutritionalFacts.calories}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">Fiber</div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {food.nutritionalFacts.fiber}g
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">Protein</div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {food.nutritionalFacts.protein}g
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
