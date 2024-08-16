# Docker Compose Setup

This README provides instructions for setting up and running the project using Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository
2. Navigate to the project directory
3. Run the following command:

```
docker-compose up -d
```

This will start all services defined in the `docker-compose.yml` file.

## Services

- Client: React application (port 3000)
- Server: NestJS application (port 5001)
- Database: PostgreSQL (port 5432)
- pgAdmin: PostgreSQL administration tool (port 5050)

## Accessing pgAdmin

1. Open a web browser and go to `http://localhost:5050`
2. Login with:
   - Email: admin@olimp.com
   - Password: admin
3. To add the PostgreSQL server in pgAdmin:
   - Host: `db`
   - Port: `5432`
   - Username: `postgres`
   - Password: `postgres`

## Docker Network DNS

- Client service: `client`
- Server service: `server`
- Database service: `db`
- pgAdmin service: `pgadmin`

Use these names for inter-service communication within the Docker network.

## Volumes

- `db-data`: Persists PostgreSQL data
- `pgadmin-data`: Persists pgAdmin data
- `node_modules`: Stores node modules for client and server

## Swagger API Documentation

To access the Swagger API documentation:

1. Ensure the server is running
2. Open a web browser and navigate to:

```
http://localhost:5001/api/swagger#/
```

This will open the Swagger UI, where you can view and test the API endpoints.

## Stopping the Services

To stop all services, run:

```
docker-compose down
```

To stop services and remove volumes, run:

```
docker-compose down -v
```