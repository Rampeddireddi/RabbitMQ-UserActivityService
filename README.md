
# Event-Driven User Activity Service
## RabbitMQ + Express.js + MongoDB + Rate Limiting

## Overview
This project implements an event-driven microservice for tracking user activity events. 
The system exposes a REST API to ingest activity data, applies IP-based rate limiting, 
publishes events to RabbitMQ, and processes them asynchronously via a consumer service 
that persists data into MongoDB.

## Architecture
Client -> API Service (Express.js) -> RabbitMQ -> Consumer Service -> MongoDB

## Project Structure
```
event-tracker/
├── api/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── server.js
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
│
├── consumer/
│   ├── src/
│   │   ├── services/
│   │   └── worker.js
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── .env.example
├── README.md
└── API_DOCS.md
```

## How to Run
```bash
docker-compose up --build
```

## API Endpoint
POST /api/v1/activities


### Sample Request
```json
{
  "userId": "123",
  "eventType": "login",
  "timestamp": "2023-10-27T10:00:00Z",
  "payload": {"device":"desktop"}
}
```

```bash
curl -X POST http://localhost:3000/api/v1/activities \
-H "Content-Type: application/json" \
-d '{
  "userId": "a1b2c3",
  "eventType": "user_login",
  "timestamp": "2023-10-27T10:00:00Z",
  "payload": {
    "device": "desktop",
    "browser": "Chrome"
  }
}'


```

## Health Check

```bash
curl http://localhost:3000/health
```
## Expected Response

```bash
OK
```

## Rate Limiting
- 50 requests per minute per IP
- Returns 429 with Retry-After header

## RabbitMQ
- Queue: user_activities
- Durable queue with manual ACK

## MongoDB
- Database: activity_db
- Collection: activities

- Schema
```bash
    {
        id: String,
        userId: String,
        eventType: String,
        timestamp: Date,
        processedAt: Date,
        payload: Object
    }
```

## Testing
```bash
docker-compose exec api npm test
docker-compose exec consumer npm test
```

## Environment Variables
See .env.example

## Submission Checklist
- Event-driven architecture
- Rate limiting
- RabbitMQ integration
- MongoDB persistence
- Docker Compose setup
- Unit tests

