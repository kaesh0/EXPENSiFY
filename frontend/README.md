# 💸 Expens!fy

A modern full-stack expense tracker built with the MERN stack that helps users securely manage their personal finances.

---

## 🚀 Live Demo

**Frontend:** https://expensify-ivory.vercel.app

**Backend API:** https://expensify-vkno.onrender.com

---
## 📷 Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Login
![Login](./screenshots/login.png)

### Sign Up
![Sign Up](./screenshots/signup.png)

### Expense List
![Expenses](./screenshots/expenses.png)

### Add Expense
![Add Expense](./screenshots/add-expense.png)

### Edit Expense
![Edit Expense](./screenshots/edit-expense.png)

### Profile
![Profile](./screenshots/profile.png)

### Mobile View
![Mobile](./screenshots/mobile.png)


## ✨ Features

- 🔐 Secure JWT Authentication
- 🍪 HTTP-only Cookie Authentication
- 👤 User Registration & Login
- 💰 Add Expenses
- ✏️ Edit Existing Expenses
- 🗑️ Delete Individual Expenses
- 🧹 Delete All Expenses
- 📊 Dashboard with Financial Summary
- 📜 Recent Transactions
- 👤 Update User Profile
- 🔒 Protected Routes
- 📱 Responsive UI

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- Cookie Parser
- CORS

---

## 📂 Project Structure

```text
EXPENSIFY
│
├── backend
│   ├── controller
│   ├── middleware
│   ├── model
│   ├── route
│   ├── service
│   └── index.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── context
│   └── public
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <YOUR_GITHUB_REPO_URL>
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Run the backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:3000
```

Run the frontend.

```bash
npm run dev
```

---

## 📷 Screenshots

Add screenshots of:

- Login Page
- Dashboard
- Add Expense
- Edit Expense
- Profile

---

## 🔒 Authentication

This project uses:

- JWT Authentication
- HTTP-only Cookies
- Protected Backend Routes
- bcrypt Password Hashing

---

## 🌱 Future Improvements

- Expense Categories
- Monthly Analytics
- Charts & Graphs
- Budget Planning
- CSV Export
- Dark Mode
- Search & Filters

---

## 👨‍💻 Author

**Aayush Yadav**

GitHub: https://github.com/<YOUR_USERNAME>

LinkedIn: https://linkedin.com/in/<YOUR_LINKEDIN>