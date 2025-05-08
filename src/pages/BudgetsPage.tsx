import React from 'react';
import BudgetList from '../components/budgets/BudgetList';

const BudgetsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Budgets</h1>
      <BudgetList />
    </div>
  );
};

export default BudgetsPage;