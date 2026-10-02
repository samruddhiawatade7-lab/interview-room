# SENIORCONNECT 🎓
### Placement Mentorship, Preparation & Career Guidance Platform

SENIORCONNECT is a full-stack, production-grade microservices platform connecting college students and juniors with verified seniors and alumni who have successfully cracked campus placement recruitment processes at tier-1 tech companies (Google, Microsoft, Amazon, Atlassian, Goldman Sachs, Uber, etc.).

---

## 🏗️ Architecture Overview

The system is built using a **Database-per-Service Microservices Architecture** powered by Spring Boot, Spring Cloud Gateway, Netflix Eureka, RabbitMQ, JWT Security, and a React + TypeScript + Tailwind CSS frontend.

```
+-------------------------------------------------------------------------+
|                           React 18 Frontend                             |
|                (TypeScript + Vite + Tailwind CSS + Recharts)            |
+------------------------------------+------------------------------------+
                                     |
                                     v
+------------------------------------+------------------------------------+
|                        Spring Cloud API Gateway                         |
|                             (Port 8080)                                 |
+----+-------------+-----------------+---------------+--------------------+
     |             |                 |               |                    |
     v             v                 v               v                    v
+---------+   +---------+       +---------+     +---------+          +---------+
| Auth    |   | User    |       |Mentor-  |     |Interview|          |Resource |
| Service |   | Service |       |ship Svc |     | Service |          | Service |
| (8081)  |   | (8082)  |       | (8083)  |     | (8084)  |          | (8085)  |
+----+----+   +----+----+       +----+----+     +----+----+          +----+----+
     |             |                 |               |                    |
     v             v                 v               v                    v
 [auth_db]     [user_db]      [mentorship_db]  [interview_db]       [resource_db]
                                     |               |                    |
                                     +---------------+--------------------+
                                                     | (RabbitMQ Events)
                                                     v
                                            +------------------+
                                            | Notification Svc |
                                            |     (8086)       |
                                            +--------+---------+
                                                     |
                                                     v
                                             [notification_db]
```

### 🛰️ Service Discovery & Routing
- **Eureka Server** (`8761`): Service registry dynamically registering microservice instances.
- **API Gateway** (`8080`): Single unified entry point handling cross-origin requests (CORS), routing `/api/auth/**`, `/api/users/**`, `/api/mentorship/**`, `/api/interviews/**`, `/api/resources/**`, and `/api/notifications/**` to downstream services via load balancing (`lb://`).

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Lucide Icons
- **State & Routing**: React Context API + React Router v6
- **Charts & Data Viz**: Recharts (Radar, Bar, & Progress Metrics)
- **HTTP Client**: Axios with automatic JWT Authorization interceptor

### Backend
- **Framework**: Java 21 + Spring Boot 3.2.5
- **Security**: Spring Security + JWT Authentication + BCrypt Password Hashing
- **Architecture**: Microservices Architecture with Spring Cloud Gateway & Eureka Server
- **Inter-Service Communication**: REST / OpenFeign clients
- **Asynchronous Messaging**: RabbitMQ for event-driven decoupled notifications
- **Database**: Database-Per-Service pattern (MySQL / H2 embedded fallback)
- **Containerization**: Docker & Docker Compose

---

## 💾 Database-per-Service Architecture

Each service strictly owns its own dedicated database schema. Direct cross-database access is prohibited. Services communicate strictly via REST APIs or RabbitMQ asynchronous events.

1. **`auth_db`** (Auth Service): Stores user credentials, BCrypt hashes, roles (`STUDENT`, `SENIOR`, `ADMIN`), and registration profiles.
2. **`user_db`** (User Service): Manages Student & Senior profiles, verified badges, company directories, DSA trackers, Aptitude progress, CS Core subjects, and Company Application Kanban board states.
3. **`mentorship_db`** (Mentorship Service): Stores mentorship requests (`PENDING`, `ACCEPTED`, `REJECTED`), weekly availability slots, session bookings, real-time chat messages, and senior ratings/reviews.
4. **`interview_db`** (Interview Service): Manages 30+ real interview experiences (rounds, OA topics, questions, tips, admin approval), mock interview scorecards across 8 technical/soft skill metrics, and resume review requests.
5. **`resource_db`** (Resource Service): Stores handpicked placement resources, category tags, difficulty levels, and user bookmarks.
6. **`notification_db`** (Notification Service): Stores in-app user notifications generated by event consumers.

---

## 🔑 Demo Account Credentials

The platform is pre-seeded with realistic demo accounts for immediate 1-click testing:

