# Counter App Backend

A Symfony-based REST API backend that provides authentication, user management, and counter functionality for the Counter App frontend.

## Features

-   User authentication (JWT-based)
-   User registration
-   Counter management (create/read/update)
-   SQLite database for data persistence
-   RESTful API endpoints
-   Password encryption
-   One counter per user limitation

## Tech Stack

-   PHP 8.x
-   Symfony 7.x
-   Doctrine ORM
-   SQLite
-   JWT Authentication
-   Composer

## Prerequisites

-   PHP 8.1 or higher
-   Composer
-   SQLite 3
-   Symfony CLI (optional, for development)

## Installation

1. Install dependencies:

```sh
composer install
```

2. Configure your JWT keys:

```sh
php bin/console lexik:jwt:generate-keypair
```

3. Set up the database:

```sh
php bin/console doctrine:migrations:migrate
```

## JWT Configuration

The JWT token configuration can be found in two files:

-   `config/packages/lexik_jwt_authentication.yaml` - Configure access token expiration time (default: 120 seconds)
-   `config/packages/gesdinet_jwt_refresh_token.yaml` - Configure refresh token expiration time (default: 600 seconds)

## Development

Start the Symfony development server:

```sh
symfony server:start --port=8000 --no-tls --allow-http
```

### Using Docker Compose

Run application

```sh
docker compose -f ./docker-compose.dev.yml up --build
```

Configure JWT keys

```sh
# backend-container like backend-backend-1
docker exec <backend-container> php bin/console lexik:jwt:generate-keypair
```

Set up the database

```sh
# backend-container like backend-backend-1
docker exec <backend-container> php bin/console doctrine:migrations:migrate
```

When using Docker Compose, the app will be available at `http://localhost:5173`.

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication

-   `POST /api/registration` - Register new user
-   `POST /api/login_check` - Login and get JWT token
-   `POST /api/token/refresh` - Refresh expired JWT token

### Counters

-   `GET /api/counters` - Get all counters (with optional user filter)
-   `GET /api/counters/{id}` - Get specific counter
-   `POST /api/counters` - Create new counter
-   `PUT /api/counters/{id}` - Update counter value

### Users

-   `GET /api/users` - Get all users
-   `GET /api/users/{id}` - Get specific user

## Project Structure

```
src/
  ├── Controller/    # API endpoints
  ├── Entity/        # Database entities
  ├── Repository/    # Database queries
  ├── Model/         # DTOs and data models
  ├── Security/      # Security and authentication
  └── EventListener/ # Event listeners
```

## Security

-   Passwords are hashed using Symfony's password hasher
-   JWT tokens are used for API authentication
-   One counter per user is enforced at the application level
-   All counter operations are protected by user authentication
