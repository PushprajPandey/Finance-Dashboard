import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [role, setRole] = useState('Admin'); // 'Admin' or 'Viewer'
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    if (saved) return JSON.parse(saved);
    return initialTransactions;
  });

  // Calculate metrics
  const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([{ ...transaction, id: uuidv4() }, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const updateTransaction = (id, updatedData) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
  };

  const getTransactionsByCategory = () => {
    const expensesOnly = transactions.filter((t) => t.type === 'Expense');
    const categories = expensesOnly.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount);
      return acc;
    }, {});
    return categories;
  };

  const getMonthlyTrend = () => {
    // simplified mock trend data based on recent months
    // normally we would parse dates, but here we provide a static-like structure 
    // mapped to the last 6 months dynamically.
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => {
      return {
        name: month,
        balance: 80000 + (index * 5000) + (Math.random() * 10000), 
      }
    });
  };

  const value = {
    role,
    setRole,
    transactions,
    totalBalance,
    totalIncome,
    totalExpenses,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getTransactionsByCategory,
    getMonthlyTrend
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}
