import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { useExpenses } from '../../context/ExpenseContext';
import { Expense } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface ExpenseFormProps {
  expense?: Expense;
  onSubmit: () => void;
  onCancel?: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ 
  expense, 
  onSubmit,
  onCancel
}) => {
  const { categories, addExpense, updateExpense } = useExpenses();
  
  const [amount, setAmount] = useState(expense?.amount.toString() || '');
  const [category, setCategory] = useState(expense?.category || '');
  const [description, setDescription] = useState(expense?.description || '');
  const [date, setDate] = useState(expense?.date || new Date().toISOString().slice(0, 10));
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount.toString());
      setCategory(expense.category);
      setDescription(expense.description);
      setDate(expense.date);
    }
  }, [expense]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    if (!category) {
      newErrors.category = 'Category is required';
    }
    
    if (!date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    const expenseData = {
      amount: parseFloat(amount),
      category,
      description,
      date,
    };
    
    if (expense) {
      updateExpense({ ...expenseData, id: expense.id });
    } else {
      addExpense(expenseData);
    }
    
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="number"
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.00"
        error={errors.amount}
        fullWidth
        step="0.01"
        min="0.01"
        required
      />
      
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
        type="text"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
        fullWidth
      />
      
      <Input
        type="date"
        label="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        error={errors.date}
        fullWidth
        required
      />
      
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
        
        <Button
          type="submit"
          icon={<PlusCircle size={16} />}
        >
          {expense ? 'Update' : 'Add'} Expense
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;