import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";

const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();
  const { role, setRole } = useFinance();
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Overview";
      case "/transactions":
        return "Transactions";
      default:
        return "Overview";
    }
  };

  const notifications = [
    {
      id: 1,
      title: "New transaction added",
      message: "AWS Web Services payment processed",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Monthly report ready",
      message: "Your financial summary is available",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "Budget alert",
      message: "You've reached 80% of your monthly budget",
      time: "1 day ago",
      unread: false,
    },
  ];

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl flex justify-between items-center h-16 px-4 md:px-8 border-b border-outline-variant/10 dark:border-slate-800">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 rounded-lg"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="flex items-center gap-2">
          <h2 className="font-manrope text-base md:text-lg font-semibold text-on-surface dark:text-white">
            Dashboard
          </h2>
          <span className="hidden sm:inline text-outline-variant/40 dark:text-slate-500 text-sm">
            /
          </span>
          <span className="hidden sm:inline text-on-surface-variant dark:text-slate-300 text-sm font-medium">
            {getPageTitle()}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-6">
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-10 h-10 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors flex items-center justify-center text-on-surface-variant dark:text-slate-300"
          title="Toggle Dark Mode"
        >
          <span className="material-symbols-outlined text-xl">
            {isDark ? "light_mode" : "dark_mode"}
          </span>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-xl text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-white cursor-pointer transition-all active:scale-95 duration-200">
              notifications
            </span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-outline-variant/10 dark:border-slate-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-outline-variant/10 dark:border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-sm text-on-surface dark:text-white">
                  Notifications
                </h3>
                <span className="text-xs text-secondary dark:text-blue-400 cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3 border-b border-outline-variant/10 dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-700/50 cursor-pointer ${notif.unread ? "bg-blue-50/30 dark:bg-blue-900/10" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-sm text-on-surface dark:text-white">
                        {notif.title}
                      </h4>
                      {notif.unread && (
                        <span className="w-2 h-2 bg-secondary rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400 mb-1">
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-outline dark:text-slate-500">
                      {notif.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 text-center border-t border-outline-variant/10 dark:border-slate-700">
                <span className="text-xs text-secondary dark:text-blue-400 cursor-pointer hover:underline font-semibold">
                  View all notifications
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Profile/Settings */}
        <div
          className="flex items-center gap-2 md:gap-3 pl-3 md:pl-6 border-l border-outline-variant/20 dark:border-slate-700 relative"
          ref={profileRef}
        >
          <span className="hidden md:inline text-sm font-semibold text-on-surface-variant dark:text-slate-300">
            {role}
          </span>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-2xl text-blue-600 dark:text-blue-400 cursor-pointer transition-all active:scale-95 duration-200">
              account_circle
            </span>
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 w-64 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-outline-variant/10 dark:border-slate-700 overflow-hidden">
              <div className="px-4 py-4 border-b border-outline-variant/10 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    alt="User Profile"
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://ui-avatars.com/api/?name=Alex+Mercer&background=2170e4&color=fff"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface dark:text-white truncate">
                      Alex Mercer
                    </p>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400 truncate">
                      alex@finance.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 px-2 py-1.5 bg-surface-container-low dark:bg-slate-700/50 rounded-lg">
                  <span className="text-xs font-semibold text-on-surface-variant dark:text-slate-300">
                    {role} Account
                  </span>
                  <button
                    onClick={() => {
                      setRole(role === "Admin" ? "Viewer" : "Admin");
                      setShowProfile(false);
                    }}
                    className="text-xs text-secondary dark:text-blue-400 hover:underline font-semibold"
                  >
                    Switch
                  </button>
                </div>
              </div>

              <div className="py-2">
                <button className="w-full px-4 py-2.5 text-left text-sm text-on-surface dark:text-slate-300 hover:bg-surface-container-low dark:hover:bg-slate-700/50 flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg">
                    person
                  </span>
                  My Profile
                </button>
                <button className="w-full px-4 py-2.5 text-left text-sm text-on-surface dark:text-slate-300 hover:bg-surface-container-low dark:hover:bg-slate-700/50 flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg">
                    settings
                  </span>
                  Settings
                </button>
                <button className="w-full px-4 py-2.5 text-left text-sm text-on-surface dark:text-slate-300 hover:bg-surface-container-low dark:hover:bg-slate-700/50 flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg">
                    help
                  </span>
                  Help & Support
                </button>
              </div>

              <div className="border-t border-outline-variant/10 dark:border-slate-700 py-2">
                <button className="w-full px-4 py-2.5 text-left text-sm text-error dark:text-red-400 hover:bg-error-container/20 dark:hover:bg-red-900/20 flex items-center gap-3 font-semibold">
                  <span className="material-symbols-outlined text-lg">
                    logout
                  </span>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
