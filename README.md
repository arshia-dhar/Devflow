# DevFlow

**A Full-Stack Project Management Platform**

DevFlow is a project management application inspired by tools like Linear, Jira, and GitHub Projects. It helps teams organize their work through workspaces and projects, with a focus on a clean interface, secure authentication, and scalable backend architecture.

The project is being developed using React, Spring Boot, and PostgreSQL.

## Features

### Implemented

- **User Authentication**
  - User registration and login
  - Password hashing using BCrypt
  - JWT-based authentication
  - Protected frontend routes
  - Authenticated API endpoints

- **Workspace Management**
  - Create and retrieve workspaces
  - Associate workspaces with their owners
  - Restrict workspace access to the owning user

- **Project Management**
  - Create projects inside workspaces
  - Retrieve projects by workspace
  - Associate projects with their parent workspace
  - Validate workspace ownership before project operations

- **Dashboard**
  - React-based dashboard
  - Workspace listing and selection
  - Project creation through the frontend
  - Dynamic project listing
  - Dark-themed interface

### Planned

- Issue and task management
- Issue priorities and status tracking
- Task assignments
- Comments and activity tracking
- Notifications
- Real-time updates using WebSockets
- Analytics and project insights
- Redis integration
- Automated testing
- Dockerized application deployment
- CI/CD using GitHub Actions

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, JavaScript, Vite |
| Routing | React Router |
| HTTP Client | Axios |
| Backend | Java 21, Spring Boot |
| API | Spring MVC, REST |
| Security | Spring Security, JWT, BCrypt |
| ORM | Spring Data JPA, Hibernate |
| Database | PostgreSQL 17 |
| Build Tool | Maven |
| Containerization | Docker, Docker Compose |
| Monitoring | Spring Boot Actuator |

## Architecture

```text
DevFlow/
│
├── backend/
│   ├── src/main/java/com/devflow/backend/
│   │   ├── controller/
│   │   │   ├── AuthController.java
│   │   │   ├── HealthController.java
│   │   │   ├── WorkspaceController.java
│   │   │   └── ProjectController.java
│   │   │
│   │   ├── dto/
│   │   │   ├── LoginRequest.java
│   │   │   ├── RegisterRequest.java
│   │   │   ├── WorkspaceRequest.java
│   │   │   ├── WorkspaceResponse.java
│   │   │   ├── ProjectRequest.java
│   │   │   └── ProjectResponse.java
│   │   │
│   │   ├── entity/
│   │   │   ├── User.java
│   │   │   ├── Workspace.java
│   │   │   └── Project.java
│   │   │
│   │   ├── repository/
│   │   │   ├── UserRepository.java
│   │   │   ├── WorkspaceRepository.java
│   │   │   └── ProjectRepository.java
│   │   │
│   │   ├── security/
│   │   │   ├── JwtService.java
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   └── SecurityConfig.java
│   │   │
│   │   └── service/
│   │       ├── UserService.java
│   │       ├── WorkspaceService.java
│   │       └── ProjectService.java
│   │
│   └── pom.xml
│
├── src/
│   ├── api/
│   │   └── client.js
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   └── App.jsx
│
├── docker-compose.yml
├── package.json
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites

Install the following:

- Java 21 or later
- Node.js and npm
- Docker Desktop
- Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Devflow.git
cd Devflow
```

### 2. Start PostgreSQL

The project uses Docker Compose to run PostgreSQL 17.

```bash
docker compose up -d
```

The database configuration is:

| Setting | Value |
|---|---|
| Database | devflow |
| Username | devflow |
| Password | devflow123 |
| Port | 5432 |

### 3. Configure the backend

Navigate to the backend:

```bash
cd backend
```

The application uses the following environment variables:

```properties
spring.application.name=devflow

spring.datasource.url=jdbc:postgresql://localhost:5432/devflow
spring.datasource.username=devflow
spring.datasource.password=devflow123

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

management.endpoints.web.exposure.include=health,info

jwt.secret=${JWT_SECRET}
```

Generate a secure JWT secret using PowerShell:

```powershell
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$env:JWT_SECRET = [Convert]::ToBase64String($bytes)
```

Set the timezone:

```powershell
$env:JAVA_TOOL_OPTIONS="-Duser.timezone=UTC"
```

Start the Spring Boot application:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs at:

`http://localhost:8080`

### 4. Start the frontend

Open another terminal in the project root:

```bash
npm install
npm run dev
```

The frontend runs at:

`http://localhost:5173`

## API Endpoints

All API endpoints use the `/api/v1` prefix.

### Health

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/health` | Check application health | No |

### Authentication

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/auth/register` | Register a user | No |
| POST | `/auth/login` | Authenticate and receive JWT | No |

### Workspaces

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/workspaces` | Create a workspace | Yes |
| GET | `/workspaces` | Retrieve owned workspaces | Yes |

### Projects

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/projects` | Create a project | Yes |
| GET | `/projects?workspaceId={id}` | Retrieve workspace projects | Yes |

Authenticated requests must include:

```http
Authorization: Bearer <JWT_TOKEN>
```

## Example API Requests

### Register a user

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Create a workspace

```json
{
  "name": "Development Team",
  "description": "Workspace for software development"
}
```

### Create a project

```json
{
  "name": "Backend Development",
  "description": "Building the application backend",
  "workspaceId": 1
}
```

## Security

DevFlow currently implements:

- BCrypt password hashing
- JWT-based stateless authentication
- Spring Security request authorization
- Protected frontend routes
- Workspace ownership validation
- Request validation using Jakarta Bean Validation

## Development Roadmap

| Phase | Focus | Status |
|---|---|---|
| 1 | Project setup and database integration | Complete |
| 2 | Authentication and JWT security | Complete |
| 3 | Workspace management | Complete |
| 4 | Project management | Complete |
| 5 | Issue and task management | In Progress |
| 6 | Comments and activity tracking | Planned |
| 7 | Real-time updates and notifications | Planned |
| 8 | Analytics and Redis integration | Planned |
| 9 | Testing, Docker and CI/CD | Planned |

## License

This project is currently under development. Licensing information will be added before public release.
