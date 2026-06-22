import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-brand-bg transition-colors relative h-10 w-10 flex items-center justify-center overflow-hidden border border-brand-border"
      aria-label="Toggle Theme"
      id="theme-toggle"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-brand-primary" />
          ) : (
            <Sun className="w-5 h-5 text-brand-primary" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};
