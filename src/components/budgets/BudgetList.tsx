import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useExpenses } from '../../context/ExpenseContext';
import { Budget } from '../../types';
import { calculateExpensesSummary, getCurrentMonthRange, filterExpensesByDateRange } from '../../utils/helpers';
import BudgetItem from './BudgetItem';
import BudgetForm from './BudgetForm';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';

const BudgetList: React.FC = () => {
  const { budgets, categories, expenses, deleteBudget } = useExpenses();
  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  
  // Get current month's expenses
  const { start, end } = getCurrentMonthRange();
  const currentMonthExpenses = filterExpensesByDateRange(expenses, start, end);
  
  // Calculate spent amount by category
  const expenseSummary = calculateExpensesSummary(currentMonthExpenses);
  
  const handleAddClick = () => {
    setIsAddingBudget(true);
    setEditingBudget(null);
  };
  
  const handleEditClick = (budget: Budget) => {
    setEditingBudget(budget);
    setIsAddingBudget(false);
  };
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      deleteBudget(id);
    }
  };
  
  const handleFormSubmit = () => {
    setIsAddingBudget(false);
    setEditingBudget(null);
  };
  
  const handleFormCancel = () => {
    setIsAddingBudget(false);
    setEditingBudget(null);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Budgets</CardTitle>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAddClick}
          icon={<Plus size={16} />}
        >
          Add Budget
        </Button>
      </CardHeader>
      <CardContent>
        {(isAddingBudget || editingBudget) && (
          <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <h3 className="text-lg font-medium mb-3">
              {editingBudget ? 'Edit Budget' : 'Add Budget'}
            </h3>
            <BudgetForm 
              budget={editingBudget || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        )}
        
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          {budgets.length > 0 ? (
            budgets.map(budget => {
              const category = categories.find(cat => cat.id === budget.category);
              const spent = expenseSummary.byCategory[budget.category] || 0;
              
              return (
                <BudgetItem
                  key={budget.id}
                  budget={budget}
                  category={category}
                  spent={spent}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              );
            })
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">No budgets found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetList;