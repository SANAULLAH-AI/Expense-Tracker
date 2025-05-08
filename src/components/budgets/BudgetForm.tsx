import React, { useState, useEffect } from 'react';
import { Budget } from '../../types';
import { useExpenses } from '../../context/ExpenseContext';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface BudgetFormProps {
  budget?: Budget;
  onSubmit: () => void;
  onCancel?: () => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ 
  budget, 
  onSubmit,
  onCancel 
}) => {
  const { categories, setBudget, updateBudget } = useExpenses();
  
  const [category, setCategory] = useState(budget?.category || '');
  const [amount, setAmount] = useState(budget?.amount.toString() || '');
  const [period, setPeriod] = useState<'monthly' | 'yearly'>(budget?.period || 'monthly');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (budget) {
      setCategory(budget.category);
      setAmount(budget.amount.toString());
      setPeriod(budget.period);
    }
  }, [budget]);
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!category) {
      newErrors.category = 'Category is required';
    }
    
    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    const budgetData = {
      category,
      amount: parseFloat(amount),
      period,
    };
    
    if (budget) {
      updateBudget({ ...budgetData, id: budget.id });
    } else {
      setBudget(budgetData);
    }
    
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Category"
        options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
        value={category}
        onChange={setCategory}
        error={errors.category}
        fullWidth
        required
      />
      
      <Input
        type="number"
        label="Budget Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.00"
        error={errors.amount}
        fullWidth
        step="0.01"
        min="0.01"
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Period
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-600"
              value="monthly"
              checked={period === 'monthly'}
              onChange={() => setPeriod('monthly')}
            />
            <span className="ml-2">Monthly</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-600"
              value="yearly"
              checked={period === 'yearly'}
              onChange={() => setPeriod('yearly')}
            />
            <span className="ml-2">Yearly</span>
          </label>
        </div>
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
          {budget ? 'Update' : 'Set'} Budget
        </Button>
      </div>
    </form>
  );
};

export default BudgetForm;