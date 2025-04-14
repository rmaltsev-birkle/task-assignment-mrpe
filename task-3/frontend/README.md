# Counter App

A React-based web application featuring user authentication and a persistent counter functionality.

## Features

- User authentication (login/register)
- Protected routes
- Persistent counter state
- Material UI components
- Redux state management
- JWT-based authentication
- Responsive design

## Tech Stack

- React 19
- TypeScript
- Redux Toolkit
- Material UI v7
- React Router v7
- JWT Authentication
- Vite
- Zod for validation
- Notistack for notifications

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Backend API server running (PHP/Symfony)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment:
   - Set `VITE_API_URL` to your backend API URL

## Development

Run the development server locally:

```sh
npm run dev
```

Or using Docker Compose:

```sh
docker compose -f ./docker-compose.dev.yml up --build
```

When using Docker Compose, the app will be available at `http://localhost:5173` and will automatically reload on code changes thanks to volume mounting.

The app will be available at `http://localhost:5173`

## Building for Production

Build the application:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Project Structure

```
src/
  ├── api/          # API integration and authentication
  ├── components/   # Reusable components
  ├── hooks/        # Custom React hooks
  ├── lib/          # Utility functions
  ├── pages/        # Application pages
  ├── slices/       # Redux slices
  └── App.tsx       # Main application component
```
