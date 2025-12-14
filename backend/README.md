# Retail Sales Backend API

This is the RESTful API service for the Retail Sales Management System. It handles data persistence, business logic, and data aggregation for the frontend application. Built with **Express.js**, **Node.js**, and **MongoDB**.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Middleware**: CORS, Dotenv

## 📂 Project Structure

```
backend/
├── src/
│   ├── controllers/   # Request logic
│   ├── models/        # Mongoose schemas (Sale.js)
│   ├── routes/        # API route definitions
│   ├── services/      # Business logic and DB queries
│   ├── utils/         # Config and DB connection
│   └── index.js       # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Connection String (Atlas or Local)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root of the `backend` directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3001
NODE_ENV=development
```

### Running the Server

```bash
# Development mode (with file watching)
npm run dev

# Production start
npm start
``` 

The server will start at `http://localhost:3001`.

## 📡 API Endpoints

### Sales
- **GET** `/api/sales`: Fetch sales data with filtering and pagination.
  - Query Params:
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)
    - `search`: Search by customer name
    - `gender`, `region`, `paymentMethod`: Filter fields
    - `sortBy`: Field to sort by
    - `sortOrder`: 'asc' or 'desc'

## 📜 Deployment Setup (Render)

For deployment on Render.com:
1. set **Root Directory** to `backend`.
2. **Build Command**: `npm install`
3. **Start Command**: `npm start`
4. Set Environment Variables in the dashboard.
