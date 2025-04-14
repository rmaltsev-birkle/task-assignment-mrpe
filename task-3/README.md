# Counter Web Application

A full-stack web application featuring user authentication and a persistent counter functionality. The solution consists of two main parts: a React-based frontend and a Symfony-based backend API.

## Project Structure

- `frontend/` - React/TypeScript application built with Vite
- `backend/` - Symfony REST API with SQLite database

## Quick Start

Each project includes its own Docker Compose configuration for easy development setup.

### Backend

```sh
cd backend
docker compose -f docker-compose.dev.yml up --build
```

The API will be available at `http://127.0.0.1:8000`

### Frontend

```sh
cd frontend
docker compose -f docker-compose.dev.yml up --build
```

The web app will be available at `http://localhost:5173`

## Features

- User authentication (login/register)
- Persistent counter state
- One counter per user
- JWT-based authentication
- Docker support for both frontend and backend

## Documentation

For detailed setup instructions and documentation:

- See [frontend/README.md](frontend/README.md) for the React application
- See [backend/README.md](backend/README.md) for the Symfony API

## Tech Stack

- Frontend: React, TypeScript, Redux Toolkit, Material UI
- Backend: PHP 8.x, Symfony 7.x, SQLite, JWT Authentication
