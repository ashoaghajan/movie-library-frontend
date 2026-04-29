# NOTES.md

## Technical Choices

### Backend

* **Node.js + Express + TypeScript**
  Chosen for simplicity and full control over architecture. Avoided full frameworks (NestJS) to stay aligned with challenge requirements.

* **Prisma ORM + PostgreSQL**
  Prisma provides strong typing, clean queries, and fast iteration. PostgreSQL chosen for relational data modeling (movies, genres, people).

* **Background Sync**
  Implemented a service that fetches latest movies from TMDB and stores them locally. This keeps the app independent from external API latency during user requests.

* **Server-Sent Events (SSE)**
  Used for real-time notifications when new movies are added. SSE was chosen over WebSockets due to its simplicity and suitability for one-way communication (server → client).

---

### Frontend

* **React (Vite)**
  Lightweight setup with fast build times.

* **Mantine UI**
  Used for rapid UI development with clean, modern components.

* **TanStack Query**
  Handles server state (fetching, caching, pagination, loading states) efficiently.

---

## Architecture & Structure

### Backend Structure

```
src/
  controllers/
  services/
  routes/
  config/
```

* **Controllers** → handle HTTP layer
* **Services** → business logic & DB interaction
* **Separation of concerns** keeps code maintainable and scalable

---

### Frontend Structure

```
src/
  components/
  pages/
  hooks/
  api/
```

* **Pages** → route-level components
* **Components** → reusable UI blocks
* **Hooks** → API logic via React Query

---

## Data Model

Main entities:

* **Movie**

  * title, releaseDate, runtime, overview, rating, posterPath

* **Genre**

  * name

* **Person**

  * name (actors, directors)

* **Relations**

  * Movie ↔ Genres (many-to-many)
  * Movie ↔ Cast (with character name)
  * Movie ↔ Directors

### Why relational design?

* Avoids duplication (genres, people reused across movies)
* Makes filtering and querying efficient
* Scales well with larger datasets

---

## Key Features Implemented

* Movie list with:

  * Search (by title)
  * Genre filter
  * Pagination (infinite scroll)

* Movie details page:

  * Poster, description, rating
  * Cast and directors

* TMDB integration:

  * Fetch genres
  * Fetch latest released movies
  * Fetch movie details + credits

* Background sync:

  * Periodically fetches new movies
  * Stores them in local DB

* Real-time notifications:

  * Backend exposes SSE endpoint
  * Frontend listens via `EventSource`
  * Displays notification when new movies are added

---

## Assumptions & Trade-offs

* **SSE instead of WebSockets**

  * Simpler to implement and sufficient for one-way updates (server → client)
  * Does not support bidirectional communication

* **Limited dataset (~500 movies)**

  * Focused on performance and correctness rather than large-scale optimization

* **No authentication**

  * Not required for this challenge

* **UI not pixel-perfect**

  * Focused on functionality over design perfection

---

## AI Usage

* Used AI (ChatGPT) for:

  * Structuring the project
  * Debugging Prisma and API issues
  * Generating boilerplate code

* Not used for:

  * Blind copy-pasting full features without understanding
  * Core logic decisions (those were adapted and refined manually)

---

## If I Had 8 More Hours

* Improve **UI/UX polish** (animations, skeleton loaders, responsiveness)
* Add **unit & integration tests**
* Optimize queries and add **indexes** in DB
* Improve **error handling and logging**
* Add **Docker setup** for easier local development

---

## Final Notes

The project focuses on clean architecture, separation of concerns, and scalability while keeping implementation simple and aligned with the challenge requirements.
