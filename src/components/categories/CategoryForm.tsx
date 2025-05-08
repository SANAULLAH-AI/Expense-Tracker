import React, { useState, useEffect } from 'react';
import { Category } from '../../types';
import { useExpenses } from '../../context/ExpenseContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface CategoryFormProps {
  category?: Category;
  onSubmit: () => void;
  onCancel?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ 
  category, 
  onSubmit,
  onCancel 
}) => {
  const { addCategory, updateCategory } = useExpenses();
  
  const [name, setName] = useState(category?.name || '');
  const [color, setColor] = useState(category?.color || '#3B82F6');
  const [icon, setIcon] = useState(category?.icon || 'tag');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (category) {
      setName(category.name);
      setColor(category.color);
      setIcon(category.icon);
    }
  }, [category]);
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    const categoryData = {
      name: name.trim(),
      color,
      icon,
    };
    
    if (category) {
      updateCategory({ ...categoryData, id: category.id });
    } else {
      addCategory(categoryData);
    }
    
    onSubmit();
  };
  
  // Predefined colors
  const colorOptions = [
    '#EF4444', // red-500
    '#F97316', // orange-500
    '#F59E0B', // amber-500
    '#10B981', // green-500
    '#06B6D4', // cyan-500
    '#3B82F6', // blue-500
    '#8B5CF6', // violet-500
    '#EC4899', // pink-500
    '#6B7280', // gray-500
  ];
  
  // Predefined icons (using Lucide icon names)
  const iconOptions = [
    'tag',
    'shopping-bag',
    'home',
    'car',
    'utensils',
    'film',
    'coffee',
    'gift',
    'heart',
    'gym',
    'plane',
    'bus',
    'plug',
    'smartphone',
    'more-horizontal',
  ];
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g., Groceries"
        error={errors.name}
        fullWidth
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((colorOption) => (
            <button
              key={colorOption}
              type="button"
              className={`w-8 h-8 rounded-full border-2 ${
                color === colorOption ? 'border-gray-900 dark:border-white' : 'border-transparent'
              }`}
              style={{ backgroundColor: colorOption }}
              onClick={() => setColor(colorOption)}
              aria-label={`Select color ${colorOption}`}
            />
          ))}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer"
            aria-label="Custom color"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Icon (Lucide icon name)
        </label>
        <Input
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="e.g., shopping-bag"
          list="icon-suggestions"
          fullWidth
        />
        <datalist id="icon-suggestions">
          {iconOptions.map((iconOption) => (
            <option key={iconOption} value={iconOption} />
          ))}
        </datalist>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Enter a valid Lucide icon name
        </p>
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        
        <Button type="submit">
          {category ? 'Update' : 'Add'} Category
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;