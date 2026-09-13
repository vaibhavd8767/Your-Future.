# 🎓 College Portal

A beginner-friendly **College Portal Web Application** built using **React, TypeScript, Vite, and Tailwind CSS**.

The portal helps students search and explore colleges, save colleges, and manage their profiles. An administrator can manage college records through the Admin Dashboard.

---

## 🚀 Features

### 👨‍🎓 Student Features

* 🔐 Student Login
* 🔎 Search colleges
* 🎯 Filter colleges by:

  * State
  * District
  * Branch
  * Fees
* 📊 Sort college results
* 🏫 View complete college details
* ❤️ Save colleges
* 👤 View student profile
* 📚 View saved colleges

### 👨‍💼 Admin Features

* 🔐 Administrator Login
* ➕ Add new colleges
* ✏️ Edit college information
* 🗑️ Delete colleges
* 📋 Manage college records

### 🎨 UI Features

* 💻 Responsive website
* 🌐 Modern user interface
* 🎨 Tailwind CSS styling
* 🌌 Interactive 3D background
* ⚡ Fast development using Vite

---

## 🛠️ Technologies Used

| Technology      | Purpose                    |
| --------------- | -------------------------- |
| ⚛️ React        | Frontend UI                |
| 📘 TypeScript   | Type-safe development      |
| ⚡ Vite          | Development and build tool |
| 🎨 Tailwind CSS | Styling                    |
| 🟨 JavaScript   | Application logic          |
| 🐘 PHP          | Optional backend API       |
| 🗄️ MySQL       | Optional database          |

---

## 📁 Project Structure

```text
college/
│
├── 📁 node_modules/
├── 📁 public/
│   ├── api.php
│   ├── database.sql
│   └── .htaccess
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── AdminDashboard.tsx
│   │   ├── CollegeDetail.tsx
│   │   ├── FilterComponent.tsx
│   │   ├── Footer.tsx
│   │   ├── LoginPage.tsx
│   │   ├── LogoutModal.tsx
│   │   ├── MainCatalog.tsx
│   │   ├── ProfileComponent.tsx
│   │   ├── SearchComponent.tsx
│   │   ├── ThreeBackground.tsx
│   │   └── ThreeCollegeCard.tsx
│   │
│   ├── 📁 data/
│   │   └── mockColleges.ts
│   │
│   ├── 📁 utils/
│   │   └── sqlGenerator.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── types.ts
│
├── 📄 .env.example
├── 📄 index.html
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 vite.config.ts
```

---

## 💻 How to Run the Project

### 1️⃣ Clone the Repository

Open PowerShell or Command Prompt:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Then enter the project folder:

```bash
cd college
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start the Development Server

```bash
npm run dev
```

The terminal will show the local development URL.

Usually:

```text
http://localhost:3000
```

Open the URL in your browser.

### ⛔ Stop the Server

Press:

```text
Ctrl + C
```

in PowerShell or Command Prompt.

---

## 📌 Important Project Information

The application currently starts with an **empty college list**.

To add colleges:

1. 🔐 Login as Administrator
2. 📋 Open Admin Dashboard
3. ➕ Add a college
4. 💾 Save the college
5. 🏫 The college will appear in the main catalog

### ⚠️ Important

Currently, college data is stored only while the application is running.

If you refresh the page, the added college records may be lost because a permanent database connection is not currently enabled in `App.tsx`.

---

## 🗄️ Database Support

The project contains optional database files:

```text
public/api.php
public/database.sql
```

These can be used to connect the application with:

* 🐘 PHP
* 🗄️ MySQL
* 🌐 XAMPP

For permanent college storage, the React application can be connected to the PHP API and MySQL database.

---

## 📂 Important Files

### `src/App.tsx`

Main controller of the application.

It manages:

* Logged-in user
* College records
* Saved colleges
* Search
* Filters
* Current page

### `src/main.tsx`

Entry point of the React application.

### `src/types.ts`

Contains TypeScript definitions for:

* College
* User profile
* Filters
* Page names

### `src/components/`

Contains reusable UI components such as:

* Admin Dashboard
* Login Page
* College Details
* Search
* Filters
* Profile
* College Cards
* 3D Background

### `src/data/mockColleges.ts`

Contains sample college data for development and reference.

The current application starts with an empty college list.

### `src/utils/sqlGenerator.ts`

Generates an SQL schema from the Admin area.

---

## 🔧 Available Commands

```bash
npm run dev
```

▶️ Starts the development server.

```bash
npm run build
```

📦 Creates the production build.

```bash
npm run lint
```

🔍 Checks the project for TypeScript/ESLint errors.

---

## 🛡️ Safe Editing Tips

* ✏️ Edit files inside `src/`
* 🚫 Do not edit files inside `node_modules/`
* 🔍 Run `npm run lint` after making changes
* ⚡ Use `npm run dev` to see changes immediately
* 💾 Keep a backup before making major changes
* 🔑 Never upload passwords or API keys
* 🔒 Do not publish real secret keys in `.env` files

---

## 🌐 Deployment

The project can be built for production using:

```bash
npm run build
```

The generated production files can then be deployed to a suitable hosting service.

---

## 🔮 Future Improvements

Some possible improvements for future versions:

* 🗄️ Permanent MySQL database
* 🔐 Secure authentication
* 👨‍💼 Advanced Admin Dashboard
* ❤️ Permanent saved colleges
* 🔎 Advanced college search
* 📊 College comparison
* ⭐ College ratings and reviews
* 📱 Improved mobile responsiveness
* ☁️ Cloud deployment
* 🔔 Notifications

---

## 🎯 Project Goal

The main goal of this project is to provide students with an easy way to:

> 🎓 Search, explore, compare, and save college information from one platform.

It also provides an Admin Dashboard for managing college information.

---

## 👨‍💻 Author

**Vaibhav Dangle**

🎓 MCA Student
📍 Pune, Maharashtra, India

---

## ⭐ Support

If you find this project useful, please consider giving the repository a ⭐ **Star** on GitHub.

**Thank you for visiting this project! ❤️**
