import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Expense, Category } from '../../types';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Button from '../ui/Button';

interface ExpenseItemProps {
  expense: Expense;
  category: Category | undefined;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ 
  expense, 
  category, 
  onEdit, 
  onDelete 
}) => {
  const { id, amount, description, date } = expense;
  const categoryColor = category?.color || '#6B7280';
  const categoryName = category?.name || 'Uncategorized';
  
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
      <div className="flex items-center space-x-4">
        <div 
          className="w-3 h-8 rounded-sm" 
          style={{ backgroundColor: categoryColor }}
        />
        
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 dark:text-white truncate">
            {description || categoryName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(date)}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="font-semibold text-gray-900 dark:text-white whitespace-nowrap">
          {formatCurrency(amount)}
        </span>
        
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onEdit(expense)}
            aria-label="Edit expense"
          >
            <Edit size={16} className="text-gray-500 dark:text-gray-400" />
          </Button>
          
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onDelete(id)}
            aria-label="Delete expense"
          >
            <Trash2 size={16} className="text-red-500 dark:text-red-400" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;