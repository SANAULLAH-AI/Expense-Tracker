import { Expense, ExpensesSummary } from '../types';

/**
 * Generates a random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Format currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Format date
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Get the current month's range (start and end dates)
 */
export const getCurrentMonthRange = (): { start: string; end: string } => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  };
};

/**
 * Filter expenses by date range
 */
export const filterExpensesByDateRange = (
  expenses: Expense[],
  startDate: string,
  endDate: string
): Expense[] => {
  return expenses.filter((expense) => {
    const expenseDate = expense.date;
    return expenseDate >= startDate && expenseDate <= endDate;
  });
};

/**
 * Calculate expense summary
 */
export const calculateExpensesSummary = (expenses: Expense[]): ExpensesSummary => {
  const summary: ExpensesSummary = {
    totalAmount: 0,
    byCategory: {},
  };

  expenses.forEach((expense) => {
    summary.totalAmount += expense.amount;
    
    if (!summary.byCategory[expense.category]) {
      summary.byCategory[expense.category] = 0;
    }
    
    summary.byCategory[expense.category] += expense.amount;
  });

  return summary;
};

/**
 * Group expenses by date
 */
export const groupExpensesByDate = (expenses: Expense[]): Record<string, Expense[]> => {
  const grouped: Record<string, Expense[]> = {};
  
  expenses.forEach((expense) => {
    if (!grouped[expense.date]) {
      grouped[expense.date] = [];
    }
    
    grouped[expense.date].push(expense);
  });
  
  return grouped;
};

/**
 * Sort dates in descending order
 */
export const sortDatesDescending = (dates: string[]): string[] => {
  return [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
};