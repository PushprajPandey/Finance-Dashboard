import React from "react";
import { NavLink } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { role, setRole } = useFinance();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`h-screen w-64 fixed left-0 top-0 bg-slate-50 dark:bg-slate-900 flex flex-col py-6 px-4 z-50 border-r border-outline-variant/10 dark:border-slate-800 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="mb-10 px-2 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-fixed text-lg">
              account_balance_wallet
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-headline">
              Finance Tracker
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              Enterprise
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <NavLink
            to="/"
            end
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-manrope text-sm tracking-tight ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-bold border-r-2 border-blue-600 bg-blue-50/50 dark:bg-blue-900/20"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              }`
            }
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </NavLink>
          <NavLink
            to="/transactions"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-manrope text-sm tracking-tight ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-bold border-r-2 border-blue-600 bg-blue-50/50 dark:bg-blue-900/20"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              }`
            }
          >
            <span className="material-symbols-outlined">receipt_long</span>
            Transactions
          </NavLink>
        </nav>

        <div className="mt-auto p-4 rounded-xl bg-surface-container-high/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3 mb-3">
            <img
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover"
              src="https://ui-avatars.com/api/?name=Alex+Mercer&background=2170e4&color=fff"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-on-surface dark:text-white truncate">
                Alex Mercer
              </p>
              <p className="text-[10px] text-on-surface-variant dark:text-slate-400 flex gap-1 mt-1 justify-between w-full">
                <span className="truncate">{role} Account</span>
                <span
                  className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
                  onClick={() => setRole(role === "Admin" ? "Viewer" : "Admin")}
                >
                  Switch
                </span>
              </p>
            </div>
          </div>
          <button className="w-full py-2 text-xs font-bold text-on-surface dark:text-white bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-outline-variant/20 dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-700 transition-colors">
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
