import React, { useState, useEffect } from 'react';

const TransactionForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    entity: '',
    category: '',
    type: 'Expense',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Completed',
    icon: 'receipt', // default icon
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        entity: '',
        category: '',
        type: 'Expense',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Completed',
        icon: 'receipt',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountVal = parseFloat(formData.amount);
    const finalData = {
      ...formData,
      amount: formData.type === 'Expense' ? -Math.abs(amountVal) : Math.abs(amountVal),
    };
    onSubmit(finalData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-outline/20 backdrop-blur-[2px]">
      <div className="bg-surface-container-lowest dark:bg-slate-800 rounded-2xl w-full max-w-md editorial-shadow p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-outline-variant hover:text-on-surface dark:hover:text-white"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <h3 className="text-xl font-headline font-bold mb-6 text-on-surface dark:text-white">
          {initialData ? 'Edit Transaction' : 'New Transaction'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-400 mb-1">Entity / Description</label>
            <input 
              required
              type="text" 
              value={formData.entity}
              onChange={(e) => setFormData({...formData, entity: e.target.value})}
              className="w-full px-4 py-2 bg-surface-container-low dark:bg-slate-700 text-on-surface dark:text-white rounded-lg outline-none border border-transparent focus:border-secondary transition-colors"
              placeholder="e.g. Apple Store Soho"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-400 mb-1">Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-4 py-2 bg-surface-container-low dark:bg-slate-700 text-on-surface dark:text-white rounded-lg outline-none border border-transparent focus:border-secondary"
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-400 mb-1">Amount</label>
              <input 
                required
                type="number" 
                step="0.01"
                min="0"
                value={Math.abs(formData.amount) || ''}
                onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 bg-surface-container-low dark:bg-slate-700 text-on-surface dark:text-white rounded-lg outline-none border border-transparent focus:border-secondary"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-400 mb-1">Category</label>
              <input 
                required
                type="text" 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2 bg-surface-container-low dark:bg-slate-700 text-on-surface dark:text-white rounded-lg outline-none border border-transparent focus:border-secondary"
                placeholder="e.g. Hardware"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant dark:text-slate-400 mb-1">Date</label>
              <input 
                required
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-2 bg-surface-container-low dark:bg-slate-700 text-on-surface dark:text-white rounded-lg outline-none border border-transparent focus:border-secondary"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2 rounded-lg font-bold text-sm text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-low dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 rounded-lg font-bold text-sm bg-secondary text-white hover:bg-secondary/90 transition-colors"
            >
              {initialData ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
