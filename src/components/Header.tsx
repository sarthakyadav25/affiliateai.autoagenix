'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Case Study', href: '#case-study' },
  { name: 'Pune Local', href: '#pune-locations' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 md:w-12 md:h-12"
            >
              <Image
                src="/logo.jpg"
                alt="Affiliate AutoAgenix Logo"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </motion.div>
            <span className="text-lg md:text-xl font-bold gradient-text hidden sm:block">
              Affiliate AutoAgenix
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white font-semibold rounded-lg transition-all duration-200 glow-violet"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              Get Started
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-3 border-t border-gray-800">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block mx-4 px-4 py-3 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white font-semibold rounded-lg text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Get Started
                  </span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
