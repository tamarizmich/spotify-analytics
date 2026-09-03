from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware

from backend.app.routes.auth import router as auth_router
from backend.app.routes.spotify import router as spotify_router

app = FastAPI(
    title="K-Pop Music Intelligence",
    description="Music analytics platform powered by Spotify",
    version="1.0.0",
)


app.add_middleware(
    SessionMiddleware,
    secret_key="development-secret-key",
)


app.include_router(auth_router)
app.include_router(spotify_router)

@app.get("/")
async def root():
    return {
        "message": "K-Pop Music Intelligence API",
        "status": "running",
    }