'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, TrendingUp, Heart } from 'lucide-react';
import { useRef } from 'react';
import FoodCard from '@/components/FoodCard';
import { Food } from '@/types/food';
import { useEffect, useState } from 'react';
import foodsData from '@/data/foods.json';

export default function Home() {
  const [foodOfTheDay, setFoodOfTheDay] = useState<Food | null>(null);
  const [featuredFoods, setFeaturedFoods] = useState<Food[]>([]);
  
  // Parallax refs and scroll values
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.8]);

  useEffect(() => {
    // Load foods data and select random food of the day
    const loadFoods = async () => {
      try {
        const response = await fetch('/api/foods');
        if (!response.ok) {
          // Fallback to local import if API doesn't exist yet
          const allFoods = foodsData as Food[];
          
          // Select random food of the day
          const randomFood = allFoods[Math.floor(Math.random() * allFoods.length)];
          setFoodOfTheDay(randomFood);
          
          // Select 3 featured foods (excluding food of the day)
          const otherFoods = allFoods.filter(food => food.id !== randomFood.id);
          const shuffled = otherFoods.sort(() => 0.5 - Math.random());
          setFeaturedFoods(shuffled.slice(0, 3));
        }
      } catch (error) {
        console.error('Error loading foods:', error);
      }
    };

    loadFoods();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section - Full Screen */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Full Screen Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 will-change-transform"
          style={{ y: backgroundY }}
        >
          <Image
            src="/images/h1.jpg"
            alt="Fresh fruits and vegetables showcasing the power of nature's nutrition"
            fill
            className="object-cover brightness-110 contrast-110 saturate-110 scale-110"
            priority
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        {/* Content Overlay with Parallax */}
        <motion.div 
          className="relative z-10 h-full flex items-center justify-center"
          style={{ y: textY }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 font-sans tracking-tight leading-none">
                  Discover the Power of{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E23744] to-[#FF6B35]">
                    Nature
                  </span>
                </h1>
                <div className="flex items-center justify-center space-x-4 text-4xl md:text-5xl mb-6">
                  
                 
                  
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-white/85 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
              >
                Your comprehensive guide to understanding nutrition. Discover detailed information about natural foods, 
                their health benefits, and make informed dietary choices for optimal wellness.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link
                  href="/category/fruit"
                  className="group bg-gradient-to-r from-[#E23744] to-[#FF6B35] hover:from-[#C12B36] hover:to-[#E55A2B] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 font-sans"
                >
                  <span>Learn About Fruits</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="/category/vegetable"
                  className="group bg-white/10 backdrop-blur-sm text-white border-2 border-[#E23744]/50 hover:bg-[#E23744] hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 font-sans"
                >
                  <span>Learn About Vegetables</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Parallax Elements */}
       
          
        
        
      </section>

      {/* Quick Stats Section */}
      
      {/* Categories Preview Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/h2.jpg"
            alt="Fresh organic produce background"
            fill
            className="object-cover brightness-110 contrast-110 saturate-110 scale-110"
            priority={false}
          />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover the nutritional power of nature's bounty across different food categories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fruits Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Link href="/category/fruit" className="group block">
                <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:shadow-2xl hover:bg-white transition-all duration-300 transform group-hover:scale-105 shadow-lg">
                  <div className="text-6xl mb-4 text-center">🍎</div>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-2 text-center">
                    Fruits
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    Nature's candy packed with vitamins, antioxidants, and natural sweetness
                  </p>
                  <div className="flex items-center justify-center text-primary group-hover:text-primary-600 transition-colors">
                    <span className="font-medium">Learn About Fruits</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Vegetables Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Link href="/category/vegetable" className="group block">
                <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:shadow-2xl hover:bg-white transition-all duration-300 transform group-hover:scale-105 shadow-lg">
                  <div className="text-6xl mb-4 text-center">🥬</div>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-2 text-center">
                    Vegetables
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    Nutrient-dense powerhouses that fuel your body with essential vitamins and minerals
                  </p>
                  <div className="flex items-center justify-center text-green-600 group-hover:text-green-700 transition-colors">
                    <span className="font-medium">Learn About Vegetables</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Herbs Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Link href="/category/herb" className="group block">
                <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:shadow-2xl hover:bg-white transition-all duration-300 transform group-hover:scale-105 shadow-lg">
                  <div className="text-6xl mb-4 text-center">🌿</div>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-2 text-center">
                    Herbs
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    Aromatic herbs with powerful medicinal properties and incredible health benefits
                  </p>
                  <div className="flex items-center justify-center text-purple-600 group-hover:text-purple-700 transition-colors">
                    <span className="font-medium">Learn About Herbs</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 dark:text-white mb-4">
              How NutriVerse Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get instant access to comprehensive nutrition information in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-4">
                Search & Discover
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Search for any fruit, vegetable, or herb to instantly access detailed nutritional information
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-4">
                Learn & Understand
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Explore comprehensive nutrition facts, health benefits, and expert recommendations
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-4">
                Apply & Thrive
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Make informed dietary choices and build healthier eating habits for optimal wellness
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Food of the Day Section */}
      {foodOfTheDay && (
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Food of the Day
                </h2>
                <Sparkles className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Discover today's featured superfood and its amazing benefits
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Food Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-md mx-auto lg:mx-0"
              >
                <FoodCard food={foodOfTheDay} />
              </motion.div>

              {/* Nutritional Highlights */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-bold font-heading text-gray-900 dark:text-white mb-4">
                    Nutritional Powerhouse
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 font-body">
                    {foodOfTheDay.shortDescription}
                  </p>
                </div>

                {/* Key Nutrients */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl border border-primary/20">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {foodOfTheDay.nutritionalFacts.calories}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Calories per 100g
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-4 rounded-xl border border-secondary/20">
                    <div className="text-2xl font-bold text-secondary mb-1">
                      {foodOfTheDay.nutritionalFacts.protein}g
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Protein
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-4 rounded-xl border border-green-500/20">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {foodOfTheDay.nutritionalFacts.fiber}g
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Fiber
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-4 rounded-xl border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {foodOfTheDay.nutritionalFacts.carbs}g
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Carbs
                    </div>
                  </div>
                </div>

                {/* Top Health Benefits */}
                <div>
                  <h4 className="text-lg font-semibold font-heading text-gray-900 dark:text-white mb-3">
                    Top Health Benefits
                  </h4>
                  <div className="space-y-2">
                    {foodOfTheDay.benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {benefit.category}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {benefit.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/food/${foodOfTheDay.slug}`}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Foods Section */}
      {featuredFoods.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Featured Nutrition
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Explore these nutrient-rich foods for optimal health
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredFoods.map((food, index) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <FoodCard food={food} index={index} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                href="/search"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <span>Explore All Foods</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Heart className="h-12 w-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Healthy Journey Today
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of people who are making informed dietary choices with NutriVerse. 
              Discover the nutritional power of natural foods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/category/fruit"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Browse Fruits
              </Link>
              <Link
                href="/category/vegetable"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Browse Vegetables
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
