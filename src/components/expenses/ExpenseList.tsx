import React, { useState } from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { Expense } from '../../types';
import { sortDatesDescending } from '../../utils/helpers';
import ExpenseItem from './ExpenseItem';
import ExpenseForm from './ExpenseForm';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

const ExpenseList: React.FC = () => {
  const { expenses, categories, deleteExpense } = useExpenses();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  
  // Group expenses by date and sort dates in descending order
  const expensesByDate: Record<string, Expense[]> = {};
  expenses.forEach(expense => {
    if (!expensesByDate[expense.date]) {
      expensesByDate[expense.date] = [];
    }
    expensesByDate[expense.date].push(expense);
  });
  
  const sortedDates = sortDatesDescending(Object.keys(expensesByDate));
  
  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
    }
  };
  
  const handleFormSubmit = () => {
    setEditingExpense(null);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        {editingExpense && (
          <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <h3 className="text-lg font-medium mb-3">Edit Expense</h3>
            <ExpenseForm 
              expense={editingExpense} 
              onSubmit={handleFormSubmit} 
              onCancel={() => setEditingExpense(null)}
            />
          </div>
        )}
        
        <div className="overflow-hidden">
          {sortedDates.length > 0 ? (
            <div className="space-y-4">
              {sortedDates.map(date => (
                <div key={date}>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {expensesByDate[date].map(expense => (
                      <ExpenseItem
                        key={expense.id}
                        expense={expense}
                        category={categories.find(cat => cat.id === expense.category)}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No expenses found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;