| Role | Email Address | Password | Description / Capabilities |
| :--- | :--- | :--- | :--- |
| **STUDENT** | `student@example.com` | `password123` | Aarav Sharma (BITS Pilani, Final Year). Full student dashboard, DSA tracker, mentorship request creation, chat, booking sessions. |
| **SENIOR** | `senior@example.com` | `password123` | Priya Nair (Software Engineer II at Google). Senior dashboard, accepting/rejecting requests, reviewing resumes, mock interview feedback. |
| **ADMIN** | `admin@example.com` | `password123` | Platform Administrator. Verify senior mentors, moderate interview experiences & resources, system analytics. |

---

## 🚀 How to Run locally

### Option 1: Docker Compose (Recommended)
Make sure Docker Desktop is running on your system, then execute:

```bash
docker-compose up --build
```

Access the platform:
- **Frontend App**: `http://localhost:3000`
- **API Gateway**: `http://localhost:8080`
- **Eureka Dashboard**: `http://localhost:8761`
- **RabbitMQ Management**: `http://localhost:15672` (User: `guest` / Pass: `guest`)

### Option 2: Running Services Locally

1. **Start Spring Boot Services**:
   - `eureka-server` (`mvn spring-boot:run` on port 8761)
   - `api-gateway` (`mvn spring-boot:run` on port 8080)
   - `auth-service` (`mvn spring-boot:run` on port 8081)
   - `user-service` (`mvn spring-boot:run` on port 8082)
   - `mentorship-service` (`mvn spring-boot:run` on port 8083)
   - `interview-service` (`mvn spring-boot:run` on port 8084)
   - `resource-service` (`mvn spring-boot:run` on port 8085)
   - `notification-service` (`mvn spring-boot:run` on port 8086)

2. **Start React Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 📡 Key REST API Endpoints

### Auth Service (`/api/auth`)
- `POST /api/auth/register` - Register new Student or Senior account
- `POST /api/auth/login` - Authenticate and return JWT token + user details
- `GET /api/auth/me` - Fetch currently authenticated user

### User Service (`/api/seniors` & `/api/users`)
- `GET /api/seniors` - Search & filter seniors by company, role, skills, verification status
- `GET /api/seniors/{id}` - Get detailed senior mentor profile
- `PUT /api/seniors/{id}/verify` - Admin approve/revoke senior verification badge
- `GET /api/preparation/dsa/{studentId}` - Get DSA tracker progress
- `GET /api/applications/{studentId}` - Get Company Application Kanban state

### Mentorship Service (`/api/mentorship`, `/api/sessions`, `/api/chat`)
- `POST /api/mentorship/requests` - Send mentorship request to senior
- `PUT /api/mentorship/requests/{id}/accept` - Senior accepts request (triggers RabbitMQ event)
- `POST /api/sessions/book` - Book 1-on-1 session slot (validates double-booking)
- `GET /api/chat/messages/{requestId}` - Fetch chat history between student and mentor
- `POST /api/chat/send` - Send message

### Interview Service (`/api/interviews`, `/api/mock-interviews`, `/api/resume-reviews`)
- `GET /api/interviews/experiences` - Search user-submitted interview experiences
- `POST /api/mock-interviews` - Request mock interview
- `PUT /api/mock-interviews/{id}/feedback` - Senior submits scorecard across 8 metrics
- `POST /api/resume-reviews` - Request resume review
- `PUT /api/resume-reviews/{id}/feedback` - Senior submits ATS & formatting feedback

---

## ✅ Verified End-to-End Test Workflow

The complete application workflow has been verified:
1. **Student Registration & Login**: Authenticated via JWT token issuing and protected route redirects.
2. **Senior Search & Filter**: Dynamically queried backend User Service based on company, target skills, and verified status.
3. **Mentorship Request & Event Dispatch**: Request sent from student -> accepted by senior -> published event to RabbitMQ -> consumed by Notification Service.
4. **Session Slot Booking & Double Booking Prevention**: Prevents duplicate slot bookings for the same senior on the same date/time.
5. **Real-time Student-Senior Chat**: Enabled once request status transitions to `ACCEPTED`.
6. **Resume Review & Mock Interview Scoring**: Detailed 1-10 scoring breakdown across DSA, Java, DBMS, OOP, SQL, and Communication.
7. **Preparation & Kanban Board Persistence**: Progress bars and Kanban board column updates persist across page reloads.
8. **Admin Senior Verification**: Admin can toggle verification badges, instantly reflecting on public senior cards.

---

## ❓ Why Microservices Architecture?

1. **Domain Decoupling**: Mentorship bookings, chat messaging, interview repositories, and authentication scale independently. High traffic on interview experiences during placement season will not impact authentication or chat services.
2. **Data Isolation**: Strictly enforcing database-per-service isolates sensitive candidate information and allows database scaling tailored to service access patterns.
3. **Event-Driven Resilience**: Asynchronous notification dispatch via RabbitMQ ensures session bookings and review completions operate reliably without blocking request threads.
