# Finance Dashboard UI

A modern, interactive finance dashboard built with React, featuring comprehensive transaction management, data visualizations, and role-based UI controls.

## 🎯 Project Overview

This finance dashboard allows users to track and understand their financial activity through an intuitive interface. It includes summary cards, interactive charts, transaction management, and role-based access control - all implemented on the frontend with mock data.

## ✨ Features Implemented

### 1. Dashboard Overview ✅

- **Summary Cards**: Display Total Balance, Total Income, and Total Expenses
- **Time-based Visualization**: Area chart showing balance trend over 6 months
- **Categorical Visualization**: Pie chart showing spending breakdown by category
- **Real-time Calculations**: All metrics update dynamically based on transactions

### 2. Transactions Section ✅

- **Complete Transaction List**: Shows all transactions with:
  - Entity/Description
  - Date
  - Amount (color-coded: green for income, default for expenses)
  - Category
  - Type (Income/Expense)
  - Status (Completed/Pending)
- **Filtering**: Filter by transaction type (All/Income/Expense)
- **Sorting**: Multiple sort options (Date, Amount - ascending/descending)
- **Search**: Real-time search by entity name or category
- **CRUD Operations**: Add, edit, and delete transactions (Admin only)

### 3. Role-Based UI ✅

- **Two Roles**: Admin and Viewer
- **Role Switching**: Easy toggle between roles via:
  - Sidebar profile section
  - Navbar profile dropdown
- **Permission-based Features**:
  - **Admin**: Can add, edit, and delete transactions
  - **Viewer**: Read-only access, no modification buttons shown
- **Visual Indicators**: Role displayed in navbar and sidebar

### 4. Insights Section ✅

- **Highest Spending Category**: Shows top expense category with percentage
- **Monthly Growth**: Displays trend analysis
- **Transaction Count**: Total completed transactions
- **Recent Transactions**: Quick view of latest 3 transactions on dashboard

### 5. State Management ✅

- **Context API**: Using React Context for global state
- **Managed State**:
  - Transactions data
  - User role (Admin/Viewer)
  - Calculated metrics (balance, income, expenses)
- **Local Storage**: Transactions persist across sessions
- **Real-time Updates**: All components react to state changes

### 6. UI/UX Features ✅

- **Clean Design**: Modern, professional interface using Material Design principles
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Empty States**: Graceful handling of no data scenarios
- **Loading States**: Smooth transitions and interactions
- **Accessibility**: Semantic HTML and ARIA labels

## 🎨 Optional Enhancements Implemented

### ✅ Dark Mode

- Complete dark mode implementation
- Toggle button in navbar
- Smooth transitions between themes
- Proper color contrast in both modes
- Persists user preference

### ✅ Data Persistence

- LocalStorage integration
- Transactions saved automatically
- Data persists across browser sessions

### ✅ Notifications System

- Notification panel in navbar
- Unread indicators
- Sample notifications for transactions and alerts
- Dropdown with click-outside-to-close functionality

### ✅ Profile/Settings Menu

- User profile dropdown
- Quick role switching
- Menu options: Profile, Settings, Help & Support
- Logout functionality
- User avatar and email display

### ✅ Animations & Transitions

- Smooth hover effects
- Card animations
- Modal transitions
- Button interactions
- Chart animations (via Recharts)

## 🛠️ Tech Stack

- **Framework**: React 19.2.4
- **Routing**: React Router DOM 7.13.2
- **Styling**: Tailwind CSS 4.2.2
- **Charts**: Recharts 3.8.1
- **Build Tool**: Vite 8.0.1
- **Icons**: Material Symbols (Google Fonts)
- **State Management**: React Context API
- **Data Persistence**: LocalStorage
- **UUID Generation**: uuid 13.0.0

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

```bash
cd finance-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open in browser**

```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
finance-app/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Main layout wrapper
│   │   ├── Navbar.jsx          # Top navigation with notifications & profile
│   │   ├── Sidebar.jsx         # Side navigation
│   │   └── TransactionForm.jsx # Add/Edit transaction modal
│   ├── context/
│   │   └── FinanceContext.jsx  # Global state management
│   ├── data/
│   │   └── mockData.js         # Initial transaction data
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main dashboard with charts
│   │   └── Transactions.jsx    # Transaction list page
│   ├── App.jsx                 # Root component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles & theme
├── public/
│   ├── icons.svg              # SVG icons
│   └── favicon.svg            # Favicon
└── package.json
```

## 🎨 Design Decisions

### Color System

- Used Material Design 3 color tokens for consistency
- Custom CSS variables for easy theming
- Proper contrast ratios for accessibility

### Component Architecture

- Modular, reusable components
- Clear separation of concerns
- Context for global state, local state for UI

### Responsive Strategy

- Mobile-first approach
- Tailwind breakpoints for different screen sizes
- Flexible grid layouts

### Data Flow

- Unidirectional data flow
- Context provides data and actions
- Components consume and dispatch updates

## 🔍 Key Features Breakdown

### Dashboard Page

- **Summary Cards**: Animated cards with gradient backgrounds
- **Balance Trend Chart**: Interactive area chart with tooltips
- **Spending Pie Chart**: Donut chart with category breakdown
- **Insights Cards**: Quick stats with icons
- **Recent Transactions**: Preview of latest activity

### Transactions Page

- **Advanced Filtering**: Type-based filters
- **Multi-sort Options**: Date and amount sorting
- **Real-time Search**: Instant results as you type
- **Inline Actions**: Edit and delete buttons (Admin only)
- **Modal Form**: Clean form for adding/editing transactions

### Role-Based Access Control

- **Frontend Simulation**: No backend required
- **UI Adaptation**: Buttons and actions show/hide based on role
- **Easy Testing**: Switch roles instantly to see different views

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Assignment Requirements Checklist

### Core Requirements

- ✅ Dashboard Overview with summary cards
- ✅ Time-based visualization (balance trend)
- ✅ Categorical visualization (spending breakdown)
- ✅ Transactions section with full details
- ✅ Filtering, sorting, and search
- ✅ Role-based UI (Admin/Viewer)
- ✅ Insights section with key metrics
- ✅ Proper state management
- ✅ Clean and readable design
- ✅ Responsive across screen sizes
- ✅ Handles empty states gracefully

### Optional Enhancements

- ✅ Dark mode
- ✅ Data persistence (LocalStorage)
- ✅ Animations and transitions
- ✅ Advanced filtering
- ✅ Notifications system
- ✅ Profile/Settings menu

## 🚀 Future Enhancements

While not implemented in this version, potential additions could include:

- Backend API integration
- Real authentication system
- Export to CSV/JSON
- Budget tracking and alerts
- Recurring transactions
- Multi-currency support
- Advanced analytics and reports

## 📝 Notes

- All data is mock data stored in LocalStorage
- Role switching is simulated on the frontend
- Charts use sample data for demonstration
- No backend or API calls required

## 👨‍💻 Development Approach

This project demonstrates:

- Clean code organization
- Component reusability
- Proper state management
- Responsive design principles
- User experience focus
- Attention to detail
- Modern React patterns

## 📄 License

This project is created for assignment evaluation purposes.

---

**Built with ❤️ using React + Vite + Tailwind CSS**
