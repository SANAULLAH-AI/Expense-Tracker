import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Category } from '../../types';
import Button from '../ui/Button';

interface CategoryItemProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onEdit, onDelete }) => {
  const { id, name, color, icon } = category;
  
  // Dynamic import of Lucide icon
  const IconComponent = (LucideIcons as any)[
    icon.charAt(0).toUpperCase() + icon.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  ];
  
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
      <div className="flex items-center space-x-3">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          {IconComponent ? (
            <IconComponent size={16} className="text-white" />
          ) : (
            <div className="w-4 h-4 bg-white rounded-full" />
          )}
        </div>
        
        <span className="font-medium text-gray-900 dark:text-white">
          {name}
        </span>
      </div>
      
      <div className="flex space-x-1">
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onEdit(category)}
          aria-label={`Edit ${name} category`}
        >
          <Edit size={16} className="text-gray-500 dark:text-gray-400" />
        </Button>
        
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onDelete(id)}
          aria-label={`Delete ${name} category`}
        >
          <Trash2 size={16} className="text-red-500 dark:text-red-400" />
        </Button>
      </div>
    </div>
  );
};

export default CategoryItem;