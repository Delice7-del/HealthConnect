# HealthConnect API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Include JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format
```json
{
  "status": "success|error",
  "message": "Response message",
  "data": { /* response data */ }
}
```

---

## 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login |
| GET | `/auth/verify/:token` | Verify email |
| POST | `/auth/forgot-password` | Request password reset |
| PUT | `/auth/reset-password/:token` | Reset password |
| GET | `/auth/me` | Get current user |
| POST | `/auth/logout` | Logout user |

---

## 🏥 Health Conditions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health-conditions` | Get all conditions |
| GET | `/health-conditions/:id` | Get specific condition |
| POST | `/health-conditions` | Create condition (Admin) |
| PUT | `/health-conditions/:id` | Update condition (Admin) |
| DELETE | `/health-conditions/:id` | Delete condition (Admin) |

**Query Parameters:**
- `page`, `limit`, `search`, `category`, `featured`

---

## 🏥 Clinics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/clinics` | Get all clinics |
| GET | `/clinics/:id` | Get specific clinic |
| POST | `/clinics` | Create clinic |
| PUT | `/clinics/:id` | Update clinic |
| POST | `/clinics/:id/reviews` | Add review |

**Query Parameters:**
- `page`, `limit`, `search`, `type`, `city`, `emergency`

---

## 📱 Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/notifications/subscribe` | Subscribe to SMS |
| PUT | `/notifications/preferences` | Update preferences |
| GET | `/notifications/preferences` | Get preferences |

---

## 📧 Contact

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/contact` | Submit contact form |

---

## 🆘 First Aid

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/first-aid` | Get all guides |
| GET | `/first-aid/:id` | Get specific guide |

---

## 👤 Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/profile` | Get user profile |
| PUT | `/users/profile` | Update user profile |
| GET | `/users` | Get all users (Admin) |
| PUT | `/users/:id/role` | Update user role (Admin) |

---

## 🔍 Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | API health check |

---

## 📋 Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **429**: Too Many Requests
- **500**: Internal Server Error

---

## 🚀 Quick Start

1. Install dependencies: `npm install`
2. Set up environment: `cp config.env.example config.env`
3. Start server: `npm run dev`
4. Seed database: `npm run seed`
5. Test API: `curl http://localhost:5000/api/health` 