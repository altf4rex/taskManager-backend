# Task Manager / Time Manager / Todo Tracker

## Overview

This project is a modular monolith built with Express, TypeScript, PostgreSQL (using Prisma), RESTful API (CRUD), Redis, JWT, Jest?, Supertest?, Swagger (OpenAPI), and Docker. The goal is to develop a production-oriented backend that demonstrates advanced API development skills, SQL/ORM usage, application architecture, caching, security, error handling, testing, and containerization.

## Architecture

- **Modular Monolith:** The application is divided into functional modules (e.g., Auth, Tasks, Categories) with clear separation of concerns.
- **Layers:** Each module consists of routes, controllers, services, and models.
- **Middleware:** Global middleware (Helmet, CORS, JSON parser) is used for security, cross-origin resource sharing, and request parsing.
- **Error Handling:** A global error handler captures and logs errors, returning standardized error responses.
- **Real-Time Updates:** Socket.IO is integrated for real-time notifications. ???
- **Containerization & CI/CD:** Docker and GitHub Actions are used for containerization and automated testing/deployment.

## Technology Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Caching:** Redis
- **Authentication:** JWT
- **Real-Time Communication:** Socket.IO ???
- **Testing:** Jest, Supertest
- **Documentation:** Swagger (OpenAPI)
- **Containerization:** Docker, docker-compose
- **CI/CD:** GitHub Actions

## Installation & Setup


