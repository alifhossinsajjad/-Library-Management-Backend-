# Library Management System - Backend API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A robust, highly scalable RESTful API built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** for managing library operations. The system handles book inventory, user management, and tracking of borrowed books using MongoDB transactions to ensure data consistency (ACID compliance).

Live API: [https://library-management-five-psi.vercel.app/](https://library-management-five-psi.vercel.app/)

## 🚀 Key Features

- **User Management:** Register and track users (Members/Admins).
- **Book Inventory:** Add books, track quantities, and automatically manage the `available` status based on the current copies in stock.
- **Borrowing System:** Users can borrow books. The system uses **MongoDB Transactions (Sessions)** to safely deduct book quantities and create borrow records simultaneously, preventing race conditions.
- **Global Error Handling:** Centralized error handling middleware for consistent API responses.
- **CI/CD Pipeline:** Fully automated CI/CD pipeline using **GitHub Actions** for continuous integration and **Vercel** for serverless deployment.

## 🛠️ Tech Stack

- **Backend Framework:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB, Mongoose ORM
- **Validation:** Zod (Schema Validation)
- **Deployment:** Vercel (Serverless Functions)
- **CI/CD:** GitHub Actions

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/alifhossinsajjad/-Library-Management-Backend-.git
   cd -Library-Management-Backend-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   DATABASE_URL=your_mongodb_connection_string
   ```

4. **Run the application (Development):**
   ```bash
   npm run dev
   ```

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

## 🌐 API Endpoints

### Users
- `POST /api/users` - Register a new user.
- `GET /api/users` - Retrieve a list of all users.

### Books
- `POST /api/books` - Add a new book to the library.
- `GET /api/books` - Retrieve all books.

### Borrow System
- `POST /api/borrow` - Borrow a book (Requires `user` ID, `book` ID, and `quantity`).
- `GET /api/borrow` - Retrieve a summary of borrowed books.

## 🔄 CI/CD Pipeline

This project utilizes **GitHub Actions** for Continuous Integration. On every push to the `main` branch, the pipeline automatically:
1. Sets up the Node.js environment.
2. Installs dependencies (`npm ci`).
3. Compiles TypeScript code (`npm run build`) to ensure type safety and catch errors early.

Continuous Deployment is handled by **Vercel**, which listens to the `main` branch and automatically deploys the latest built version as Serverless Functions.
