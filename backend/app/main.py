from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from backend.app.config import FRONTEND_URL, SESSION_SECRET_KEY
from backend.app.routes.auth import router as auth_router
from backend.app.routes.spotify import router as spotify_router


app = FastAPI(
    title="K-Pop Music Intelligence",
    description="Music analytics platform powered by Spotify",
    version="1.0.0",
)


app.add_middleware(
    SessionMiddleware,
    secret_key=SESSION_SECRET_KEY,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(spotify_router)


@app.get("/")
async def root():
    return {
        "message": "K-Pop Music Intelligence API",
        "status": "running",
    }