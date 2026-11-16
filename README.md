# DevFlow

**A collaborative project management platform for software development teams.**

DevFlow is a full-stack project management application designed to help development teams organize projects, manage tasks, collaborate, and track progress through a centralized workspace.

The project is being built with a focus on clean backend architecture, REST API design, database management, and scalable software engineering practices.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, JavaScript, Vite |
| Backend | Java 21, Spring Boot |
| API | REST |
| Database | PostgreSQL 17 |
| ORM | Spring Data JPA, Hibernate |
| Security | BCrypt password hashing |
| Validation | Jakarta Bean Validation |
| Infrastructure | Docker, Docker Compose |
| Build Tool | Maven |

## Architecture

```text
DevFlow/
│
├── backend/
│   ├── src/main/java/com/devflow/backend/
│   │   ├── controller/
│   │   │   ├── HealthController.java
│   │   │   └── AuthController.java
│   │   │
│   │   ├── dto/
│   │   │   └── RegisterRequest.java
│   │   │
│   │   ├── entity/
│   │   │   └── User.java
│   │   │
│   │   ├── repository/
│   │   │   └── UserRepository.java
│   │   │
│   │   └── service/
│   │       └── UserService.java
│   │
│   ├── src/main/resources/
│   │   └── application.properties
│   │
│   └── pom.xml
│
├── docker-compose.yml
├── package.json
└── README.md
```

*The React/Vite scaffold currently resides in the project root.*

## Current Features

### Backend
- Spring Boot application setup.
- Layered architecture separating controllers, services, repositories, and entities.
- REST API endpoints.
- Spring Boot Actuator health monitoring.
- PostgreSQL database integration using Spring Data JPA.
- User entity and database persistence.
- User registration API.
- Duplicate email detection.
- BCrypt password hashing.
- Request validation using Jakarta Bean Validation.

### Infrastructure
- PostgreSQL 17 running in Docker.
- Persistent database storage using Docker volumes.
- Docker Compose configuration.
- Maven-based dependency management and builds.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/health` | Application health check |
| GET | `/actuator/health` | Spring Boot health monitoring |
| POST | `/api/v1/auth/register` | Register a new user |

### User Registration

**Request:**

```http
POST /api/v1/auth/register
Content-Type: application/json
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Successful response:**

HTTP `201 Created`

```json
{
  "message": "User registered successfully"
}
```

Passwords are hashed using BCrypt before being persisted in PostgreSQL.

## Getting Started

### Prerequisites

- Java 21
- Node.js and npm
- Docker Desktop
- Git

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Devflow
```

### 2. Start PostgreSQL

Start Docker Desktop, then run:

```bash
docker compose up -d
```

The PostgreSQL container runs on port `5432`.

Database configuration:

| Property | Value |
|---|---|
| Database | devflow |
| Username | devflow |
| Password | devflow123 |
| Port | 5432 |

### 3. Start the backend

Open a terminal:

```powershell
cd backend
$env:JAVA_TOOL_OPTIONS="-Duser.timezone=UTC"
.\mvnw.cmd spring-boot:run
```

The backend runs at:

`http://localhost:8080`

### 4. Verify the backend

Visit:

`http://localhost:8080/api/v1/health`

Expected response:

```json
{
  "status": "UP",
  "application": "DevFlow"
}
```

### 5. Run the frontend

From the project root:

```bash
npm install
npm run dev
```

The Vite development server runs at:

`http://localhost:5173`

## Development Roadmap

- [x] Project initialization and repository structure
- [x] React + Vite frontend scaffold
- [x] Spring Boot backend setup
- [x] PostgreSQL integration
- [x] Docker Compose configuration
- [x] REST health-check endpoint
- [x] User entity and repository
- [x] User registration service
- [x] BCrypt password hashing
- [x] Registration request DTO and validation
- [x] Registration REST controller
- [ ] Complete registration API testing
- [ ] User login and authentication
- [ ] JWT-based authorization
- [ ] Workspace creation and membership
- [ ] Project and issue management
- [ ] Task assignment and status tracking
- [ ] Comments and activity feeds
- [ ] Real-time updates using WebSockets
- [ ] Notifications
- [ ] Analytics dashboard
- [ ] Redis caching
- [ ] Automated testing
- [ ] Dockerized application deployment
- [ ] CI/CD pipeline

## Engineering Goals

DevFlow is being developed with an emphasis on:

- Clean, maintainable, and modular architecture.
- Separation of concerns through layered backend design.
- Secure authentication and authorization.
- Efficient database interactions.
- RESTful API design.
- Containerization and reproducible development environments.
- Automated testing and continuous integration.

---

**Status:** Active Development

Built as a full-stack software engineering project using React, Java, Spring Boot, and PostgreSQL.