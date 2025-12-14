# System Architecture

## Overview
TruState Pro is a comprehensive Retail Sales Management System built using the MERN stack (MongoDB, Express.js, React/Next.js, Node.js). It is designing to provide real-time sales analytics, data visualization, and transaction management.

## High-Level Architecture

```mermaid
graph TD
    User[User / Client] -->|HTTPS| CDN[Vercel CDN]
    CDN -->|Serve Static| FE[Frontend (Next.js)]
    FE -->|API Requests (JSON)| BE[Backend API (Express.js)]
    BE -->|Mongoose ODM| DB[(MongoDB Atlas)]
    
    subgraph Frontend Layer
    FE
    end
    
    subgraph Backend Layer
    BE
    end
    
    subgraph Data Layer
    DB
    end
```

## detailed System Components

### 1. Frontend Layer (Client-Side)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (`useState`, `useEffect`, custom hooks like `useSalesData`)
- **Key Components**:
  - `SalesTable`: Displays transactional data with sorting and pagination.
  - `StatsCards`: Visualizes key performance indicators (KPIs).
  - `FilterPanel`: Provides faceted search and filtering capabilities.
  - `Sidebar`: Manages application navigation.

### 2. Backend Layer (Server-Side)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Architecture**: RESTful API with Controller-Service-Repository pattern.
- **Key Modules**:
  - `salesRoutes`: Defines HTTP endpoints (GET /api/sales).
  - `salesController`: Handles request parsing and response formatting.
  - `salesService`: Contains business logic and data transformation.
  - `mongodb.js`: Manages database connections.

### 3. Data Layer (Database)
- **System**: MongoDB Atlas (Cloud-hosted NoSQL).
- **Schema**:
  - **Collection**: `sales`
  - **Document Structure**: Includes fields for transactions, customer demographics, product details, and store information.

## Deployment Architecture

### Frontend Hosting
- **Provider**: Vercel
- **Features**: Automatic CI/CD from GitHub, Edge Caching, Serverless Function support for API routes (if used).

### Backend Hosting
- **Provider**: Render
- **Type**: Web Service
- **Scaling**: Auto-scaling capability based on load (configured in Render dashboard).
- **Environment**: Production application server running `npm start`.

## Security & Performance
- **CORS**: Configured to allow requests only from the trusted frontend domain.
- **Environment Variables**: Sensitive credentials (DB URI) stored securely in server environments.
- **Pagination**: Implemented cursor-based/offset-based pagination to handle large datasets efficiently.
- **Indexing**: MongoDB fields (like `date`, `storeId`, `customerName`) should be indexed for faster query performance.
