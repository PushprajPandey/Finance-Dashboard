import React, { useState, useMemo } from "react";
import { useFinance } from "../context/FinanceContext";
import TransactionForm from "../components/TransactionForm";

const Transactions = () => {
  const {
    transactions,
    role,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  } = useFinance();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("DateDesc");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const filteredAndSorted = useMemo(() => {
    let result = transactions;

    // Search
    if (searchQuery) {
      result = result.filter(
        (t) =>
          t.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter Type
    if (filterType !== "All") {
      result = result.filter((t) => t.type === filterType);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "DateDesc") return new Date(b.date) - new Date(a.date);
      if (sortBy === "DateAsc") return new Date(a.date) - new Date(b.date);
      if (sortBy === "AmountDesc")
        return Math.abs(b.amount) - Math.abs(a.amount);
      if (sortBy === "AmountAsc")
        return Math.abs(a.amount) - Math.abs(b.amount);
      return 0;
    });

    return result;
  }, [transactions, searchQuery, filterType, sortBy]);

  const handleOpenModal = (transaction = null) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleSubmit = (data) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data);
    } else {
      addTransaction(data);
    }
    handleCloseModal();
  };

  const formatAmount = (amount) => {
    return `${amount > 0 ? "+" : ""}${amount < 0 ? "-" : ""}$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-headline text-2xl font-bold dark:text-white">
            All Transactions
          </h3>
          <p className="text-sm text-on-surface-variant dark:text-slate-400">
            View and manage your transaction history.
          </p>
        </div>
        {role === "Admin" && (
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-lg font-bold shadow-sm hover:bg-secondary/90 transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
            New Transaction
          </button>
        )}
      </div>

      <div className="bg-surface-container-lowest dark:bg-slate-800 rounded-xl editorial-shadow overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 bg-surface-container-low/50 dark:bg-slate-800/80 border-b border-outline-variant/10 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search by entity or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-outline-variant/30 dark:border-slate-600 rounded-lg outline-none focus:border-secondary bg-white dark:bg-slate-700 dark:text-white text-sm transition-colors placeholder:text-on-surface-variant dark:placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-slate-700 dark:text-white border border-outline-variant/30 dark:border-slate-600 rounded-lg text-sm font-medium outline-none focus:border-secondary"
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-slate-700 dark:text-white border border-outline-variant/30 dark:border-slate-600 rounded-lg text-sm font-medium outline-none focus:border-secondary"
            >
              <option value="DateDesc">Newest First</option>
              <option value="DateAsc">Oldest First</option>
              <option value="AmountDesc">Highest Amount</option>
              <option value="AmountAsc">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* Table Head */}
        <div
          className={`grid ${role === "Admin" ? "grid-cols-[2fr_1fr_1fr_1fr_100px]" : "grid-cols-4"} px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest bg-surface-container-low/20 dark:bg-slate-900/50`}
        >
          <span>Entity</span>
          <span>Date</span>
          <span>Status</span>
          <span className="text-right">Amount</span>
          {role === "Admin" && <span className="text-center">Actions</span>}
        </div>

        {/* Table Body */}
        <div className="divide-y divide-outline-variant/10 dark:divide-slate-700 min-h-[400px]">
          {filteredAndSorted.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-outline">
              <span className="material-symbols-outlined text-4xl mb-2">
                inbox
              </span>
              <p>No transactions found.</p>
            </div>
          ) : (
            filteredAndSorted.map((t) => (
              <div
                key={t.id}
                className={`grid ${role === "Admin" ? "grid-cols-[2fr_1fr_1fr_1fr_100px]" : "grid-cols-4"} px-8 py-5 items-center hover:bg-surface-container-low dark:hover:bg-slate-700/50 transition-colors group`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high dark:bg-slate-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant">
                      {t.icon || "receipt"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface dark:text-white">
                      {t.entity}
                    </p>
                    <p className="text-[10px] text-on-surface-variant dark:text-slate-400">
                      {t.category}
                    </p>
                  </div>
                </div>

                <span className="text-sm text-on-surface-variant dark:text-slate-300">
                  {t.date}
                </span>

                <div>
                  <span
                    className={`px-2 py-1 rounded-sm text-[10px] font-bold ${
                      t.status === "Completed"
                        ? "bg-tertiary-fixed/30 text-tertiary dark:text-on-tertiary-container"
                        : "bg-secondary-fixed/50 text-secondary dark:text-blue-300"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>

                <span
                  className={`text-sm font-bold text-right ${t.amount > 0 ? "text-tertiary dark:text-tertiary-fixed" : "text-on-surface dark:text-white"}`}
                >
                  {formatAmount(t.amount)}
                </span>

                {role === "Admin" && (
                  <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenModal(t)}
                      className="w-8 h-8 rounded flex justify-center items-center hover:bg-white dark:hover:bg-slate-600 text-secondary"
                      title="Edit"
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "18px" }}
                      >
                        edit
                      </span>
                    </button>
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="w-8 h-8 rounded flex justify-center items-center hover:bg-error-container hover:text-error text-outline"
                      title="Delete"
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "18px" }}
                      >
                        delete
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <TransactionForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={editingTransaction}
      />
    </div>
  );
};

export default Transactions;
