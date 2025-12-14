# TruState Pro - Retail Sales Management System

A full-stack MERN application for managing and analyzing retail sales data. This project features a robust REST API backend and a modern Next.js frontend with dynamic filtering, pagination, and data visualization.

## 🚀 Live Demo

- **Frontend:** [https://trustate-pro.vercel.app](https://trustate-pro.vercel.app) (Replace with actual Vercel URL if different)
- **Backend API:** [https://truestate-pro.onrender.com](https://truestate-pro.onrender.com)

## 🛠 Tech Stack

### Frontend
- **Framework:** [Next.js 14](https://nextjs.org/) (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **Data Fetching:** Native Fetch API

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Atlas)
- **ODM:** Mongoose

## 📦 Features

- **Sales Dashboard:** View comprehensive sales statistics (Total Sales, Units Sold, etc.).
- **Data Grid:** Interactive table with transaction details.
- **Advanced Filtering:** Filter by Gender, Region, Payment Method, and more.
- **Search:** Real-time search by Customer Name.
- **Pagination:** Cursor-based or page-based navigation for large datasets.
- **Responsive Design:** Fully optimized for desktop and mobile.

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account (or local MongoDB)

### 1. Clone the Repository
```bash
git clone https://github.com/Beast-1-3/Trustate_pro.git
cd Tru_state
```

### 2. Backward Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3001
NODE_ENV=development
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
```
Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```
Start the frontend:
```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.

## 🚀 Deployment

### Backend (Render)
1. Push code to GitHub.
2. Create a **Web Service** on Render.
3. Set Root Directory to `backend`.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add Environment Variables (`MONGODB_URI`, `NODE_ENV=production`).

### Frontend (Vercel)
1. Push code to GitHub.
2. Import project into Vercel.
3. Set Root Directory to `frontend`.
4. Add Environment Variable `NEXT_PUBLIC_API_URL` pointing to your Render backend URL.
5. Deploy.

## 📄 License
This project is licensed under the MIT License.
