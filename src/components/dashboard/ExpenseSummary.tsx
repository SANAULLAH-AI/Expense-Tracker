import React from 'react';
import { PieChart, Wallet } from 'lucide-react';
import { useExpenses } from '../../context/ExpenseContext';
import { calculateExpensesSummary, formatCurrency, getCurrentMonthRange, filterExpensesByDateRange } from '../../utils/helpers';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

const ExpenseSummary: React.FC = () => {
  const { expenses, categories, budgets } = useExpenses();
  
  // Get current month's expenses
  const { start, end } = getCurrentMonthRange();
  const currentMonthExpenses = filterExpensesByDateRange(expenses, start, end);
  
  // Calculate summary
  const summary = calculateExpensesSummary(currentMonthExpenses);
  
  // Calculate total budget
  const totalBudget = budgets.reduce((total, budget) => total + budget.amount, 0);
  
  // Calculate budget progress
  const budgetProgress = totalBudget > 0 ? Math.min(Math.round((summary.totalAmount / totalBudget) * 100), 100) : 0;
  
  // Get top categories by spending
  const topCategories = Object.entries(summary.byCategory)
    .map(([categoryId, amount]) => ({
      category: categories.find(cat => cat.id === categoryId) || { id: categoryId, name: 'Unknown', color: '#6B7280', icon: 'help-circle' },
      amount
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
          <Wallet size={20} className="text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{formatCurrency(summary.totalAmount)}</span>
              {totalBudget > 0 && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  of {formatCurrency(totalBudget)}
                </span>
              )}
            </div>
            
            {totalBudget > 0 && (
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div 
                  className={`h-2.5 rounded-full ${
                    budgetProgress >= 100 
                      ? 'bg-red-500' 
                      : budgetProgress >= 80 
                        ? 'bg-amber-500' 
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${budgetProgress}%` }}
                ></div>
              </div>
            )}
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {totalBudget > 0 
                ? `${budgetProgress}% of monthly budget used`
                : 'No budget set'}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Top Categories</CardTitle>
          <PieChart size={20} className="text-blue-500" />
        </CardHeader>
        <CardContent>
          {topCategories.length > 0 ? (
            <div className="space-y-4">
              {topCategories.map(({ category, amount }) => (
                <div key={category.id} className="flex items-center">
                  <div 
                    className="w-3 h-8 rounded-sm mr-3" 
                    style={{ backgroundColor: category.color }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm font-medium">{formatCurrency(amount)}</p>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 mt-1 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          backgroundColor: category.color,
                          width: `${Math.min((amount / summary.totalAmount) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              No expenses this month
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseSummary;