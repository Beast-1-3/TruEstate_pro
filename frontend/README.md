# Retail Sales Frontend

This is the frontend client for the Retail Sales Management System, built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. It provides a responsive interface for visualizing sales data, filtering transactions, and monitoring KPIs.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Native Fetch API

## 📂 Project Structure

```
frontend/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks (useSalesData)
│   ├── services/      # API communication layer
│   └── styles/        # Global styles
└── public/            # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Backend server running (usually on port 3001)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env.local` file in the root of the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```
*Note: For production, this should point to your live backend URL (e.g., on Render).*

### Running the App

```bash
npm run dev
```

The application will start at `http://localhost:3000`.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm start`: Runs the built production server.
- `npm run lint`: Runs ESLint checks.
