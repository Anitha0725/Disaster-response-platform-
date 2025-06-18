# Disaster Response Coordination Platform

A MERN-based backend-heavy project for real-time disaster monitoring and response, built with Supabase, Gemini API, and Socket.IO.

## 🌍 Features

- **Disaster Management:** CRUD for disaster events (title, tags, location, etc.)
- **Geocoding:** Extract and convert location from description using Google Gemini + Mapbox
- **Image Verification:** Detect manipulation in disaster photos via Gemini
- **Social Feed:** Pull real-time mock Twitter/Bluesky posts (cachable)
- **Resource Mapping:** Supabase geospatial queries to fetch nearby shelters/resources
- **Official Updates:** Web-scraping government/NGO sites (e.g., Red Cross)
- **Real-Time:** WebSocket updates on disaster, social, and resource events
- **Frontend:** Minimal React app to test APIs

## 🗃 Tech Stack

- **Backend:** Node.js, Express.js, Socket.IO
- **Database:** Supabase (PostgreSQL + PostGIS)
- **External APIs:** Gemini API, Mapbox, Mock Twitter API
- **Frontend:** React + Axios
- **Caching:** Supabase `cache` table with TTL

## 🔧 Setup Instructions

### 1. Backend (.env)
```
PORT=4000
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_KEY=your-supabase-service-role
GEMINI_API_KEY=your-gemini-api-key
GEOCODER_API_KEY=your-mapbox-or-googlemaps-key
```

### 2. Start Backend
```
cd backend
npm install
node index.js
```

### 3. Frontend Setup
```
cd frontend
npm install
npm start
```

### 4. Supabase Functions
Run in Supabase SQL editor:
```sql
create or replace function nearby_resources(lat float8, lon float8, distance_m float8)
returns table (
  id uuid, disaster_id uuid, name text, location_name text, type text, created_at timestamp
)
language sql as $$
  select id, disaster_id, name, location_name, type, created_at
  from resources
  where ST_DWithin(location, ST_SetSRID(ST_MakePoint(lon, lat), 4326), distance_m);
$$;
```

## 🚀 Deployment

- Backend → [Render](https://render.com/)
- Frontend → [Vercel](https://vercel.com/)

## ✨ Cursor/Windsurf Usage

- Cursor generated: disaster routes, Supabase caching, WebSocket emitters
- Windsurf used: Supabase RPC generator, Gemini prompt testing, social feed mocking
- Real-time updates & caching logic were optimized via AI generation

---

© 2025 | Built for rapid disaster response innovation ⚡
