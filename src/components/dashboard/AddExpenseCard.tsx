import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import ExpenseForm from '../expenses/ExpenseForm';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';

const AddExpenseCard: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };
  
  const handleSubmit = () => {
    setIsFormVisible(false);
  };
  
  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Quick Add</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleForm}
          className="text-blue-600 dark:text-blue-500"
          aria-label={isFormVisible ? "Cancel" : "Add expense"}
        >
          {isFormVisible ? 'Cancel' : <PlusCircle size={20} />}
        </Button>
      </CardHeader>
      <CardContent>
        {isFormVisible ? (
          <ExpenseForm onSubmit={handleSubmit} />
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400 mb-3">Quickly add a new expense</p>
            <Button 
              onClick={toggleForm}
              icon={<PlusCircle size={16} />}
            >
              Add Expense
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddExpenseCard;