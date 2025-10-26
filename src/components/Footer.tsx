import Link from 'next/link';
import { Apple, Heart, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Apple className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Nutri<span className="text-green-600">Verse</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Discover the power of nature through comprehensive nutrition information. 
              Learn about the health benefits of fruits, vegetables, and herbs to make 
              informed dietary choices.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for healthy living</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/category/fruit"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Fruits
                </Link>
              </li>
              <li>
                <Link
                  href="/category/vegetable"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Vegetables
                </Link>
              </li>
              <li>
                <Link
                  href="/category/herb"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Herbs
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Search Foods
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Features
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/favorites"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  My Favorites
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Compare Foods
                </Link>
              </li>
              <li>
                <Link
                  href="/nutrition-charts"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Nutrition Charts
                </Link>
              </li>
              <li>
                <Link
                  href="/daily-food"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Food of the Day
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © 2024 NutriVerse. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
