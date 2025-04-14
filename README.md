# Assignment Projects

This repository contains three distinct assignment projects:

## 1. Tag Parser (task-1)

A PHP library for parsing custom tags with descriptions. Handles tags in the format `[TAG_NAME:description]data[/TAG_NAME]` with strict validation rules and comprehensive error handling.

**Tech Stack:**

- PHP 8.0+
- PHPUnit for testing
- Docker support

[View Project Details](task-1/README.md)

## 2. Content Revision System (task-2)

A MySQL-based solution for managing content revisions, featuring an SQL query system to track and retrieve the latest versions of content items. Includes a complete Docker setup with MySQL 8.0 and Adminer for easy database management.

**Tech Stack:**

- MySQL 8.0
- Docker & Docker Compose
- Adminer web interface
- SQL

[View Project Details](task-2/README.md)

## 3. Counter Web Application (task-3)

A full-stack web application featuring user authentication and persistent counter functionality. Implements a modern architecture with separate frontend and backend services.

**Tech Stack:**

- Frontend: React, TypeScript, Redux Toolkit, Material UI
- Backend: PHP 8.x, Symfony 7.x, SQLite, JWT Authentication
- Docker support for both services

[View Project Details](task-3/README.md)

## Project Structure

```
.
├── task-1/          # Tag Parser Project
├── task-2/          # Content Revision System
├── task-3/          # Counter Web Application
    ├── frontend/    # React/TypeScript frontend
    └── backend/     # Symfony REST API
```

Each project contains its own detailed documentation, including setup instructions, usage examples, and technical specifications in their respective README files.
