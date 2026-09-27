# DevOps Incident Monitor

This project is the backend foundation for a DevOps incident-monitoring system. It currently provides user authentication, PostgreSQL storage, JWT-protected routes, and a health-check endpoint.

## Current Features

- User registration
- User login
- Password hashing with bcrypt
- JWT authentication
- PostgreSQL database connection
- Protected API route
- Health-check route

## How It Works

1. A user registers with a name, email, and password.
2. The password is encrypted with bcrypt before being stored.
3. The user is saved in PostgreSQL.
4. The server returns a JWT token.
5. The client sends the token when accessing protected routes.
6. Authentication middleware verifies the token.
7. Valid tokens allow access; invalid or missing tokens return `401 Unauthorized`.

## Project Files

| File | Purpose |
| --- | --- |
| `package.json` | Defines the project, scripts, and dependencies. |
| `src/server.js` | Starts Express, connects to the database, and registers routes. |
| `src/config/database.js` | Creates the PostgreSQL connection pool from `.env`. |
| `.env` | Stores local database, port, and JWT settings. Keep it private. |
| `src/migrations/001_create_users.sql` | Creates the `users` table. |
| `src/routes/auth.routes.js` | Defines registration and login endpoints. |
| `src/controllers/auth.controller.js` | Validates requests and sends HTTP responses. |
| `src/services/auth.service.js` | Handles database queries, password hashing, and JWT creation. |
| `src/middleware/auth.middleware.js` | Checks and verifies JWT authorization tokens. |
| `docker-compose.yml` | Defines the PostgreSQL Docker service. |

## Run the Project

Make sure Docker Desktop is running and PostgreSQL is available on port `5432`.

```powershell
# Start the existing database container
docker start incident-postgres

# Start the API
npm start
```

For development with automatic restart:

```powershell
npm run dev
```

The API runs at `http://localhost:5000`.

## API Endpoints

### Health Check

```http
GET /health
```

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
	"name": "Test User",
	"email": "test@example.com",
	"password": "password123"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
	"email": "test@example.com",
	"password": "password123"
}
```

Login and registration return a JWT token. Use that token with the protected endpoint:

```http
GET /api/protected
Authorization: Bearer YOUR_TOKEN
```

## Database

The application uses these local PostgreSQL settings from `.env`:

```text
Host: localhost
Port: 5432
Database: incident_monitor
User: incident_admin
```

The database contains a `users` table with these fields:

- `id`
- `name`
- `email`
- `password_hash`
- `role`
- `created_at`

## Next Steps

1. Add real automated tests. The current `npm test` command is still a placeholder.
2. Fix response spelling inconsistencies such as `mesage` and `succesfully`.
3. Use one consistent JWT user ID field instead of both `id` and `userID`.
4. Add incident features: create incidents, update status, assign users, and view incident history.
5. Add email validation and password-strength requirements.
6. Move the hardcoded server port to `process.env.PORT`.
7. Improve database error handling and add structured logging.
8. Add Swagger/OpenAPI documentation.
9. Build a frontend incident dashboard.
10. Add deployment configuration and CI/CD automation.

## Current Status

This is an authentication foundation for the incident-monitoring system. The server and database connection work, but incident-management features and the frontend still need to be implemented.