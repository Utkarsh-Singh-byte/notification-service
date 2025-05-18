# Notification Service

A service to send Email, SMS, and In-App notifications with queue-based processing and retry mechanism.

## Features
- REST APIs to send and retrieve notifications
- RabbitMQ-based job queue
- Retry logic for failed deliveries
- MongoDB storage

## Setup

```bash
git clone <repo>
cd notification-service
npm install
npm start
```

### Start RabbitMQ (Docker)
```bash
docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

### MongoDB (Docker)
```bash
docker run -d -p 27017:27017 --name mongo mongo
```

## API Docs

### POST `/notifications`
```json
{
  "userId": "123",
  "type": "email",
  "message": "Hello",
  "subject": "Test"
}
```

### GET `/users/:id/notifications`
# notification-service
