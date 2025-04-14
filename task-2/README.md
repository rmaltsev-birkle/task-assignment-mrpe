# Content Revision

This repository contains a SQL query which works with different content revisions in MySQL using a table that tracks multiple versions of content items.

## Structure

The repository consists of two SQL files:

1. `content-revision.sql` - Creates and populates the table structure
2. `content-revision-query.sql` - Contains the query to fetch latest content revisions

## Table Structure

The `content_revisions` table has the following columns:

- `id` (int) - Content identifier
- `version` (int) - Revision version number
- `content` (text) - The actual content
- Unique constraint on (id, version) combination

## Goal

The goal is to write a SQL query that retrieves the latest version of each content item. The query should:

1. Select only the most recent version for each content id
2. Return results ordered by id
3. Include id, version, and content columns in the result

## Expected Output

The query should return a result set containing only the latest version of each content item, similar to:

| id  | version | content |
| --- | ------- | ------- |
| 1   | latest  | ...     |
| 2   | latest  | ...     |
| 3   | latest  | ...     |

## Files

- `content-revision.sql` - Table creation and sample data
- `content-revision-query.sql` - Solution query for fetching latest revisions
- `docker-compose.yml` - Docker configuration for running MySQL and Adminer

## Docker Setup

This project includes Docker configuration for easy setup and testing. The Docker environment includes:

- MySQL 8.0 database server
- Adminer web interface for database management

### Prerequisites

- Docker and Docker Compose installed on your system

### Running the Environment

1. Start the containers:

```bash
docker-compose up -d
```

2. Access Adminer web interface:
   - URL: http://localhost:8080
   - System: MySQL
   - Server: db
   - Username: root
   - Password: example
   - Database: content_db

### Stopping the Environment

To stop the containers:

```bash
docker-compose down
```

To remove all data including the database volume:

```bash
docker-compose down -v
```

### Database Initialization

The database is automatically initialized with the required table structure and sample data through the SQL files in the `init` directory.
