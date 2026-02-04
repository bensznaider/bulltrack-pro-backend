# 🐂 Bulltrack Pro – Backend  
Full-Stack Engineering Challenge (Seed28)

Backend API for **Bulltrack**, a bovine genetic ranking platform where cattle producers evaluate bulls using dynamic genetic scoring, advanced filtering, and user-specific favorites.

Built with **NestJS**, **Sequelize**, and **PostgreSQL**.

---

## 🚀 Tech Stack

| Layer | Tech |
|------|------|
| Framework | NestJS |
| ORM | Sequelize + sequelize-typescript |
| Database | PostgreSQL |
| Auth | JWT (Passport) |
| Validation | class-validator |
| Language | TypeScript |

---

## 🔐 Authentication

JWT-based authentication.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/signup` | POST | Register user |
| `/auth/login` | POST | Login and receive token |
| `/auth/me` | GET | Get current user (protected) |

Protected routes require:

Authorization: Bearer <token>

---

## 🐂 Bulls Module

### Features
- Server-side pagination  
- Server-side filtering  
- Search by ear tag (caravana) or name  
- Dynamic bull score computed in DB  
- Sorting by bull score  
- Bulk import for seeding  

### Bull Score Formula (DB-level)

bullScore =  
(C * 0.30) +  
(F * 0.25) +  
(R * 0.20) +  
(M * 0.15) +  
(Ca * 0.10)

Computed in SQL for performance and correct pagination.

---

### 📋 Bulls Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/bulls` | GET | List bulls with filters |
| `/bulls` | POST | Create one bull |
| `/bulls/bulk` | POST | Bulk create bulls (seeding/import) |

---

### 🔎 Query Params (GET /bulls)

| Param | Example | Description |
|-------|---------|-------------|
| `page` | `1` | Page number |
| `limit` | `10` | Results per page |
| `search` | `992` | Search caravana or nombre |
| `origen` | `propio` | Filter by origin |
| `uso` | `vaquillona` | Filter by use |
| `pelaje` | `negro` | Filter by coat |
| `sort` | `score_desc` | Sort by bull score |

---

## ⭐ Favorites Module

User-specific favorites via a join table.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/favorites` | GET | List favorite bull IDs |
| `/favorites/:bullId/toggle` | POST | Toggle favorite |

Protected by JWT.

---

## 🧠 Database Design

Tables:

- users
- bulls
- favorites

### Indexing Strategy

Indexes on:

- caravana
- nombre
- origen
- uso
- pelaje

Composite unique index:

favorites(user_id, bull_id)

Prevents duplicate favorites.

---

## ⚙️ Environment Variables

# Server
PORT=3000

# Database
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your_jwt_secret

---

## 🛠 Setup

npm install

### DB Sync (Dev only)

npm run db:sync

Force reset:

npm run db:sync:force

---

## ▶️ Run

npm run start:dev

---

## 📦 Seeding Bulls

Use:

POST /bulls/bulk

Body:

{
  "bulls": [ ... ]
}

This endpoint can later power a frontend “Import Bulls” feature.

---

## 🧩 Architectural Notes

- Feature-based modules (Nest convention)
- ORM models co-located with modules
- Computed score handled at DB level
- User data isolated via JWT
- Favorites enforced by DB constraints

---

## 🔮 Future Improvements (2 more weeks)

- Replace db:sync with migrations: introduce Sequelize migrations + seed scripts for production-safe, versioned schema changes.
- Users model improvements to support different roles (admin).
- Restrict POST /bulls and POST /bulls/bulk (and any future admin ops) to admin users/roles.
- Auth: refresh tokens, rate limiting on /auth/login, stronger password policies.
- Search upgrades: add Postgres full-text search or trigram indexing (pg_trgm) for fast name/tag search at 100k+ records.
- Index tuning for scale: add composite indexes for frequent filter combos (e.g. (origen, pelaje, uso)).
- Observability: improve logging, metrics (latency/DB time), and error reporting.
- Consistent error contracts: standardized error response format and improved validation messages for clients.