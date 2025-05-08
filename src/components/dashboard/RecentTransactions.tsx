import React from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

const RecentTransactions: React.FC = () => {
  const { expenses, categories } = useExpenses();
  
  // Get recent transactions (latest 5)
  const recentTransactions = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {recentTransactions.length > 0 ? (
          <div className="space-y-4">
            {recentTransactions.map(transaction => {
              const category = categories.find(cat => cat.id === transaction.category);
              
              return (
                <div 
                  key={transaction.id} 
                  className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                >
                  <div 
                    className="w-2 h-8 rounded-sm mr-3" 
                    style={{ backgroundColor: category?.color || '#6B7280' }}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {transaction.description || category?.name || 'Expense'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                  
                  <span className="font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;