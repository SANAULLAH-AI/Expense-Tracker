import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ExpenseProvider } from './context/ExpenseContext';
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import CategoriesPage from './pages/CategoriesPage';
import BudgetsPage from './pages/BudgetsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  // Render active page based on state
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <TransactionsPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'budgets':
        return <BudgetsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <ExpenseProvider>
        <Layout activePage={activePage} onPageChange={setActivePage}>
          {renderPage()}
        </Layout>
      </ExpenseProvider>
    </ThemeProvider>
  );
}

export default App;