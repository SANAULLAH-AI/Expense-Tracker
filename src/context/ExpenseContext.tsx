import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Budget, Category, Expense } from '../types';
import { generateId } from '../utils/helpers';
import { defaultCategories } from '../data/categories';

interface ExpenseState {
  expenses: Expense[];
  categories: Category[];
  budgets: Budget[];
  isLoading: boolean;
}

type ExpenseAction =
  | { type: 'ADD_EXPENSE'; payload: Omit<Expense, 'id'> }
  | { type: 'UPDATE_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Omit<Category, 'id'> }
  | { type: 'UPDATE_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'SET_BUDGET'; payload: Omit<Budget, 'id'> }
  | { type: 'UPDATE_BUDGET'; payload: Budget }
  | { type: 'DELETE_BUDGET'; payload: string }
  | { type: 'SET_INITIAL_DATA'; payload: Partial<ExpenseState> };

const initialState: ExpenseState = {
  expenses: [],
  categories: defaultCategories,
  budgets: [],
  isLoading: true,
};

const expenseReducer = (state: ExpenseState, action: ExpenseAction): ExpenseState => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [
          ...state.expenses,
          { ...action.payload, id: generateId() },
        ],
      };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [
          ...state.categories,
          { ...action.payload, id: generateId() },
        ],
      };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter((category) => category.id !== action.payload),
      };
    case 'SET_BUDGET':
      // First check if budget for this category already exists
      const existingBudgetIndex = state.budgets.findIndex(
        (budget) => budget.category === action.payload.category
      );
      
      if (existingBudgetIndex >= 0) {
        // Update existing budget
        const updatedBudgets = [...state.budgets];
        updatedBudgets[existingBudgetIndex] = {
          ...updatedBudgets[existingBudgetIndex],
          ...action.payload,
        };
        return {
          ...state,
          budgets: updatedBudgets,
        };
      } else {
        // Add new budget
        return {
          ...state,
          budgets: [
            ...state.budgets,
            { ...action.payload, id: generateId() },
          ],
        };
      }
    case 'UPDATE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map((budget) =>
          budget.id === action.payload.id ? action.payload : budget
        ),
      };
    case 'DELETE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.filter((budget) => budget.id !== action.payload),
      };
    case 'SET_INITIAL_DATA':
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

interface ExpenseContextType extends ExpenseState {
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  setBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadData = () => {
      const storedExpenses = localStorage.getItem('expenses');
      const storedCategories = localStorage.getItem('categories');
      const storedBudgets = localStorage.getItem('budgets');

      const initialData: Partial<ExpenseState> = {
        isLoading: false,
      };

      if (storedExpenses) {
        initialData.expenses = JSON.parse(storedExpenses);
      }

      if (storedCategories) {
        initialData.categories = JSON.parse(storedCategories);
      } else {
        initialData.categories = defaultCategories;
      }

      if (storedBudgets) {
        initialData.budgets = JSON.parse(storedBudgets);
      }

      dispatch({ type: 'SET_INITIAL_DATA', payload: initialData });
    };

    loadData();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem('expenses', JSON.stringify(state.expenses));
      localStorage.setItem('categories', JSON.stringify(state.categories));
      localStorage.setItem('budgets', JSON.stringify(state.budgets));
    }
  }, [state.expenses, state.categories, state.budgets, state.isLoading]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    dispatch({ type: 'ADD_EXPENSE', payload: expense });
  };

  const updateExpense = (expense: Expense) => {
    dispatch({ type: 'UPDATE_EXPENSE', payload: expense });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    dispatch({ type: 'ADD_CATEGORY', payload: category });
  };

  const updateCategory = (category: Category) => {
    dispatch({ type: 'UPDATE_CATEGORY', payload: category });
  };

  const deleteCategory = (id: string) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: id });
  };

  const setBudget = (budget: Omit<Budget, 'id'>) => {
    dispatch({ type: 'SET_BUDGET', payload: budget });
  };

  const updateBudget = (budget: Budget) => {
    dispatch({ type: 'UPDATE_BUDGET', payload: budget });
  };

  const deleteBudget = (id: string) => {
    dispatch({ type: 'DELETE_BUDGET', payload: id });
  };

  return (
    <ExpenseContext.Provider
      value={{
        ...state,
        addExpense,
        updateExpense,
        deleteExpense,
        addCategory,
        updateCategory,
        deleteCategory,
        setBudget,
        updateBudget,
        deleteBudget,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};