# AETHER // READS — Futuristic MERN Book Review & Social Reading Diary App

A full-stack **MERN (MongoDB, Express, React, Node.js)** social book cataloging, 5-star review, and reading diary platform connected to the **Open Library & Google Books APIs**.

## Core Features
- **Authentication**: Register & Log in with `username`, `email`, and `password` (bcrypt password hashing + JWT bearer authentication).
- **External Book Database Integration**: Search millions of existing books via the Open Library / Google Books API proxy (`/api/books/external-search`) and automatically upsert/sync books into MongoDB.
- **5-Star Reviews & Thoughts**: Rate books from 1 to 5 stars, write detailed thoughts, tag reading vibes/moods, flag spoilers, and react to community reviews.
- **Favorites, Likes & Dislikes**: Add books to a personal Favorites Vault and toggle Like / Dislike sentiment on any book or review.
- **Reading Diary**: Log books once read with completion dates, star ratings, personal diary reflections, page progress, and re-read status.
- **Social Graph & Reader Feed**: Follow other readers, explore their Favorite Books, Liked titles, and Reading Diaries, and view a chronological activity stream of followed readers.

## Project Structure
```
aether_reads_mern/
├── server/                 # Node.js + Express + MongoDB (Mongoose) API
│   ├── middleware/auth.js  # JWT authentication middleware
│   ├── models/             # User, Book, Review, DiaryEntry Mongoose schemas
│   ├── routes/             # REST endpoints (auth, books, reviews, diary, users)
│   ├── server.js           # Express app entry point
│   └── package.json
└── client/                 # React + Tailwind CSS Frontend
    ├── src/
    │   ├── api/client.js   # REST API client wrapper
    │   └── App.jsx         # Main React application
    └── package.json
```

## Quick Start
1. **Configure Environment (`server/.env`)**:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/aether_reads
   JWT_SECRET=super_secret_aether_jwt_key_change_in_prod
   GOOGLE_BOOKS_API_KEY=optional_your_google_books_key
   ```
2. **Start Backend**:
   ```bash
   cd server
   npm install
   npm run dev
   ```
3. **Start Frontend**:
   ```bash
   cd client
   npm install
   npm run dev
   ```
