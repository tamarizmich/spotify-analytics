# Music Intelligence

> A Spotify-powered music analytics dashboard designed as an interactive school yearbook.

K-Pop Music Intelligence transforms Spotify listening data into a visual, interactive notebook inspired by school yearbooks, class photos, handwritten notes, receipts, and stationery.

The project combines music analytics, API integration, and frontend design to turn personal listening patterns into a more narrative experience.

---

## Features

### Spotify Authentication

OAuth 2.0 authentication through Spotify, allowing users to connect their account and retrieve their listening data.

### Top Artist

Displays the artist currently at the top of the user's listening history, including Spotify artwork.

### Listening Periods

Comparison of top artists across Spotify's different listening periods:

- Short term
- Medium term
- Long term

### Rank Movement

Analysis of changes between listening periods:

- Artists moving up
- Artists moving down
- Artists maintaining their position
- New entries
- Artists leaving the ranking

### Class Superlatives

Listening patterns are presented as yearbook-style awards, including:

- Most Improved
- Biggest Drop
- Class Favorite
- Staying Power

### Class Roster

A visual yearbook roster containing the artists that appear in the user's listening history.

### Interactive Notebook

The dashboard is presented as a digital school notebook featuring:

- Page transitions
- Notebook tabs
- Paper textures
- Handwritten annotations
- Stickers
- School stationery
- Yearbook-inspired layouts

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- CSS

### Backend

- Python
- FastAPI
- Spotify Web API
- OAuth 2.0

### Infrastructure

- Docker
- Docker Compose

---

## Architecture

```text
                    Spotify Web API
                           |
                       OAuth 2.0
                           |
                           v
+------------------+       +------------------+
|                  |       |                  |
|  React + Vite    | <---- |     FastAPI      |
|    Frontend      |       |     Backend      |
|                  |       |                  |
+------------------+       +------------------+
                                   |
                                   v
                           Music Analytics
```

The frontend communicates with the FastAPI backend, which handles Spotify authentication, data retrieval, and music analysis.

---

## Project Structure

```text
k-pop-music-intelligence/
│
├── backend/
│   ├── app/
│   │   ├── analytics/
│   │   │   └── music.py
│   │   ├── models/
│   │   │   └── spotify.py
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   └── spotify.py
│   │   ├── services/
│   │   │   └── spotify.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   │
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
│
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### Requirements

- Node.js 18+
- Python 3.11+
- A Spotify Developer account
- Docker (optional)

---

## Spotify Configuration

Create an application through the Spotify Developer Dashboard and configure the appropriate redirect URI.

Create a `.env` file in the project root:

```env
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:8000/auth/callback
SESSION_SECRET_KEY=your_session_secret
```

Never commit the `.env` file or any credentials to the repository.

---

## Running Locally

### Backend

From the project root:

```bash
pip install -r backend/requirements.txt
```

Start the API:

```bash
uvicorn backend.app.main:app --reload
```

The backend will run at:

```text
http://localhost:8000
```

### Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

---

## Docker

Build and start the application:

```bash
docker compose up --build
```

Stop the application:

```bash
docker compose down
```

---

## Analytics

The current version focuses primarily on Spotify top artist data.

The backend retrieves the user's top artists across different listening periods and calculates:

- Artist rankings
- Artist overlap
- Rank movement
- Rank changes
- Listening-period comparisons

The analytics layer is separated from the API routes to allow additional analysis features to be added independently.

---

## Design

The visual direction is inspired by the feeling of opening an old school notebook or yearbook.

Rather than presenting music statistics through a conventional analytics dashboard, the interface uses physical-school objects and layouts as metaphors for data:

```text
Notebook        → Dashboard
Class photo     → Artist
Class roster    → Listening history
Superlative     → Music achievement
Receipt         → Listening summary
School supplies → Navigation
```

The goal is to combine data analysis with visual storytelling and create an experience that feels personal rather than purely statistical.

---

## Current Limitations

The current version primarily uses Spotify's top artist data.

The retrieved listening data is not exclusively limited to K-Pop artists, despite the project's K-Pop-oriented visual identity.

Future versions may introduce additional classification and filtering to provide more specialized K-Pop analysis.

---

## Roadmap

### Completed

- Spotify OAuth authentication
- Spotify profile retrieval
- Top artists
- Listening-period comparison
- Rank movement analysis
- Class superlatives
- Class roster
- Interactive notebook interface
- Responsive design
- Loading and error states
- Docker configuration

### Planned

- Interactive music charts
- Music personality analysis
- Track-level analysis
- Genre analysis
- Listening-time statistics
- Listening trends
- Album insights
- Additional notebook pages
- Production deployment

---

## License

This project is currently developed as a personal software engineering portfolio project.

---