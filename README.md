# Frontend (Movie Library UI)

## 🚀 Tech Stack

* React + TypeScript
* Mantine UI
* TanStack Query
* React Router

---

## 📦 Installation

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the `/frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
```

---

## ▶️ Run App

```bash
npm run dev
```

App will run on:

```text
http://localhost:5173
```

---

## 🔌 Backend Requirement

Make sure backend is running:

```text
http://localhost:3000
```

---

## 🔄 Real-Time Notifications (SSE)

The frontend listens for real-time updates when new movies are added.

### How it works

* Backend sends events via **Server-Sent Events (SSE)**
* Frontend subscribes using `EventSource`
* When new movies are added, UI receives:

```json
{
  "insertedMoviesCount": 3,
  "message": "3 new movies added"
}
```

---

## 🧪 Testing Notifications (Manual)

To test notifications without waiting for cron:

Send a POST request to:

```http
POST http://localhost:3000/api/sse/test-movies-added
```

### Options to test:

#### 1. Browser console

```js
fetch('http://localhost:3000/api/sse/test-movies-added', {
  method: 'POST'
});
```

#### 2. Postman / Thunder Client

* Method: POST
* URL: `http://localhost:3000/api/sse/test-movies-added`

---

## 🧠 Notes

* SSE connection is initialized on app load
* Notifications are logged in console (can be extended to UI)
* Requires backend SSE endpoint to be active

---

## 📁 Project Structure

```bash
src/
  components/
  pages/
  hooks/
  services/
  config/
  types/
```

---

## ⚠️ Common Issues

### No notifications received

* Ensure backend is running
* Ensure SSE endpoint is accessible:

```text
GET http://localhost:3000/api/sse/movies
```

### Images not loading

* Check `VITE_TMDB_IMAGE_BASE_URL`

---

## 💡 Future Improvements

* Show UI toast notifications (Mantine)
* Auto-refresh movie list on update
* Add favorites / user features
