# Retail Sales Management System

A simple, clean, and professional full-stack application for managing retail sales data.

## Tech Stack
- **Frontend**: React (Vite), Plain CSS, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB

## Features
- **Search**: Full-text search on Customer Name and Phone Number.
- **Filtering**: Multi-select filters for Region, Gender, Category, Tags, Payment Method. Range filters for Age and Date.
- **Sorting**: Sort by Date, Quantity, Customer Name, etc.
- **Pagination**: Efficient server-side pagination.

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB Connection String (configured in backend)

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
Server runs on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Client runs on `http://localhost:5173`.

## Architecture
See [docs/architecture.md](docs/architecture.md) for detailed architectural overview.
