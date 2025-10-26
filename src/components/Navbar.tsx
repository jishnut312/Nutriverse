'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, Sun, Moon, Apple } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Apple className="h-8 w-8 text-primary group-hover:text-primary-600 transition-colors" />
            <span className="text-xl font-bold font-heading text-gray-900 dark:text-white">
              Nutri<span className="text-primary">Verse</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/category/fruit"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium font-body"
            >
              Fruits
            </Link>
            <Link
              href="/category/vegetable"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium font-body"
            >
              Vegetables
            </Link>
            <Link
              href="/category/herb"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium font-body"
            >
              Herbs
            </Link>
            <Link
              href="/favorites"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium font-body"
            >
              Favorites
            </Link>
          </div>

          {/* Search and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/search"
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link
                href="/category/fruit"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Fruits
              </Link>
              <Link
                href="/category/vegetable"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Vegetables
              </Link>
              <Link
                href="/category/herb"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Herbs
              </Link>
              <Link
                href="/favorites"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </Link>
              <Link
                href="/search"
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
