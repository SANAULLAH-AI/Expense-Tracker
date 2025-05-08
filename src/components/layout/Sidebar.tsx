import React from 'react';
import { Home, BarChart2, PieChart, Calendar, Settings, X } from 'lucide-react';
import Button from '../ui/Button';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
  activePage: string;
  onPageChange: (page: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  closeSidebar, 
  activePage, 
  onPageChange 
}) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <BarChart2 size={20} /> },
    { id: 'categories', label: 'Categories', icon: <PieChart size={20} /> },
    { id: 'budgets', label: 'Budgets', icon: <Calendar size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 z-30 h-full w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-500">ExpenseTracker</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden" 
              onClick={closeSidebar}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </Button>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activePage === item.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              © 2025 ExpenseTracker
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;