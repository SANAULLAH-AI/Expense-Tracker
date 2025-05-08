export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: 'monthly' | 'yearly';
}

export interface ExpensesSummary {
  totalAmount: number;
  byCategory: {
    [category: string]: number;
  };
}

export type ThemeMode = 'light' | 'dark';