import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Budget, Category } from '../../types';
import { formatCurrency } from '../../utils/helpers';
import Button from '../ui/Button';

interface BudgetItemProps {
  budget: Budget;
  category: Category | undefined;
  spent: number;
  onEdit: (budget: Budget) => void;
  onDelete: (id: string) => void;
}

const BudgetItem: React.FC<BudgetItemProps> = ({ 
  budget, 
  category, 
  spent, 
  onEdit, 
  onDelete 
}) => {
  const { id, amount, period } = budget;
  const percentUsed = Math.min(Math.round((spent / amount) * 100), 100);
  const categoryName = category?.name || 'Uncategorized';
  const categoryColor = category?.color || '#6B7280';
  
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div 
            className="w-3 h-8 rounded-sm" 
            style={{ backgroundColor: categoryColor }}
          />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {categoryName}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {period.charAt(0).toUpperCase() + period.slice(1)} budget
            </p>
          </div>
        </div>
        
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onEdit(budget)}
            aria-label={`Edit ${categoryName} budget`}
          >
            <Edit size={16} className="text-gray-500 dark:text-gray-400" />
          </Button>
          
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onDelete(id)}
            aria-label={`Delete ${categoryName} budget`}
          >
            <Trash2 size={16} className="text-red-500 dark:text-red-400" />
          </Button>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between items-baseline text-sm mb-1">
          <div>
            <span className="font-medium">{formatCurrency(spent)}</span>
            <span className="text-gray-500 dark:text-gray-400"> of {formatCurrency(amount)}</span>
          </div>
          <span className={`font-medium ${
            percentUsed >= 100 
              ? 'text-red-500' 
              : percentUsed >= 80 
                ? 'text-amber-500' 
                : 'text-green-500'
          }`}>
            {percentUsed}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              percentUsed >= 100 
                ? 'bg-red-500' 
                : percentUsed >= 80 
                  ? 'bg-amber-500' 
                  : 'bg-green-500'
            }`} 
            style={{ width: `${percentUsed}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetItem;