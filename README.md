# NodeJs Blog

A full-stack blog application built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**. Features a public-facing blog with search and pagination, and a password-protected admin panel for managing posts.

> This project started from the tutorial [**"How to Build a Blog with Node.js, Express & MongoDB"**](https://www.youtube.com/results?search_query=How+to+Build+a+Blog+with+Node.js+Express+MongoDB) as a learning exercise. The frontend views and base structure follow the tutorial, while the backend was independently refactored and extended with TypeScript, a clean MVC architecture, JWT auth improvements, and a centralized error handling system.

---

## Features

- Browse and read blog posts with pagination
- Full-text search across post titles and content
- Admin authentication with JWT (stored in httpOnly cookies)
- Create, edit, and delete blog posts from the dashboard
- Centralized error handling with custom `ApiError` class
- EJS templating with shared layouts for public and admin views

---

## Tech Stack

| Layer | Technology |
| ------ | ---------- |
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| Database | MongoDB + Mongoose |
| Templating | EJS + express-ejs-layouts |
| Auth | JWT + bcrypt |
| Other | method-override, cookie-parser, dotenv |

---

## Project Structure

```text
src/
├── app.ts                        # Entry point
└── server/
    ├── config/
    │   └── db.ts                 # MongoDB connection
    ├── controllers/
    │   ├── admin.controller.ts   # Admin actions (login, CRUD)
    │   └── home.controller.ts    # Public pages (home, post, search)
    ├── middleware/
    │   ├── auth.middleware.ts    # JWT verification
    │   └── error.middleware.ts   # Global error handler
    ├── models/
    │   ├── post.ts               # Post schema
    │   └── user.ts               # User schema
    ├── routes/
    │   ├── adminRoutes.ts
    │   └── homeRoutes.ts
    └── utils/
        └── apiErrors.ts          # Custom error class

views/
├── layouts/
│   ├── main.ejs                  # Public layout
│   └── admin.ejs                 # Admin layout
├── partials/
│   ├── header.ejs
│   ├── header_admin.ejs
│   ├── footer.ejs
│   └── search.ejs
├── admin/
│   ├── index.ejs                 # Login page
│   ├── dashboard.ejs
│   ├── add-post.ejs
│   └── edit-post.ejs
├── index.ejs
├── post.ejs
├── search.ejs
└── about.ejs

public/
├── css/style.css
└── js/script.js
```

---

## Getting Started

### Prerequisites

- Node.js v20+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/yasmineelmenofy/nodejs-blog.git
cd nodejs-bolg

# Install dependencies
npm install
```

### Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Then update it with your own values:

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
ADMIN_SECRET=
```

### Run the App

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

---

## Usage

### Public Routes

| Method | Route | Description |
| ------ | ----- | ----------- |
| GET | `/` | Home page with paginated posts |
| GET | `/post/:id` | Single post view |
| POST | `/search` | Search posts |
| GET | `/about` | About page |

### Admin Routes

| Method | Route | Description |
| ------ | ----- | ----------- |
| GET | `/admin` | Login page |
| POST | `/admin` | Login (returns JWT cookie) |
| GET | `/dashboard` | Post management (auth required) |
| GET | `/add-post` | New post form (auth required) |
| POST | `/add-post` | Create post (auth required) |
| GET | `/edit-post/:id` | Edit post form (auth required) |
| PUT | `/edit-post/:id` | Update post (auth required) |
| DELETE | `/delete-post/:id` | Delete post (auth required) |
| GET | `/logout` | Clear session and redirect |

### Creating the First Admin User

The `/register` endpoint is available to create an admin account:

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "yourpassword",
    "adminSecret": "your_admin_secret"
  }'
```

> ⚠️ **Important:** This endpoint is currently unprotected. It is strongly recommended to remove or restrict it after creating your admin account.

---

## Error Handling

The app uses a centralized error middleware that handles:

- `ApiError` — custom HTTP errors (401, 404, etc.)
- `ZodError` — validation errors
- `mongoose.Error.CastError` — invalid MongoDB IDs
- Duplicate key errors (code `11000`)
- Generic 500 fallback

---

## Potential Improvements

- Add Zod validation to form inputs (already installed)
- Restrict the `/register` route or remove it post-setup
- Add TypeScript stricter types (replace `any` in controllers)
- Add indexes to the `Post` model for search performance
- Implement pagination on the admin dashboard

---

## What I Built vs. What Came from the Tutorial

Being transparent about what was original work vs. tutorial-based:

| Part | Origin |
| ---- | ------ |
| EJS views (HTML structure) | Tutorial |
| CSS styles | Tutorial |
| Public JS (search toggle) | Tutorial |
| TypeScript setup & configuration | Original |
| MVC folder structure & separation | Original / extended |
| `ApiError` class & error middleware | Original |
| Auth middleware with JWT | Extended from tutorial |
| MongoDB connection with reconnection logic | Original |
| Controller refactor with `next(err)` pattern | Original |

---

## Credits

Frontend views and initial project concept from the tutorial

[**How to Build a Blog with Node.js, Express & MongoDB**](https://www.youtube.com/results?search_query=How+to+Build+a+Blog+with+Node.js+Express+MongoDB).

---