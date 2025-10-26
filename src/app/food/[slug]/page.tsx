'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, Share2, Star, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Food } from '@/types/food';

interface FoodDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function FoodDetailPage({ params }: FoodDetailPageProps) {
  const resolvedParams = use(params);
  const [food, setFood] = useState<Food | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadFood = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/foods/${resolvedParams.slug}`);
        if (response.ok) {
          const apiFood = await response.json();
          setFood(apiFood);
        } else {
          // Fallback to local import
          const { default: foodsData } = await import('@/data/foods.json');
          const foods = foodsData as Food[];
          const foundFood = foods.find(f => f.slug === resolvedParams.slug);
          setFood(foundFood || null);
        }
      } catch (error) {
        console.error('Error loading food:', error);
        setFood(null);
      } finally {
        setLoading(false);
      }
    };

    loadFood();
  }, [resolvedParams.slug]);

  useEffect(() => {
    if (food) {
      const favorites = JSON.parse(localStorage.getItem('nutriverse-favorites') || '[]');
      setIsFavorite(favorites.includes(food.id));
    }
  }, [food]);

  const toggleFavorite = () => {
    if (!food) return;
    
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

  const shareFood = async () => {
    if (!food) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${food.name} - NutriVerse`,
          text: food.shortDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
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
          <p className="text-gray-600 dark:text-gray-400">Loading food details...</p>
        </div>
      </div>
    );
  }

  if (!food) {
    notFound();
  }

  // Prepare chart data
  const nutritionData = [
    { name: 'Calories', value: food.nutritionalFacts.calories, color: '#ef4444' },
    { name: 'Protein', value: food.nutritionalFacts.protein, color: '#3b82f6' },
    { name: 'Carbs', value: food.nutritionalFacts.carbs, color: '#f59e0b' },
    { name: 'Fiber', value: food.nutritionalFacts.fiber, color: '#10b981' },
    { name: 'Sugar', value: food.nutritionalFacts.sugar, color: '#f97316' },
    { name: 'Fat', value: food.nutritionalFacts.fat, color: '#8b5cf6' },
  ];

  const vitaminData = Object.entries(food.nutritionalFacts.vitamins)
    .filter(([_, value]) => value && value > 0)
    .map(([vitamin, value]) => ({
      vitamin: `Vitamin ${vitamin.toUpperCase()}`,
      value: value,
      fullMark: 100,
    }));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fruit': return 'from-red-500 to-pink-500';
      case 'vegetable': return 'from-green-500 to-emerald-500';
      case 'herb': return 'from-purple-500 to-indigo-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getBenefitIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      hair: '💇', skin: '✨', immunity: '🛡️', heart: '❤️', brain: '🧠',
      digestion: '🌿', bones: '🦴', energy: '⚡', weight: '⚖️', eyes: '👁️'
    };
    return icons[category] || '💊';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/category/${food.category}`}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to {food.category}s</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleFavorite}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
                  }`}
                />
              </button>
              <button
                onClick={shareFood}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Share2 className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${getCategoryColor(food.category)} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={food.image}
                  alt={food.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white"
            >
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                  {food.category.charAt(0).toUpperCase() + food.category.slice(1)}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{food.name}</h1>
              <p className="text-xl text-white/90 mb-6">{food.shortDescription}</p>
              
              {food.isInSeason && (
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="h-5 w-5 text-yellow-300" />
                  <span className="text-white/90">Currently in season</span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-white/70" />
                <span className="text-white/90">
                  Best seasons: {food.season.join(', ')}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Description & Benefits */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About {food.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{food.description}</p>
              
              {food.funFact && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Fun Fact! 🤔</h3>
                  <p className="text-blue-800 dark:text-blue-200">{food.funFact}</p>
                </div>
              )}
            </motion.section>

            {/* Health Benefits */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Health Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {food.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="text-2xl">{getBenefitIcon(benefit.category)}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white capitalize">
                        {benefit.category}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Nutrition Charts */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nutrition Breakdown</h2>
              
              {/* Macronutrients Bar Chart */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Macronutrients (per 100g)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={nutritionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Vitamins Radar Chart */}
              {vitaminData.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Vitamin Profile</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={vitaminData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="vitamin" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar
                          name="Vitamins"
                          dataKey="value"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </motion.section>
          </div>

          {/* Right Column - Nutrition Facts */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg sticky top-32"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Nutrition Facts</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Per 100g serving</div>

              {/* Macronutrients */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium text-gray-900 dark:text-white">Calories</span>
                  <span className="text-gray-600 dark:text-gray-300">{food.nutritionalFacts.calories}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium text-gray-900 dark:text-white">Protein</span>
                  <span className="text-gray-600 dark:text-gray-300">{food.nutritionalFacts.protein}g</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium text-gray-900 dark:text-white">Carbohydrates</span>
                  <span className="text-gray-600 dark:text-gray-300">{food.nutritionalFacts.carbs}g</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium text-gray-900 dark:text-white">Fiber</span>
                  <span className="text-gray-600 dark:text-gray-300">{food.nutritionalFacts.fiber}g</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium text-gray-900 dark:text-white">Sugar</span>
                  <span className="text-gray-600 dark:text-gray-300">{food.nutritionalFacts.sugar}g</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium text-gray-900 dark:text-white">Fat</span>
                  <span className="text-gray-600 dark:text-gray-300">{food.nutritionalFacts.fat}g</span>
                </div>
              </div>

              {/* Vitamins */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Vitamins</h3>
                <div className="space-y-2">
                  {Object.entries(food.nutritionalFacts.vitamins)
                    .filter(([_, value]) => value && value > 0)
                    .map(([vitamin, value]) => (
                      <div key={vitamin} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Vitamin {vitamin.toUpperCase()}</span>
                        <span className="text-gray-900 dark:text-white">{value}mg</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Minerals */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Minerals</h3>
                <div className="space-y-2">
                  {Object.entries(food.nutritionalFacts.minerals)
                    .filter(([_, value]) => value && value > 0)
                    .map(([mineral, value]) => (
                      <div key={mineral} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400 capitalize">{mineral}</span>
                        <span className="text-gray-900 dark:text-white">{value}mg</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {food.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
