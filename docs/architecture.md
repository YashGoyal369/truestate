# Architecture Documentation

## Overview
The Retail Sales Management System is a full-stack web application designed to manage and view sales data. It follows a clean separation of concerns with a React frontend and an Express/Node.js backend.

## Backend Architecture
The backend is built with Node.js and Express, following a **Controller-Service-Data Access (Model)** pattern.

### Structure
- **Controllers** (`src/controllers`): Handle HTTP requests, parse query parameters, and send responses. They function as an interface between the API and the business logic.
- **Services** (`src/services`): Contain the core business logic. The `salesService.js` is responsible for constructing the complex MongoDB Aggregation Pipeline dynamically based on input filters.
- **Models** (`src/models`): Define the data structure using Mongoose schemas.
- **Routes** (`src/routes`): Map API endpoints to controller functions.

### Data Flow
1.  Client sends `GET /api/sales` with query parameters (search, filters, sort, page).
2.  `salesRoutes` directs the request to `salesController.getSales`.
3.  `salesController` calls `salesService.getSales(queryParams)`.
4.  `salesService` builds a MongoDB Aggregation Pipeline:
    - `$match`: Filters data based on search text (Regex on name/phone) and specific fields (Region, Gender, etc.).
    - `$sort`: Orders the results.
    - `$facet`: Runs two parallel pipelines: one for `metadata` (total count) and one for `data` (paginated results using `$skip` and `$limit`).
5.  MongoDB executes the pipeline and returns the result.
6.  Service formats the response with data and pagination info.
7.  Controller sends JSON response to the client.

## Frontend Architecture
The frontend is a React application (Vite) using functional components and hooks.

### Structure
- **Components** (`src/components`): Reusable UI building blocks (e.g., `FilterPanel`, `TransactionTable`).
- **Pages** (`src/pages`): Composition of components for specific views (e.g., `Dashboard`).
- **Services** (`src/services`): `api.js` handles Axios instances and API calls.
- **Styles**: Plain CSS files follow the component structure, ensuring a clean and professional look matching the Figma design.

### State Management
- **URL Synchronization**: The application state (filters, sort, page) is synchronized with the URL query parameters. This ensures that sharing a link or refreshing the page preserves the user's context.

## Folder Responsibilities
- `backend/`: API server code.
- `frontend/`: React client code.
- `docs/`: Technical documentation.
