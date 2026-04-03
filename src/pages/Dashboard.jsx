import React from "react";
import { useFinance } from "../context/FinanceContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    transactions,
    totalBalance,
    totalIncome,
    totalExpenses,
    getTransactionsByCategory,
    getMonthlyTrend,
  } = useFinance();

  const trendData = getMonthlyTrend();
  const categoryData = getTransactionsByCategory();
  const pieData = Object.keys(categoryData)
    .map((key) => ({
      name: key,
      value: categoryData[key],
    }))
    .sort((a, b) => b.value - a.value);

  const COLORS = ["#2170e4", "#007550", "#d8e2ff", "#737688", "#0058be"];

  const highestCategory =
    pieData.length > 0 ? pieData[0] : { name: "N/A", value: 0 };
  const highestPercentage =
    totalExpenses > 0
      ? ((highestCategory.value / totalExpenses) * 100).toFixed(0)
      : 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary text-white text-[10px] px-3 py-2 rounded-lg shadow-lg font-bold">
          <p>{`${label} : ${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Summary Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden group p-8 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary editorial-shadow transition-transform hover:-translate-y-1 duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-20 transform translate-x-4 -translate-y-4">
            <span
              className="material-symbols-outlined text-8xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
          </div>
          <div className="relative z-10">
            <p className="font-manrope text-sm font-medium opacity-80 uppercase tracking-widest mb-2">
              Total Balance
            </p>
            <h3 className="font-headline text-4xl font-extrabold tracking-tight mb-4">
              $
              {totalBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h3>
            <div className="flex items-center gap-2 text-xs font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-md text-white">
              <span className="material-symbols-outlined text-sm">
                trending_up
              </span>
              <span>Based on loaded data</span>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-xl bg-surface-container-lowest dark:bg-slate-800 editorial-shadow transition-all hover:bg-surface-container-low dark:hover:bg-slate-700 duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-on-tertiary-fixed">
                payments
              </span>
            </div>
          </div>
          <p className="font-manrope text-sm font-medium text-on-surface-variant dark:text-slate-400 uppercase tracking-widest mb-1">
            Total Income
          </p>
          <h3 className="font-headline text-3xl font-bold tracking-tight text-on-surface dark:text-white">
            $
            {totalIncome.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </h3>
        </div>

        <div className="p-8 rounded-xl bg-surface-container-lowest dark:bg-slate-800 editorial-shadow transition-all hover:bg-surface-container-low dark:hover:bg-slate-700 duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-error-container">
                shopping_cart
              </span>
            </div>
          </div>
          <p className="font-manrope text-sm font-medium text-on-surface-variant dark:text-slate-400 uppercase tracking-widest mb-1">
            Total Expenses
          </p>
          <h3 className="font-headline text-3xl font-bold tracking-tight text-on-surface dark:text-white">
            $
            {totalExpenses.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </h3>
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 rounded-xl bg-surface-container-low dark:bg-slate-800 h-[400px] flex flex-col relative">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-headline text-xl font-bold text-on-surface dark:text-white">
                Balance Trend
              </h4>
              <p className="text-sm text-on-surface-variant dark:text-slate-400">
                Net growth over the last 6 months
              </p>
            </div>
          </div>
          <div className="flex-1 w-full h-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2170e4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2170e4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: "#737688" }}
                />
                <YAxis hide domain={["dataMin - 10000", "dataMax + 10000"]} />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: "#2170e4",
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#2170e4"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorBalance)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 rounded-xl bg-surface-container-low dark:bg-slate-800 h-[400px] flex flex-col">
          <h4 className="font-headline text-xl font-bold text-on-surface dark:text-white mb-2">
            Spending
          </h4>
          <p className="text-sm text-on-surface-variant dark:text-slate-400 mb-2">
            Category distribution
          </p>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mt-2">
              <span className="block font-headline text-xl font-extrabold text-on-surface dark:text-white">
                $
                {totalExpenses > 1000
                  ? (totalExpenses / 1000).toFixed(1) + "k"
                  : totalExpenses}
              </span>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-slate-400">
                Total
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-3 mt-4">
            {pieData.slice(0, 4).map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className="text-[10px] font-medium text-on-surface dark:text-slate-300 truncate">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-surface-container-highest/30 dark:bg-slate-800/50 border border-outline-variant/10 dark:border-slate-700 flex items-center gap-4 group hover:bg-surface-container-highest/50 transition-all">
          <div className="w-14 h-14 rounded-full bg-surface-container-lowest dark:bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-secondary">
              flight_takeoff
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-widest">
              Highest Category
            </p>
            <h5 className="font-headline text-lg font-bold text-on-surface dark:text-white leading-tight">
              {highestCategory.name}
            </h5>
            <p className="text-sm font-medium text-secondary">
              {highestPercentage}% of monthly spend
            </p>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-surface-container-highest/30 dark:bg-slate-800/50 border border-outline-variant/10 dark:border-slate-700 flex items-center gap-4 group hover:bg-surface-container-highest/50 transition-all">
          <div className="w-14 h-14 rounded-full bg-surface-container-lowest dark:bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-tertiary">
              compare_arrows
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-widest">
              Monthly Growth
            </p>
            <h5 className="font-headline text-lg font-bold text-on-surface dark:text-white leading-tight">
              Upward Trend
            </h5>
            <p className="text-sm font-medium text-tertiary">
              Steady performance
            </p>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-surface-container-highest/30 dark:bg-slate-800/50 border border-outline-variant/10 dark:border-slate-700 flex items-center gap-4 group hover:bg-surface-container-highest/50 transition-all">
          <div className="w-14 h-14 rounded-full bg-surface-container-lowest dark:bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary dark:text-white">
              view_list
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-widest">
              Transactions
            </p>
            <h5 className="font-headline text-lg font-bold text-on-surface dark:text-white leading-tight">
              {transactions.length} Completed
            </h5>
            <p className="text-sm font-medium text-on-surface-variant dark:text-slate-500">
              Total recorded
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Transactions Table */}
      <section className="bg-surface-container-lowest dark:bg-slate-800 rounded-xl editorial-shadow overflow-hidden">
        <div className="px-8 py-6 flex justify-between items-center bg-surface-container-low/50 dark:bg-slate-800/80 border-b border-outline-variant/5">
          <h4 className="font-headline text-xl font-bold text-on-surface dark:text-white">
            Recent Transactions
          </h4>
          <Link
            to="/transactions"
            className="text-sm font-bold text-secondary hover:underline transition-all"
          >
            View All History
          </Link>
        </div>
        <div className="divide-y divide-outline-variant/10 dark:divide-slate-700">
          <div className="grid grid-cols-4 px-8 py-4 text-[10px] font-bold text-on-surface-variant dark:text-slate-500 uppercase tracking-widest bg-surface-container-low/20 dark:bg-slate-900/50">
            <span>Entity</span>
            <span>Date</span>
            <span>Status</span>
            <span className="text-right">Amount</span>
          </div>

          {transactions.slice(0, 3).map((transaction) => (
            <div
              key={transaction.id}
              className="grid grid-cols-4 px-8 py-5 items-center hover:bg-surface-container-low dark:hover:bg-slate-700/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high dark:bg-slate-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-300">
                    {transaction.icon || "receipt"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface dark:text-white">
                    {transaction.entity}
                  </p>
                  <p className="text-[10px] text-on-surface-variant dark:text-slate-400">
                    {transaction.category}
                  </p>
                </div>
              </div>
              <span className="text-sm text-on-surface-variant dark:text-slate-400">
                {transaction.date}
              </span>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    transaction.status === "Completed"
                      ? "bg-tertiary-fixed/30 text-tertiary dark:text-on-tertiary-container"
                      : "bg-secondary-fixed/50 text-secondary dark:text-blue-300"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
              <span
                className={`text-sm font-bold text-right ${transaction.amount > 0 ? "text-tertiary dark:text-tertiary-fixed" : "text-on-surface dark:text-white"}`}
              >
                {transaction.amount > 0 ? "+" : ""}
                {transaction.amount < 0 ? "-" : ""}$
                {Math.abs(transaction.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="px-8 py-6 text-center text-sm font-medium text-outline dark:text-slate-500">
              No transactions found. Adding one in the Transactions tab.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
