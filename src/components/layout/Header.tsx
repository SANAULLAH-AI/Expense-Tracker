import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

interface HeaderProps {
  openSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ openSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 h-16 flex items-center justify-between transition-colors duration-200">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="md:hidden mr-2" 
          onClick={openSidebar}
          aria-label="Menu"
        >
          <Menu size={20} />
        </Button>
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-500">ExpenseTracker</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </div>
    </header>
  );
};

export default Header;